import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import SearchBar from '../components/SearchBar';

const Home = () => {
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
    <>
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
    </>
  );
};

export default Home;