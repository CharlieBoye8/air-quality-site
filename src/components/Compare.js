import React from 'react';
import '../styles/Compare.css';

const Compare = () => {
  return (
    <section className="location-comparison">
      <h2>Compare Air Quality Between Locations</h2>
      <div className="locations">
        <div className="location-picker">
          <h3>Location 1</h3>
          <select>
            <option value="">Select Location</option>
            <option value="location1">West Building</option>
            <option value="location2">Gettysburg Hotel</option>
            <option value="location3">Gettysburger</option>
          </select>
        </div>
        <div className="location-picker">
          <h3>Location 2</h3>
          <select>
            <option value="">Select Location</option>
            <option value="location1">West Building</option>
            <option value="location2">Gettysburg Hotel</option>
            <option value="location3">Gettysburger</option>
          </select>
        </div>
      </div>
      <button className="compare-btn">Compare</button>

      <div className="graph-placeholder">
        <p>Graph showing comparison will be displayed here.</p>
      </div>
    </section>
  );
};

export default Compare;
