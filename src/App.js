import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Map from './components/Map';  // Leaflet map component
import Team from './components/Team';
import Compare from './components/Compare';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
// import TryIt from './components/TryIt';      // Assuming TryIt is another component
// import Stats from './components/Stats';      // Assuming TryIt is another component

function App() {
  const [activeComponent, setActiveComponent] = useState('welcome');  // Default component is 'welcome'

  // Function to render the active component based on state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'welcome':
        return <Welcome />;
      case 'aboutUs':
        return <AboutUs />;
      case 'map':
        return <Map />;  // The Leaflet Map component is rendered here
      // case 'stats':
        // return <Stats />;  // Uncommented and now renders the Stats component
      case 'compare':
        return <Compare />;  // Compare component
      case 'team':
        return <Team />;
      // case 'tryIt':
        // return <TryIt />;  // Renders TryIt component
      case 'login':
        return <Login />;
      default:
        return <Welcome />;  // Fallback to Welcome
    }
  };

  return (
    <div className="App">
      <Navbar setActiveComponent={setActiveComponent} />  {/* Pass state setter to Navbar */}
      {renderComponent()}  {/* Conditionally render the active component */}
    </div>
  );
}

export default App;
