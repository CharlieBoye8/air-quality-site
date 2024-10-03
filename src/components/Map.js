import React from 'react';
import '../styles/Map.css';
import logo from '../media/Map.png';

const Map = () => {
  return (
    <section className="map-section">
      <div className="map">
        <img src={logo} alt="demo map" />
      </div>
    </section>
  );
}

export default Map;
