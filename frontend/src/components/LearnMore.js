import React from 'react';
import "../styles/LearnMore.css";

const LearnMore = () => {
  const locations = [
    { name: 'Gettysburg Hotel', description: 'Located in the heart of Gettysburg, this sensor monitors air quality around the bustling town center.' },
    { name: 'Gettysburger', description: 'Monitors air quality near one of the most popular dining spots in Gettysburg, offering insights into the impact of traffic and local activity.' },
    { name: 'West Building', description: 'This sensor tracks air quality in a quieter part of town, offering a comparison to more urbanized areas.' },
    { name: 'East Building', description: 'Monitors air quality in an industrial part of town to help assess the effect of factories and businesses.' },
    { name: 'Town Square', description: 'The heart of Gettysburg, where the sensor tracks traffic and pedestrian activity and its impact on air quality.' },
    { name: 'Lincoln Square', description: 'A bustling area near local landmarks, providing insights into how tourism impacts air quality.' },
    { name: 'Suburban Area', description: 'Monitors the air quality in a residential area, offering data from a less congested part of Gettysburg.' },
    { name: 'Parkside', description: 'This sensor tracks the air quality in a green park area, providing data on how vegetation influences pollution.' },
    { name: 'University Campus', description: 'Monitors air quality in an educational environment, offering insights into how a campus setting affects pollution levels.' },
    { name: 'Shopping District', description: 'Tracks air quality near retail areas, with a focus on consumer traffic and vehicle emissions.' },
  ];

  return (
    <div className="learn-more-container">
      <div className="title-box">
        <h1>Learn More About Our Air Quality Monitoring</h1>
        <p>Our air quality monitoring system helps provide real-time data on environmental health. The following sections explain the types of data collected and how they contribute to understanding air quality.</p>
      </div>

      <div className="info-box">
        <h3>Types of Data We Collect</h3>
        <p>Our air quality monitoring system gathers data from sensors across multiple locations, providing insights into various environmental factors. Below is general information about each sensor and its role in measuring air quality:</p>

        <div className="module-info">
          <h4>PM2.5 Sensor</h4>
          <p>Measures fine particulate matter (PM2.5) in the air, which can cause serious health issues when inhaled, especially in urban areas.</p>
        </div>

        <div className="module-info">
          <h4>MQ-3 Sensor</h4>
          <p>Detects the concentration of gases such as ethanol, methane, and carbon monoxide, which can indicate air quality and pollution levels from sources like vehicles.</p>
        </div>

        <div className="module-info">
          <h4>MQ-7 Sensor</h4>
          <p>Monitors carbon monoxide (CO) levels in the air, a harmful pollutant that can lead to poisoning in high concentrations, especially from vehicle exhaust.</p>
        </div>

        <div className="module-info">
          <h4>MQ-135 Sensor</h4>
          <p>Detects a variety of gases, including ammonia, benzene, alcohol, and CO2, helping to assess overall air quality and pollution sources.</p>
        </div>
      </div>

      <h2>Locations</h2>
      <div className="location-section">
        {locations.map((location, index) => (
          <div key={index} className="location-info">
            <h4>{location.name}</h4>
            <p>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
