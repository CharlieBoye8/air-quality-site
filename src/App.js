import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import StatsMap from './components/Map';
import Team from './components/Team';
import Stats from './components/Stats';
import AboutUs from './components/AboutUs';
import Login from './components/Login';

function App() {
  const [activeComponent, setActiveComponent] = useState('welcome'); 

  const renderComponent = () => {
    switch (activeComponent) {
      case 'welcome':
        return <Welcome />;
      case 'aboutUs':
        return <AboutUs />;
      case 'map':
        return <StatsMap />;
      case 'compare':
        return <Stats />;
      case 'team':
        return <Team />;
      case 'Login':
          return <Login />;
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
