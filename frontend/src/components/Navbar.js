/**
 * @file Navbar.js is the navbar component for the website.
 * By: Charlie Boye
 */

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../media/G.png";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Gettysburg College Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/learn-more">Learn More</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
        <li>
          <Link to="/compare">Compare</Link>
        </li>
        <li>
          <Link to="/try-it">Try it!</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/admin">Admin Console</Link>
          </li>
        )}
      </ul>
      <button className="login-btn">
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;
