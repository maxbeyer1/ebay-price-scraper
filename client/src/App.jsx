import React from 'react';
import { Typography } from 'antd';
import { RouterProvider } from 'react-router-dom';

import router from './pages/router';

import './App.css';

const { Title } = Typography;

const App = () => {
  return (
    <div className="App" style={{ height: '100vh', backgroundColor: '#fcfcfc' }}>
      {/* TODO: Seperate into own component */}
      <header style={{ backgroundColor: '#2A90CB', height: '60px', display: 'flex', alignItems: 'center', padding: '0 50px' }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>eBay Price Finder</Title>
      </header>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;