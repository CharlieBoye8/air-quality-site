import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Map from './components/Map';
import Compare from './components/Compare';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
// import TryIt from './components/TryIt';
// import Stats from './components/Stats';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/map" element={<Map />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/try-it" element={<TryIt />} /> */}
          {/* <Route path="/stats" element={<Stats />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
