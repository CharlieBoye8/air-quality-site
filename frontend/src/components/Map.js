import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';  // Update sensor data and countdown for active location

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Define multiple locations with unique names and coordinates
const locations = [
  { id: 1, name: 'Gettysburg College', position: [39.8359, -77.2311] },
  { id: 2, name: 'Lincoln Square', position: [39.8309, -77.2316] },
  { id: 3, name: 'Seminary Ridge', position: [39.8303, -77.2432] }
];

const Map = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [sensorData, setSensorData] = useState({
    PM25: Math.random() * 100,
    MQ3: 10 + Math.random() * 290,
    MQ7: 10 + Math.random() * 490,
    MQ135: 10 + Math.random() * 190
  });
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (activeLocation) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            setSensorData({
              PM25: Math.random() * 100,
              MQ3: 10 + Math.random() * 290,
              MQ7: 10 + Math.random() * 490,
              MQ135: 10 + Math.random() * 190
            });
            return 60;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [activeLocation]);

  return (
    <MapContainer center={locations[0].position} zoom={14} style={{ height: "calc(100vh - 100px)", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(location => (
        <Marker 
          key={location.id} 
          position={location.position} 
          eventHandlers={{ click: () => setActiveLocation(location) }}
        >
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>PM2.5: {sensorData.PM25.toFixed(2)} µg/m³</p>
              <p>MQ-3: {sensorData.MQ3.toFixed(2)} ppm</p>
              <p>MQ-7: {sensorData.MQ7.toFixed(2)} ppm</p>
              <p>MQ-135: {sensorData.MQ135.toFixed(2)} ppm</p>
              <p>Countdown: {countdown}s</p>
            </div>
          </Popup>
          {activeLocation && activeLocation.id === location.id && (
            <Circle center={location.position} radius={200} color="blue" opacity={0.5} />
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
