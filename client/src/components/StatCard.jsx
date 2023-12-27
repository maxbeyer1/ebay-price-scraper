import React from "react";
import { Card, Statistic } from "antd";

const StatCard = ({ title, value, prefix}) => {
  return (
    <Card bordered={false} style={{ width: 200, boxShadow: '0px 2px 4px 0px #C8C8C840' }}>
      <Statistic title={title} value={value} prefix={prefix} />
    </Card>
  );
}

export default StatCard;