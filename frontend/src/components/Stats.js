import React, { useState, useEffect } from 'react';
import queryService from '../services/queryService';
import '../styles/Stats.css';

const Stats = () => {
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRange, setSelectedRange] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const sensorTypeMapping = {
        "PM2.5": { type: "Particulate Matter (PM2.5)", unit: "µg/m³" },
        "MQ-3": { type: "Alcohol", unit: "ppm" },
        "MQ-7": { type: "Carbon Monoxide (CO)", unit: "ppm" },
        "MQ135": { type: "Air Quality (NH3, CO, CO2)", unit: "ppm" }
    };

    const fetchData = async () => {
        const res = await queryService.fetchAllData();
        setData(res.data);

        const uniqueLocations = [...new Set(res.data.map(row => row.location))];
        setLocations(uniqueLocations);

        const uniqueYears = [...new Set(res.data.map(row => new Date(row._time).getFullYear()))];
        setYears(uniqueYears.sort((a, b) => a - b));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter(row => {
            const rowDate = new Date(row._time);
            const rowYear = rowDate.getFullYear();

            const rangeFilter = () => {
                const today = new Date();
                switch (selectedRange) {
                    case 'last30Days':
                        const last30Days = new Date();
                        last30Days.setDate(today.getDate() - 30);
                        return rowDate >= last30Days;
                    case 'last6Months':
                        const last6Months = new Date();
                        last6Months.setMonth(today.getMonth() - 6);
                        return rowDate >= last6Months;
                    case 'today':
                        return rowDate.toDateString() === today.toDateString();
                    default:
                        return true;
                }
            };

            return rangeFilter() &&
                   (!selectedLocation || row.location === selectedLocation) &&
                   (!selectedYear || rowYear === parseInt(selectedYear, 10));
        });
        setFilteredData(filtered);
    }, [data, selectedLocation, selectedYear, selectedRange]);

    const groupedData = filteredData.reduce((acc, row) => {
        const location = row.location;
        const time = new Date(row._time).toLocaleString();

        if (!acc[location]) acc[location] = {};
        if (!acc[location][time]) acc[location][time] = [];
        
        acc[location][time].push(row);
        return acc;
    }, {});

    const downloadCSV = () => {
        const headers = ['Time', 'Sensor ID', 'Measurement', 'Value'];
        const rows = [];

        filteredData.forEach(row => {
            const { type, unit } = sensorTypeMapping[row._field] || { type: row._field, unit: '' };
            rows.push([
                new Date(row._time).toLocaleString(),
                row.sensor_id,
                type,
                `${row._value} ${unit}`
            ]);
        });

        const csvContent = [
            headers.join(','), 
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `air_quality_data_${selectedLocation || 'all'}_${selectedYear || 'all'}.csv`);
        link.click();
    };

    return (
        <div className="stats-container">
            <h1>Air Quality Data</h1>

            <div className="filters-row">
                <div className="filters">
                    <label>
                        Location:
                        <select 
                            value={selectedLocation} 
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value="">All Locations</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </label>
                    
                    <label>
                        Year:
                        <select 
                            value={selectedYear} 
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Date Range:
                        <select 
                            value={selectedRange} 
                            onChange={(e) => setSelectedRange(e.target.value)}
                        >
                            <option value="">All Time</option>
                            <option value="last30Days">Last 30 Days</option>
                            <option value="last6Months">Last 6 Months</option>
                            <option value="today">Today</option>
                        </select>
                    </label>
                </div>

                <button onClick={downloadCSV} className="download-csv">
                    Download CSV
                </button>
            </div>

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
                                groupedData[location][time].map((row, index) => {
                                    const { type, unit } = sensorTypeMapping[row._field] || { type: row._field, unit: '' };
                                    return (
                                        <tr key={index}>
                                            {index === 0 && (
                                                <td rowSpan={groupedData[location][time].length}>
                                                    {time}
                                                </td>
                                            )}
                                            <td>{row.sensor_id}</td>
                                            <td>{type}</td>
                                            <td>{`${row._value} ${unit}`}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Stats;
