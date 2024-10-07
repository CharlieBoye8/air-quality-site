import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Map from './components/Map';
import Team from './components/Team';
import Compare from './components/Compare';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
// import TryIt from './components/TryIt';
// import Stats from './components/Stats';

function App() {
  const [activeComponent, setActiveComponent] = useState('welcome');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'welcome':
        return <Welcome />;
      case 'aboutUs':
        return <AboutUs />;
      case 'map':
        return <Map />;
      case 'stats':
        // return <Stats />;
        break;
      case 'compare':
        return <Compare />;
      case 'team':
        return <Team />;
      case 'tryIt':
        // return <TryIt />;
        break;
      case 'login':
        return <Login />;
      default:
        return <Welcome />;
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
