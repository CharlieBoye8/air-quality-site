import React, { useState, useEffect } from 'react';
import queryService from '../services/queryService';
import '../styles/Stats.css';

const Stats = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const res = await queryService.fetchAllData();
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const groupedData = data.reduce((acc, row) => {
        const time = new Date(row._time).toLocaleString();
        const location = row.location;

        if (!acc[location]) {
            acc[location] = {};
        }

        if (!acc[location][time]) {
            acc[location][time] = [];
        }

        acc[location][time].push(row);

        return acc;
    }, {});

    return (
        <div className="stats-container">
            <h1>Air Quality Data</h1>
            {Object.keys(groupedData).map((location) => (
                <div key={location} className="location-table">
                    <h2>{location}</h2>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Sensor ID</th>
                                <th>Measurement</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groupedData[location]).map((time) =>
                                groupedData[location][time].map((row, index) => (
                                    <tr key={index}>
                                        {index === 0 && (
                                            <td rowSpan={groupedData[location][time].length}>
                                                {time}
                                            </td>
                                        )}
                                        <td>{row.sensor_id}</td>
                                        <td>{row._field}</td>
                                        <td>{row._value}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Stats;
