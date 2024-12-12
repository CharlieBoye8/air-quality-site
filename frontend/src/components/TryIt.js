/**
 * @file TryIt.js is the page for documentation and implementation instructions
 * By: Charlie Boye
 */

import React, { useState } from "react";
import "../styles/TryIt.css";
import { FaCloud, FaCog, FaDatabase } from 'react-icons/fa';
import PartList from "../documents/HardwareInstructions.pdf";
import WebsiteConfig from "../documents/WebsiteDocumentation.pdf";

const TryItPage = () => {
  const [activeTab, setActiveTab] = useState(null);

  const pdfUrls = {
    sensor: PartList,
    website: WebsiteConfig,
  };

  return (
    <div className="try-it-page">
      {!activeTab && (
        <header className="try-it-header">
          <div className="title-box">
            <h1>Try It Out</h1>
            <p>Explore the documentation for air quality modules, website setup, and database configuration.</p>
          </div>
        </header>
      )}

      <div className="content">
        <div className={`icon-section ${activeTab ? "sidebar-active" : ""}`}>
          <div
            className="icon-card"
            onClick={() => setActiveTab("sensor")}
          >
            <FaCloud className="icon" />
            <h3>Air Quality Modules</h3>
          </div>
          <div
            className="icon-card"
            onClick={() => setActiveTab("website")}
          >
            <FaCog className="icon" />
            <h3>Website Setup</h3>
          </div>
          <div
            className="icon-card"
            onClick={() => setActiveTab("influxdb")}
          >
            <FaDatabase className="icon" />
            <h3>Database Configuration</h3>
          </div>
        </div>

        {activeTab && (
          <div className="iframe-container">
            <iframe
              src={pdfUrls[activeTab]}
              title={activeTab}
              className="pdf-iframe"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryItPage;
