import React from 'react';
import { Typography, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Header } = Layout;

const menuItems = [
  {
    key: 'search',
    path: '/',
    label: (
      <Link to="/">Search</Link>
    ),
  },
  {
    key: 'results',
    path: '/results',
    label: (
      <Link to="/results">Results</Link>
    ),
  },
];

/**
 * Renders the page header component.
 *
 * @returns {JSX.Element} The rendered page header component.
 */
const PageHeader = () => {
  const location = useLocation();

  return (
    <Header style={{ 
      background: '#F8F8F8',
      boxShadow: '0px 2px 8px 0px #F0F1F2',
      height: '64px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    }}>
      <Title level={5} style={{ marginTop: '0.5em' }}>eBay Price Finder</Title>
      <Menu 
        mode="horizontal" 
        items={menuItems}
        selectedKeys={menuItems.find(item => item.path === location.pathname)?.key || ''}
        style={{ flex: 'auto', minWidth: 0, justifyContent: 'end' }}
      />
    </Header>
  );
}

export default PageHeader;