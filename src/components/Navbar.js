import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ setActiveComponent }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="../media/G.png" alt="Gettysburg College Logo"></img>
      </div>
      <ul className="nav-links">
        <li onClick={() => setActiveComponent('welcome')}>About us</li>
        <li onClick={() => setActiveComponent('map')}>Map</li>
        <li onClick={() => setActiveComponent('stats')}>Stats</li>
        <li onClick={() => setActiveComponent('compare')}>Compare</li>
        <li onClick={() => setActiveComponent('team')}>Team</li>
        <li>Login</li>
      </ul>
      <button className="try-it-btn" onClick={() => setActiveComponent('welcome')}>Try it!</button>
    </nav>
  );
}

export default Navbar;
