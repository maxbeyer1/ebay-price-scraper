import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider 
    theme={{
      components: {
        // customize nav bar menu styles
        Menu: {
          itemBg: '#F8F8F8',
          lineType: 'none',
        }
      }, 
      token: {
        // main customizations
        colorPrimary: '#2a90cb',
        fontFamily: 'Apercu Pro, sans-serif',
        // fix placeholder color on Select component
        colorTextPlaceholder: 'rgba(0, 0, 0, 0.88)', 
      } 
    }}
  >
    <App />
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
