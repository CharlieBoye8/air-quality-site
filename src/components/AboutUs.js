import React from "react";
import { FaTree, FaGlobeAmericas, FaHandsHelping } from "react-icons/fa";
import "../styles/AboutUs.css";
import CharlieImage from "../media/Charlie.jpg";
import BinhImage from "../media/Binh.jpg";
import DanImage from "../media/Dan.jpg";
import ConnorImage from "../media/Connor.jpg";
import BarryImage from "../media/Barry.jpeg";
import JoeImage from "../media/Joe.jpg";
import SpencerImage from "../media/Spencer.jpg";


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
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img className="team-member-img" src={CharlieImage} alt="Charlie Boye" />
            <div className="member-info">
              <div>Charlie Boye</div>
            </div>
            <p>Front-end Specialist</p>
          </div>
          <div className="team-member">
            <img className="team-member-img" src={BinhImage} alt="Binh Tran" />
            <div className="member-info">
              <div>Binh Tran</div>
            </div>
            <p>Database Specialist</p>
          </div>
          <div className="team-member">
            <img className="team-member-img" src={DanImage} alt="Dan Angelillo" />
            <div className="member-info">
              <div>Dan Angelillo</div>
            </div>
            <p>Networking Specialist</p>
          </div>
          <div className="team-member">
            <img className="team-member-img" src={ConnorImage} alt="Connor Whitlow" />
            <div className="member-info">
              <div>Connor Whitlow</div>
            </div>
            <p>Community Outreach</p> 
          </div>
        </div>
        <div className="team-members">
          <div className="team-member">
            <img className="team-member-img" src={BarryImage} alt="Barry Tang" />
            <div className="member-info">
              <div>Barry Tang</div>
            </div>
            <p>Environmental Analyst</p>
          </div>
          <div className="team-member">
            <img className="team-member-img" src={JoeImage} alt="Joe Hillesland" />
            <div className="member-info">
              <div>Joe Hillesland</div>
            </div>
            <p>Research Assistant</p>
          </div>
          <div className="team-member">
            <img className="team-member-img" src={SpencerImage} alt="Spencer Hagan" />
            <div className="member-info">
              <div>Spencer Hagan</div>
            </div>
            <p>Graphic Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
