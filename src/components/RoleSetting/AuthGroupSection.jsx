import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../Commons/Line';
import { useFetchData } from '../../hooks/useFetchData';
import { useInfiniteFetchData } from '../../hooks/useInfiniteFetchData';
import { getAuthGroupApi, getCountAuthGroupApi } from '../../api/authgroup';
import AuthGroupList from './AuthGroupList';

export default function AuthGroupSection({ activeAuthId, setActiveAuthId}) {
  const rangeOptions = ['전체', '부서', '사원'];  // 필터 옵션을 배열로 정의
  const orderOptions = [
    { label: '필터', value: 'none' },
    { label: '오래된순', value: 'authDashboardIdAsc' },
    { label: '최신순', value: 'authDashboardIdDesc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
  ];
  const [rangeOp, setRangeOp] = useState(rangeOptions[0]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [searchTerm, setSearchTerm] = useState(null);
  const { data: countData, isLoading: isLoadingCount, error: isErrorCount, statusCode} = useFetchData(getCountAuthGroupApi);
 
  useEffect(() => {
    console.log("countData:", countData);  // <--- 이 줄을 추가
  }, [statusCode, countData, isLoadingCount, isErrorCount ]);

  return (
    <Container>
      <StyledSelect onChange={e => setRangeOp(e.target.value)}>
        {rangeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
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
      <GroupCountFilter>
        <p>그룹 개수: {countData}</p>
        <select value={orderBy} onChange={e => setOrderBy(e.target.value)}>
        {orderOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </GroupCountFilter>
      <Line color="#C9C9C9" height={"1px"} top={"5px"}/>
      <AuthGroupList 
        activeAuthId={activeAuthId} 
        setActiveAuthId={setActiveAuthId} 
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 300px;
  height: 90%;
  border-top: 2px solid #747474;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
  margin-bottom: 20px;
  height: 30px;
`;

const StyledInput = styled.input`
  flex:1;
`;



const GroupCountFilter = styled.div`
  display: flex;
  justify-content: space-between
`;
