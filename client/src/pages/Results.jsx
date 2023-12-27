import React from "react";
import { Card, Col, Row, Typography, Flex, Statistic, Space } from "antd";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import HistoryTable from "../components/HistoryTable";
import useLocalStorage from "../hooks/useLocalStorage";

const { Title, Text } = Typography;

const Results = () => {
  const { state } = useLocation();

  // destructure data from state passed from search page
  const { 
    average_price: averagePrice, 
    date_range: dateRange, 
    max_price: maxPrice, 
    min_price: minPrice, 
    total_items: totalListings 
  } = state?.data || {};

  const keyword = state?.keyword || '';

  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);

  const updateRecentSearches = () => {
    const newSearch = {
      keyword: keyword,
      dateRange: dateRange,
      // format price to 2 decimal places and add dollar sign
      averagePrice: '$' + averagePrice.toFixed(2),
      minPrice: '$' + minPrice.toFixed(2),
      maxPrice: '$' + maxPrice.toFixed(2),
      totalListings: totalListings,
    };

    // update recent searches, keeping only the 10 most recent searches
    setRecentSearches([newSearch, ...recentSearches.slice(0, 9)]);
  };

  // update recent searches on mount
  React.useEffect(() => {
    if (state?.data) updateRecentSearches();
  }, []);

  return (
    <>
      <PageHeader />

      {state?.data && (
        <>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: '5px' }}>
              Results for: <b>{keyword}</b>
            </Title>
            <Text type="secondary">{dateRange}</Text>
          </Col>
        </Row>
        <Flex style={{ marginTop: '20px' }} gap="middle" align="start" justify="center">
          {/* TODO: make stat card component */}
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
      )}

      <Title level={2} style={{ fontSize: '28px', marginTop: '100px' }}>Recent Searches</Title>
      <Flex align="start" justify="center" style={{ marginTop: '20px' }}>
        <HistoryTable data={recentSearches} />
      </Flex>
    </>
  );
}

export default Results;
