import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './pages/router';

import './App.css';

const App = () => {
  return (
    <div className="App" style={{ height: '100vh', backgroundColor: '#fcfcfc' }}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;