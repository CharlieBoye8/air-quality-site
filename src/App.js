import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import StatsMap from './components/Map';
import Team from './components/Team';
import LocationComparison from './components/Stats';

function App() {
  const [activeComponent, setActiveComponent] = useState('welcome'); // Default component is 'welcome'

  const renderComponent = () => {
    switch (activeComponent) {
      case 'welcome':
        return <Welcome />;
      case 'map':
        return <StatsMap />;
      case 'stats':
        return <StatsMap />;
      case 'team':
        return <Team />;
      case 'compare':
        return <LocationComparison />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="App">
      <Navbar setActiveComponent={setActiveComponent} />  {/* Pass down the state setter */}
      {renderComponent()}  {/* Conditionally render the component based on activeComponent */}
    </div>
  );
}

export default App;
