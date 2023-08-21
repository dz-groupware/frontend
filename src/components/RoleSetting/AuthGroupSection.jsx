import React, { useState } from 'react';
import styled from 'styled-components';
import Line from '../Commons/Line';


export default function AuthGroupSection() {
  const [filter, setFilter] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [groupCount, setGroupCount] = useState(10); // 데이터받아서 쓸것
  const companies = [
    { name: '회사1', number: '12345' },
    { name: '회사2', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    { name: '회사3', number: '67890' },
    // 더 많은 회사 데이터...
  ];

  return (
    <SidebarContainer>
      <StyledSelect onChange={e => setFilter(e.target.value)}>
        <option value="전체">전체</option>
        <option value="필터1">필터1</option>
        <option value="필터2">필터2</option>
      </StyledSelect>
      <SearchBar>
        <StyledInput
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="검색..."
        />
        <button>🔍</button>
      </SearchBar>
      <div>
        <p>그룹 개수: {groupCount}</p>
        <Filter>필터: {filter}</Filter>
      </div>
      <Line color="#C9C9C9" height={"1px"}/>
      <GroupList>
        {companies.map((company, index) => (
          <Company key={index}>
            <p>회사 이름: {company.name}</p>
            <p>회사 번호: {company.number}</p>
          </Company>
        ))}
      </GroupList>
      {/* 페이지네이션 로직... */}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  padding: 20px;
`;
const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  height: 30px;
`;
const StyledInput = styled.input`
  flex:1;
`;
const Filter = styled.div`
  border: none;
  background: none;
  color: grey;
  margin-bottom: 10px;
`;

const Company = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
`;