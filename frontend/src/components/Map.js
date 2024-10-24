import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';


const Map = () => {
  const position = [39.8359, -77.2311]; // Gettysburg

  return (
    <MapContainer center={position} zoom={15.5} style={{ height: "calc(100vh - 100px)", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Gettysburg College is located here.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
