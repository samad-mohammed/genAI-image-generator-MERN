import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';

const SearchBarContainer = styled.div`
  max-width : 550px;
  display : flex;
  width : 90%;
  border : 1px solid ${({theme}) => theme.text_secondary +90};
  border-radius : 8px;
  padding : 12px 16px;
  curosr : pointer;
  gap: 6px;
  align-items:center;
`

const SearchBar = () => {
  return (
    <SearchBarContainer>
        <SearchOutlined/>
        <input style={{
            border:'none', outline:'none',
            width : '100%',
            color: 'inherit',
            background : 'transparent'
        }}
        placeholder='Search with prompt or name'
        />
    </SearchBarContainer>
  )
}

export default SearchBar