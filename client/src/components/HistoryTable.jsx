import React from "react";
import { Card, Table } from "antd";

/**
 * Renders a table component to display historical data.
 *
 * @component
 * @param {Object[]} data - The data to be displayed in the table.
 * @returns {JSX.Element} The rendered HistoryTable component.
 */
const HistoryTable = ({ data }) => {
  // define columns for table
  const columns = [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      key: 'dateRange',
    },
    {
      title: 'Average Price',
      dataIndex: 'averagePrice',
      key: 'averagePrice',
    },
    {
      title: 'Min Price',
      dataIndex: 'minPrice',
      key: 'minPrice',
    },
    {
      title: 'Max Price',
      dataIndex: 'maxPrice',
      key: 'maxPrice',
    },
    {
      title: 'Total Listings',
      dataIndex: 'totalListings',
      key: 'totalListings',
    },
  ]

  return (
    <Card bordered={false} style={{ width: 950, boxShadow: '0px 2px 4px 0px rgba(200, 200, 200, 0.25)' }}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
}

export default HistoryTable;