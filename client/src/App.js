import React, { useState } from 'react';
import { Typography, Modal, Button } from 'antd';
import SearchBar from './SearchBar';
import './App.css';

const { Title } = Typography;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App" style={{ height: '100vh', backgroundColor: '#fcfcfc' }}>
      <header style={{ backgroundColor: '#2A90CB', height: '60px', display: 'flex', alignItems: 'center', padding: '0 50px' }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>eBay Price Finder</Title>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)'}}>
        <SearchBar />
        <Button type="link" onClick={showModal} style={{ marginTop: '20px' }}>
          How to use this tool?
        </Button>
        <Modal title="How to use:" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Type your keyword in the search bar.</p>
          <p>Select the desired category and condition.</p>
          <p>Click on the search button to see the results.</p>
        </Modal>
      </div>
    </div>
  );
};

export default App;