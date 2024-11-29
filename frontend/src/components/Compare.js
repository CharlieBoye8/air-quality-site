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
  const [timeRange, setTimeRange] = useState('Today');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [showSelections, setShowSelections] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await queryService.fetchAllData();
      setData(res.data);

      // Extract years dynamically from data
      const yearsSet = new Set(
        res.data.map((row) => new Date(row._time).getFullYear().toString())
      );
      setYears([...yearsSet].sort((a, b) => b - a)); // Sort years in descending order
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const filterByTimeRange = (dataset) => {
      const now = new Date();

      const cutoff = {
        Today: new Date(now.setHours(0, 0, 0, 0)),
        'Last 7 Days': new Date(now.setDate(now.getDate() - 7)),
        'Last 30 Days': new Date(now.setDate(now.getDate() - 30)),
        'Last 6 Months': new Date(now.setMonth(now.getMonth() - 6)),
        'This Year': new Date(now.getFullYear(), 0, 1),
      }[timeRange];

      if (timeRange === 'Years' && selectedYear) {
        return dataset.filter(
          (row) => new Date(row._time).getFullYear().toString() === selectedYear
        );
      }

      return dataset.filter((row) => new Date(row._time) >= cutoff);
    };

    const updateLocationData = (location, comparisonType) => {
      const filteredData = filterByTimeRange(
        data.filter((row) => row.location === location && row._field === comparisonType)
      );
      return {
        values: filteredData.map((row) => row._value),
        times: filteredData.map((row) => new Date(row._time).toLocaleString()),
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
  }, [location1, location2, comparisonType, data, timeRange, selectedYear]);

  const toggleSelections = () => {
    setShowSelections(!showSelections);
  };

  // Build the title dynamically based on selected options
  const buildTitle = () => {
    let title = `Comparison of ${comparisonType}`;
    
    // Adjust for time range
    if (timeRange === 'Today') {
      title += ` Today`;
    } else if (timeRange === 'Last 7 Days' || timeRange === 'Last 30 Days') {
      title += ` Over the Last ${timeRange.toLowerCase()}`;
    } else if (timeRange === 'Last 6 Months') {
      title += ` Over the Last 6 Months`;
    } else if (timeRange === 'This Year') {
      title += ` This Year`;
    } else if (timeRange === 'Years' && selectedYear) {
      title += ` in ${selectedYear}`;
    }

    // Add locations to the title if they are selected
    if (location1 && location2) {
      title += ` Between ${location1} and ${location2}`;
    }

    return title;
  };

  return (
    <section className="location-comparison">
      <h2>{buildTitle()}</h2>

      <div style={{ position: 'relative' }}>
        <button className="toggle-arrow" onClick={toggleSelections}>
          {showSelections ? '▲ Collapse' : '▼ Expand'}
        </button>
        <div
          className="selections-container"
          style={{
            maxHeight: showSelections ? '300px' : '0',
            opacity: showSelections ? '1' : '0',
            transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
          }}
        >
          <div className="selection-panel">
            <h3>Location 1</h3>
            <select value={location1} onChange={(e) => setLocation1(e.target.value)}>
              <option value="">Select Location</option>
              <option value="West Building">West Building</option>
              <option value="Gettysburg Hotel">Gettysburg Hotel</option>
              <option value="Gettysburger">Gettysburger</option>
            </select>
          </div>

          <div className="center-panel">
            <h3>Select Comparison Type</h3>
            <select value={comparisonType} onChange={(e) => setComparisonType(e.target.value)}>
              <option value="PM2.5">PM2.5</option>
              <option value="MQ-3">MQ-3 (Alcohol Vapor)</option>
              <option value="MQ-7">MQ-7 (CO)</option>
              <option value="MQ135">MQ-135 (CO2, Smoke, Ammonia)</option>
            </select>
            <h3>Select Time Range</h3>
            <select
              value={timeRange}
              onChange={(e) => {
                setTimeRange(e.target.value);
                setSelectedYear(''); // Reset year if switching range
              }}
            >
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year">This Year</option>
              <option value="Years">Years</option>
            </select>
            {timeRange === 'Years' && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="selection-panel">
            <h3>Location 2</h3>
            <select value={location2} onChange={(e) => setLocation2(e.target.value)}>
              <option value="">Select Location</option>
              <option value="West Building">West Building</option>
              <option value="Gettysburg Hotel">Gettysburg Hotel</option>
              <option value="Gettysburger">Gettysburger</option>
            </select>
          </div>
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
