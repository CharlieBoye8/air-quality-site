/**
 * Stats component to display air quality data in a table with filters and summary.
 * By: Charlie Boye & Binh Tran
 */

import React, { useState, useEffect, useCallback } from 'react';
import queryService from '../services/queryService';
import '../styles/Stats.css';

const sensorTypeMapping = {
    'PM2.5': { type: "Particulate Matter (PM2.5)", unit: "µg/m³" },
    'MQ-3': { type: "Alcohol", unit: "ppm" },
    'MQ-7': { type: "Carbon Monoxide (CO)", unit: "ppm" },
    MQ135: { type: "Air Quality (NH3, CO, CO2)", unit: "ppm" },
};

const Stats = () => {
    const [data, setData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRange, setSelectedRange] = useState('today');
    const [filteredData, setFilteredData] = useState([]);
    const [summary, setSummary] = useState({});

    // Binh
    const fetchData = async () => {
        try {
            const res = await queryService.fetchAllData();
            setData(res.data);

            // Set locations and years after replacing undefined or blank locations with 'Library' (Demo purposes)
            const uniqueLocations = [...new Set(res.data.map((row) => row.location || 'Library'))];
            const uniqueYears = [...new Set(res.data.map((row) => new Date(row._time).getFullYear()))];
            setLocations(uniqueLocations);
            setYears(uniqueYears.sort((a, b) => a - b));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // End Binh

    const applyFilters = useCallback(() => {
        const filtered = data.filter((row) => {
            const rowDate = new Date(row._time);
            const rowYear = rowDate.getFullYear();

            // Skip rows with invalid sensor types like EndpointIndex, Location, or Timestamp (Demo Purposes)
            if (['EndpointIndex', 'Location', 'Timestamp'].includes(row._field)) return false;
            const rowLocation = row.location || 'Library';

            const rangeFilter = () => {
                const today = new Date();
                if (selectedRange === 'last30Days') {
                    const last30Days = new Date();
                    last30Days.setDate(today.getDate() - 30);
                    return rowDate >= last30Days;
                } else if (selectedRange === 'last7Days') {
                    const last7Days = new Date();
                    last7Days.setDate(today.getDate() - 7);
                    return rowDate >= last7Days;
                } else if (selectedRange === 'today') {
                    return rowDate.toDateString() === today.toDateString();
                } else if (selectedRange === 'year') {
                    return rowYear === parseInt(selectedYear, 10);
                }
                return true;
            };

            return (
                rangeFilter() &&
                (!selectedLocation || rowLocation === selectedLocation) &&
                (!selectedYear || rowYear === parseInt(selectedYear, 10))
            );
        });

        filtered.sort((a, b) => new Date(b._time) - new Date(a._time));

        setFilteredData(filtered);
    }, [data, selectedLocation, selectedYear, selectedRange]);

    const calculateSummary = useCallback((currentData) => {
        if (!currentData.length) {
            setSummary({});
            return;
        }

        const summaryData = {};
        currentData.forEach((row) => {
            const { _field, _value } = row;
            if (['EndpointIndex', 'Location', 'Timestamp'].includes(_field)) return;

            if (!summaryData[_field]) {
                summaryData[_field] = {
                    type: sensorTypeMapping[_field]?.type || _field,
                    current: _value,
                    trend: 0,
                    color: 'black',
                };
            }
        });

        Object.keys(summaryData).forEach((key) => {
            const historicalValues = data
                .filter((row) => row._field === key)
                .map((row) => row._value);

            const avgHistoricalValue =
                historicalValues.reduce((acc, val) => acc + val, 0) / historicalValues.length || 0;
            const currentValue = summaryData[key].current;
            const trend = Math.round((currentValue - avgHistoricalValue) * 100) / 100;

            summaryData[key].trend = trend;
            summaryData[key].color = trend > 0 ? 'red' : trend < 0 ? 'green' : 'black';
        });

        setSummary(summaryData);
    }, [data]);

    const handleDownloadCSV = () => {
        if (!filteredData.length) {
            alert("No data available to download.");
            return;
        }

        const headers = ["Date", "Location", "Sensor Type", "Value"];
        const rows = filteredData.map((row) => [
            new Date(row._time).toLocaleString(),
            row.location || 'Library',
            sensorTypeMapping[row._field]?.type || row._field,
            `${row._value} ${sensorTypeMapping[row._field]?.unit || ''}`,
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((item) => `"${item}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "air_quality_data.csv";
        link.click();
    };

    // Begin Binh
    useEffect(() => {
        fetchData();
    
        const intervalId = setInterval(() => {
            fetchData();
        }, 10000); 
    
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [data, selectedLocation, selectedYear, selectedRange, applyFilters]);

    useEffect(() => {
        calculateSummary(filteredData);
    }, [filteredData, calculateSummary]);
    //End Binh

    return (
        <div className="stats-container">
            <h1>Air Quality Data</h1>

            <div className="filters-row">
                <div className="filters">
                    <label>
                        Location:
                        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                            <option value="">All Locations</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Date Range:
                        <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
                            <option value="">All Time</option>
                            <option value="last30Days">Last 30 Days</option>
                            <option value="last7Days">Last 7 Days</option>
                            <option value="today">Today</option>
                            <option value="year">Year</option>
                        </select>
                    </label>

                    {selectedRange === 'year' && (
                        <label>
                            Year:
                            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value="">Select Year</option>
                                {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>

                <button className="download-csv" onClick={handleDownloadCSV}>Download CSV</button>
            </div>

            <div className="summary-section">
                <h2>Data Summary</h2>
                <div className="summary-grid">
                    {Object.keys(summary).length > 0 ? (
                        Object.keys(summary).map((key, index) => {
                            const { type, current, trend, color } = summary[key];
                            return (
                                <div key={index} className="summary-item">
                                    <h3>{type}</h3>
                                    <p>Value: {current}</p>
                                    <p style={{ color }}>Trend: {trend > 0 ? `↑${trend}` : trend < 0 ? `↓${trend}` : '-'}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No data available for the selected filters.</p>
                    )}
                </div>
            </div>

            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Sensor Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                            <tr key={index}>
                                <td>{new Date(row._time).toLocaleString()}</td>
                                <td>{row.location || 'Library'}</td>
                                <td>{sensorTypeMapping[row._field]?.type || row._field}</td>
                                <td>{`${row._value} ${sensorTypeMapping[row._field]?.unit || ''}`}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4">No data available for the selected filters.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Stats;
