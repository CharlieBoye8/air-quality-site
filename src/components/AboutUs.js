import React from "react";
import { FaTree, FaGlobeAmericas, FaHandsHelping } from "react-icons/fa";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="aboutUs">
      <h2>About Us:</h2>
      <div className="iconRow">
        <div className="iconBlock">
          <FaTree size={60} color="#4CAF50" />
          <p>Eco-Friendly</p>
        </div>
        <div className="iconBlock">
          <FaGlobeAmericas size={60} color="#2196F3" />
          <p>Global Impact</p>
        </div>
        <div className="iconBlock">
          <FaHandsHelping size={60} color="#FF9800" />
          <p>Community Driven</p>
        </div>
      </div>
      <div className="abtText">
        <p>
          We are on a mission to make air quality monitoring affordable and
          accessible to everyone. Did you know that low-income communities often
          experience worse air quality than wealthier areas? That's where we
          come in!
        </p>
        <p>
          Our project is focused on building an open-source air quality
          monitoring system right here in Gettysburg. With 10 sensors, we will
          provide real-time data and empower others to replicate this system.
          Follow our journey to cleaner air!
        </p>
      </div>
      <div className="team-section">
        <h2>Meet the team</h2>
        <div className="team-members">
          <div>Charlie</div>
          <div>Binh</div>
          <div>Dan</div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
