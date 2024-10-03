import React from 'react';
import '../styles/Navbar.css';
import logo from '../media/G.png';

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img onClick={() => setActiveComponent('welcome')} src={logo} alt="Gettysburg College Logo"></img>
      </div>
      <ul className="nav-links">
        <li onClick={() => setActiveComponent('aboutUs')}>About us</li>
        <li onClick={() => setActiveComponent('map')}>Map</li>
        <li onClick={() => setActiveComponent('stats')}>Stats</li>
        <li onClick={() => setActiveComponent('compare')}>Compare</li>
        <li onClick={() => setActiveComponent('team')}>Team</li>
        <li>Try it!</li>
      </ul>
      <button className="login-btn" onClick={() => setActiveComponent('Login')}>Login</button>
    </nav>
  );
}

export default Navbar;
