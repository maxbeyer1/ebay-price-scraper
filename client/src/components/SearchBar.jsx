import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

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
          width: '60%', 
          height: '50px',
          fontWeight: '500',
          backgroundColor: '#fff',
          textAlign: 'justify' }}>
        <Input
          style={{ width: '40%', border: '0', left: '10px', fontWeight: '500' }}
          placeholder="Enter your search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Select
          placeholder="Select category"
          onChange={setCategory}
          // suffixIcon={null}
          style={{ width: '30%', textAlign: 'center', borderTop: '0' }}
        >
          <Option value="all">All Categories</Option>
          {/* Populate with other categories */}
        </Select>
        <Select
          placeholder="Select condition"
          onChange={setCondition}
          // suffixIcon={null}
          style={{ width: '30%', textAlign: 'center' }}
        >
          <Option value="new">New</Option>
          <Option value="used">Used</Option>
          {/* Populate with other conditions */}
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
          icon={ <SearchOutlined /> }
          onClick={handleSearch} 
          shape="circle"
          loading={resultsLoading} 
          style={{ 
            borderRadius: '50%',
            maxHeight: '36px',
            minWidth: '36px', 
            maxWidth: '36px', 
            top: '7px', 
            right: '10px',
            zIndex: '1' }} />
      </Input.Group>
    </div>
  );
};

export default SearchBar;