import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";

import SearchBar from "../components/SearchBar";
import PageHeader from "../components/PageHeader";

const { Title } = Typography;

/**
 * Renders the Home page component.
 *
 * @returns {JSX.Element} The Home page component.
 */
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
      <PageHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 60px)",
        }}
      >
        <Title level={1}>Get key insights into eBay listings.</Title>
        <SearchBar />
        {/* TODO: better instructions */}
        {/* <Button type="link" onClick={showModal} style={{ marginTop: "20px" }}>
          How to use this tool?
        </Button>
        <Modal
          title="How to use:"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Type your keyword in the search bar.</p>
          <p>Select the desired category and condition.</p>
          <p>Click on the search button to see the results.</p>
        </Modal> */}
      </div>
    </>
  );
};

export default Home;
