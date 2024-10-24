import React from 'react';
import '../styles/Welcome.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="main-container">
      <section className="hero-section">
        <h1>Air Quality Monitor Project</h1>
        <p>Empowering communities with accessible, affordable air quality monitoring solutions.</p>
        <Link to="/about-us">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>
    </div>
  );
};

export default Welcome;
