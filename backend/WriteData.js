const fs = require('fs');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

const jsonData = JSON.parse(fs.readFileSync('Bigdata.json'));

const influx = new InfluxDB({
    url: process.env.INFLUXDB_URL,
    token: process.env.INFLUXDB_TOKEN
});

const writeApi = influx.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET);

jsonData.forEach(sensor => {
    const { sensor_id, location, measurements } = sensor;

    measurements.forEach(measurement => {
        const { type, data } = measurement; 
        
        data.forEach(entry => {
            const { value, timestamp } = entry;

            const point = new Point('air_quality')
                .tag('sensor_id', sensor_id)
                .tag('location', location)
                .floatField(type, value)
                .timestamp(new Date(timestamp));

            writeApi.writePoint(point);
        });
    });
});

writeApi
    .close()
    .then(() => {
        console.log('Data written successfully');
    })
    .catch((err) => {
        console.error('Error writing data:', err);
    });
