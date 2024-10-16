import React, { useState } from 'react';
import '../styles/Compare.css';
import ComparisonChart from './ComparisonChart';

const Compare = () => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [location1Data, setLocation1Data] = useState([]);
  const [location2Data, setLocation2Data] = useState([]);
  const [comparisonType, setComparisonType] = useState('PM2.5');

// Dummy Data
  const airQualityData = {
    'PM2.5': {
      'West Building': [65, 70, 80, 75],
      'Gettysburg Hotel': [28, 30, 40, 35],
      'Gettysburger': [45, 55, 60, 50],
    },
    'MQ-3 (Alcohol Vapor)': {
      'West Building': [10, 12, 8, 15],
      'Gettysburg Hotel': [5, 6, 7, 4],
      'Gettysburger': [6, 7, 5, 8],
    },
    'MQ-7 (CO)': {
      'West Building': [0.5, 0.4, 0.6, 0.7],
      'Gettysburg Hotel': [0.2, 0.3, 0.25, 0.15],
      'Gettysburger': [0.3, 0.4, 0.35, 0.45],
    },
    'MQ-135 (CO2, Smoke, Ammonia)': {
      'West Building': [400, 420, 410, 450],
      'Gettysburg Hotel': [350, 340, 360, 370],
      'Gettysburger': [380, 390, 385, 400],
    },
  };

  const handleLocation1Change = (event) => {
    const selectedLocation = event.target.value;
    setLocation1(selectedLocation);

    if (airQualityData[comparisonType]) {
      setLocation1Data(airQualityData[comparisonType][selectedLocation] || []);
    } else {
      setLocation1Data([]);
    }
  };

  const handleLocation2Change = (event) => {
    const selectedLocation = event.target.value;
    setLocation2(selectedLocation);

    if (airQualityData[comparisonType]) {
      setLocation2Data(airQualityData[comparisonType][selectedLocation] || []);
    } else {
      setLocation2Data([]);
    }
  };

  const handleComparisonTypeChange = (event) => {
    const selectedType = event.target.value;
    setComparisonType(selectedType);

    if (airQualityData[selectedType]) {
      setLocation1Data(airQualityData[selectedType][location1] || []);
      setLocation2Data(airQualityData[selectedType][location2] || []);
    } else {
      setLocation1Data([]);
      setLocation2Data([]);
    }
  };

  return (
    <section className="location-comparison">
      <h2>Comparison of {comparisonType} Between {location1} and {location2} Over Time</h2>
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

      <div className="comparison-type-picker">
        <h3>Select Comparison Type</h3>
        <select value={comparisonType} onChange={handleComparisonTypeChange}>
          <option value="PM2.5">PM2.5</option>
          <option value="MQ-3 (Alcohol Vapor)">MQ-3 (Alcohol Vapor)</option>
          <option value="MQ-7 (CO)">MQ-7 (CO)</option>
          <option value="MQ-135 (CO2, Smoke, Ammonia)">MQ-135 (CO2, Smoke, Ammonia)</option>
        </select>
      </div>

      <div className="graph-placeholder">
        {location1 && location2 ? (
          <ComparisonChart 
            location1Data={location1Data} 
            location2Data={location2Data} 
            location1Label={location1}
            location2Label={location2}
          />
        ) : (
          <p>Please select both locations to compare.</p>
        )}
      </div>
    </section>
  );
};

export default Compare
