import React from 'react';
import '../styles/Stats.css';

const LocationComparison = () => {
  return (
    <section className="Stats">
      <h2>Compare Locations</h2>
      <div className="DiffLoc">
        <div>Location 1</div>
        <div>Location 2</div>
        <div>Location 3</div>
        <div>Location 4</div>
      </div>
      <button className="compare-btn">Compare</button>
    </section>
  );
}

export default LocationComparison;
