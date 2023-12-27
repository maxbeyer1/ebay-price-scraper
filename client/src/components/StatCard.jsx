import React from "react";
import { Card, Statistic, Flex, Space, Typography } from "antd";

const { Text } = Typography;

/**
 * Renders a StatCard component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the main statistic.
 * @param {number} props.value - The value of the main statistic.
 * @param {string} props.prefix - The prefix for the main statistic value.
 * @param {string} props.otherTitle - The title of the secondary statistic.
 * @param {number} props.otherValue - The value of the secondary statistic.
 * @returns {JSX.Element} The rendered StatCard component.
 */
const StatCard = ({ title, value, prefix, otherTitle, otherValue }) => {
  return (
    <Card 
      bordered={false} 
      style={{ paddingLeft: '8px', paddingRight: '8px', boxShadow: '0px 2px 4px 0px #C8C8C840' }}
    >
      <Flex gap="large" justify="center">
        <Statistic title={title} value={value} prefix={prefix} />
        {/* if otherTitle and otherValue are passed in, render another Statistic component */}
        {otherTitle && otherValue && (
          <>
          <Space align="center" style={{ marginTop: '25px' }}>
            <Text type="secondary" strong>—</Text>
          </Space>
          <Statistic title={otherTitle} value={otherValue} prefix={prefix} />
          </>
        )}
      </Flex>
    </Card>
  );
}

export default StatCard;