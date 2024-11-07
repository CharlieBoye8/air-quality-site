import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Map from './components/Map';
import Compare from './components/Compare';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Stats from './components/Stats';
import Admin from './components/Admin';
import LearnMore from './components/LearnMore';
// import TryIt from './components/TryIt';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} /> {/* Pass the login state to Navbar */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/map" element={<Map />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />} // Pass the function to update login state
          />
          <Route path="/admin" element={<Admin />} /> {/* Add route for Admin component */}
          {/* <Route path="/try-it" element={<TryIt />} /> */}
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
