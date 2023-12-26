import React from "react";
import { Card, Col, Row, Typography, Flex, Statistic, Space } from "antd";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const { Title, Text } = Typography;

const Results = () => {
  const { state } = useLocation();

  console.log(state)

  const { 
    average_price: averagePrice, 
    date_range: dateRange, 
    max_price: maxPrice, 
    min_price: minPrice, 
    total_items: totalListings 
  } = state.data;

  const { keyword } = state;

  console.log(state.keyword)
  console.log(keyword)

  return (
    // results page container
    <>
      <PageHeader />
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: '5px' }}>
            Results for: <b>{keyword}</b>
          </Title>
          <Text type="secondary">{dateRange}</Text>
        </Col>
      </Row>
      <Flex style={{ marginTop: '20px' }} gap="middle" align="start" justify="center">
        <Card bordered={false} style={{ width: 200, boxShadow: '0px 2px 4px 0px #C8C8C840' }}>
          <Statistic title="Average Price" value={averagePrice.toFixed(2)} prefix="$" />
        </Card>
        <Card bordered={false} style={{ width: 300, boxShadow: '0px 2px 4px 0px #C8C8C840' }}>
          <Flex gap="large" justify="center">
            <Statistic title="Min Price" value={minPrice.toFixed(2)} prefix="$" style={{ marginLeft: '-10px' }} />
            <Space align="center" style={{ marginTop: '25px' }}>
              <Text type="secondary" strong>—</Text>
            </Space>
            <Statistic title="Max Price" value={maxPrice.toFixed(2)} prefix="$" />
          </Flex> 
        </Card>
        <Card bordered={false} style={{ width: 200, boxShadow: '0px 2px 4px 0px #C8C8C840' }}>
          <Statistic title="Total Listings" value={totalListings} />
        </Card>
      </Flex>    
    </>
  );
}

export default Results;
