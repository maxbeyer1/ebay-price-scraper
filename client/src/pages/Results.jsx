import React from "react";
import { Col, Row, Typography, Flex } from "antd";
import { useLocation } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import HistoryTable from "../components/HistoryTable";
import StatCard from "../components/StatCard";
import useLocalStorage from "../hooks/useLocalStorage";

const { Title, Text } = Typography;

/**
 * Renders the Results page component.
 *
 * @returns {JSX.Element} The Results page component.
 */
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
  
  // store recent searches in local storage
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
          <StatCard title="Average Price" value={averagePrice.toFixed(2)} prefix="$" />
          <StatCard 
            title="Min Price" 
            value={minPrice.toFixed(2)} 
            prefix="$"
            otherTitle="Max Price" 
            otherValue={maxPrice.toFixed(2)} 
          />
          <StatCard title="Total Listings" value={totalListings} />
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
