import React, { useState, useEffect } from 'react';
import queryService from '../services/queryService';
import '../styles/Compare.css';
import ComparisonChart from './ComparisonChart';

const Compare = () => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [location1Data, setLocation1Data] = useState([]);
  const [location2Data, setLocation2Data] = useState([]);
  const [comparisonType, setComparisonType] = useState('PM2.5');
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await queryService.fetchAllData();
      setData(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return; 

    const updateLocationData = (location, comparisonType) => {
      const filteredData = data.filter(
        row => row.location === location && row._field === comparisonType
      );
      return {
        values: filteredData.map(row => row._value),
        times: filteredData.map(row => new Date(row._time).toLocaleString())
      };
    };

    if (location1) {
      const { values, times } = updateLocationData(location1, comparisonType);
      setLocation1Data(values);
      setLabels(times);
    } else {
      setLocation1Data([]);
    }

    if (location2) {
      const { values } = updateLocationData(location2, comparisonType);
      setLocation2Data(values);
    } else {
      setLocation2Data([]);
    }
  }, [location1, location2, comparisonType, data]);

  const handleLocation1Change = (event) => {
    setLocation1(event.target.value);
  };

  const handleLocation2Change = (event) => {
    setLocation2(event.target.value);
  };

  const handleComparisonTypeChange = (event) => {
    setComparisonType(event.target.value);
  };

  return (
    <section className="location-comparison">
      <h2>Comparison of {comparisonType} Between {location1} and {location2}</h2>
      <div className="locations">
        <div className="location-picker">
          <h3>Location 1</h3>
          <select value={location1} onChange={handleLocation1Change}>
            <option value="">Select Location</option>
            <option value="West Building">West Building</option>
            <option value="Gettysburg Hotel">Gettysburg Hotel</option>
            <option value="Gettysburger">Gettysburger</option>
          </select>
        </div>

        <div className="comparison-type-picker">
          <h3>Select Comparison Type</h3>
          <select value={comparisonType} onChange={handleComparisonTypeChange}>
            <option value="PM2.5">PM2.5</option>
            <option value="MQ-3">MQ-3 (Alcohol Vapor)</option>
            <option value="MQ-7">MQ-7 (CO)</option>
            <option value="MQ135">MQ-135 (CO2, Smoke, Ammonia)</option>
          </select>
        </div>

        <div className="location-picker">
          <h3>Location 2</h3>
          <select value={location2} onChange={handleLocation2Change}>
            <option value="">Select Location</option>
            <option value="West Building">West Building</option>
            <option value="Gettysburg Hotel">Gettysburg Hotel</option>
            <option value="Gettysburger">Gettysburger</option>
          </select>
        </div>
      </div>

      <div className="graph-placeholder">
        {location1 && location2 ? (
          <ComparisonChart 
            location1Data={location1Data} 
            location2Data={location2Data} 
            location1Label={location1}
            location2Label={location2}
            labels={labels}
          />
        ) : (
          <p>Please select both locations to compare.</p>
        )}
      </div>
    </section>
  );
};

export default Compare;
