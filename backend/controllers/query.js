/**
 * This file contains the routes for querying and sending data to InfluxDB.
 * By: Binh Tran
 */

const queryRouter = require("express").Router();
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

const url = process.env.INFLUXDB_URL;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;

queryRouter.get("/allData", async (req, res) => {
    console.log("in getting data");

    const queryAPI = new InfluxDB({ url, token }).getQueryApi(org);

    const query = `from(bucket: "${bucket}")
                   |> range(start: 0)`;

    let s = [];
    const myQuery = async () => {
        for await (const { values, tableMeta } of queryAPI.iterateRows(query)) {
            const o = tableMeta.toObject(values);
            console.log(`time is ${o._time}, value is ${o._value}, field is ${o._field}, and measurement is ${o._measurement}`);
            s.push(o);
        }
    };
    
    await myQuery();
    console.log(s);
    res.json(s);
});

queryRouter.post("/sendData", (req, res) => {
    console.log("receiving data");

    const client = new InfluxDB({ url, token });
    const writeApi = client.getWriteApi(org, bucket, 'ns');
    let jsonString = req.body;

    console.log("Received JSON string:", jsonString);

    let measurement = jsonString.measurement || "default_measurement";
    let tagKey = jsonString.tag_key || "default_tag";
    let tagValue = jsonString.tag_value || "default_value";
    let location = jsonString.location || "Library"; // Provide a fallback location
    let timestamp = jsonString.timestamp || new Date().toISOString();

    try {
        const point = new Point(measurement)
    .tag(tagKey, tagValue)
    .tag("location", location)
    .timestamp(Date.now() * 1e6); 

        for (const [key, value] of Object.entries(jsonString)) {
            if (key !== "measurement" && key !== "tag_key" && key !== "tag_value" && key !== "location" && key !== "timestamp") {
                if (typeof value === "number") {
                    point.floatField(key, value); 
                } else {
                    point.stringField(key, String(value));
                }
            }
        }

        writeApi.writePoint(point);
        writeApi
            .close()
            .then(() => {
                console.log("Data written successfully!");
                res.status(200).json({ status: "success", message: "Data written successfully!" });
            })
            .catch((e) => {
                console.error("Error closing write API:", e);
                res.status(500).json({ status: "error", message: "Error writing data to InfluxDB." });
            });
    } catch (error) {
        console.error("Error inserting data:", error.message);
        res.status(400).json({ status: "error", message: "Error parsing or writing data." });
    }
});

module.exports = queryRouter;
