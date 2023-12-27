import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

/**
 * SearchBar component.
 *
 * @returns {JSX.Element} The SearchBar component.
 */
const SearchBar = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [resultsLoading, setResultsLoading] = useState(false);
  // const [dateRange, setDateRange] = useState('');

  const handleSearch = async () => {
    setResultsLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/api', {
        params: {
          keyword: keyword,
          category: category,
          condition: condition,
          // dateRange: dateRange,
        }
      });

      console.log(response);

      navigate('/results', { state: { keyword: keyword, data: response.data } });
    } catch (err) {
      console.log(err);
    }

    setResultsLoading(false);
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      padding: '100px 0 150px 0', 
      width: '100%'
    }}>
      <Input.Group compact 
        style={{ 
          display: 'flex', 
          borderRadius: '20px',
          border: '1px solid #e0e0e0', 
          overflow: 'hidden', 
          boxShadow: '0px 4px 4px 0px rgba(193, 193, 193, 0.20)', 
          width: '65%', 
          padding: '12px 16px 12px 16px',
          fontWeight: '600',
          backgroundColor: '#fff',
          textAlign: 'justify' }}>
        <Input
          prefix={<SearchOutlined />}
          style={{ width: '40%', border: '0', left: '10px' }}
          placeholder="Enter keywords..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Select
          placeholder="Select category"
          onChange={setCategory}
          style={{ width: '30%', textAlign: 'center', borderTop: '0' }}
        >
          <Option value="all">All Categories</Option>
        </Select>
        <Select
          placeholder="Select condition"
          onChange={setCondition}
          style={{ width: '30%', textAlign: 'center' }}
        >
          <Option value="new">New</Option>
          <Option value="used">Used</Option>
        </Select>
        {/* <Select
          placeholder="Date Range"
          onChange={setDateRange}
          suffixIcon={null}
          style={{ width: '20%', textAlign: 'center', marginRight: '10px' }}
        >
          <Option value="30_days">Last 30 days</Option>
          <Option value="90_days">Last 90 days</Option>
        </Select> */}
        <Button
          type="primary"
          onClick={handleSearch}
          loading={resultsLoading}
          style={{
            background: '#1890FF',
            borderRadius: '12px',
            height: '38px',
          }}
        >
          Search
        </Button>
      </Input.Group>
    </div>
  );
};

export default SearchBar;