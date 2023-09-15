import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../../Commons/Line';
import AuthGroupList from './AuthGroupList';
import { FiSearch } from 'react-icons/fi'
import ActionButton from '../../Commons/ActionButton';
import { useFetchData } from '../../../hooks/useFetchData';
import { getCountAuthGroupApi } from '../../../api/authgroup';

export default function AuthGroupSection({ activeAuthId, setActiveAuthId}) {
  const rangeOptions = ['전체', '사용', '미사용'];  // 필터 옵션을 배열로 정의
  const orderOptions = [
    { label: '필터', value: 'none' },
    { label: '오래된순', value: 'authDashboardIdAsc' },
    { label: '최신순', value: 'authDashboardIdDesc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
  ];
  const [rangeOp, setRangeOp] = useState(rangeOptions[0]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: countData, isLoading: isLoadingCount, error: isErrorCount, statusCode} = useFetchData(getCountAuthGroupApi);
  
  useEffect(() => {
    console.log("countData:", countData);  // <--- 이 줄을 추가
  }, [statusCode, countData, isLoadingCount, isErrorCount ]);
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };
  
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
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="권한명 검색..."
          onKeyUp={(e) => {
            if (e.key === 'Enter'){
              handleSearch();
            } 
          }}
        />
        <ActionButton onClick={()=>handleSearch()} name={<FiSearch/>} ></ActionButton>
      </SearchBar>
      <GroupCountFilter>
        <p>
          그룹 : 
          {isLoadingCount && 'Loading...'}
          {isErrorCount && 'Error occurred'}
          {!isLoadingCount && !isErrorCount && `${countData}개`}
        </p>
        <StyledFilterSelect 
          value={orderBy} 
          onChange={e => setOrderBy(e.target.value)}
        >
        {orderOptions.map((option, index) => (
          <option 
            key={index} 
            value={option.value}
            disabled={option.value === 'none'} // 'none' 값을 가진 option만 비활성화
            hidden={option.value === 'none'}   // 'none' 값을 가진 option만 숨김
          >
            {option.label}
          </option>
        ))}
        </StyledFilterSelect>
      </GroupCountFilter>
      <Line color="#C9C9C9" height={"1px"} top={"5px"}/>
      <AuthGroupList 
        activeAuthId={activeAuthId} 
        setActiveAuthId={setActiveAuthId} 
        orderBy={orderBy}
        searchTerm={searchTerm}
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
  height: 2.1rem;
  padding: 7px;
  border: 1px solid #C9C9C9;
  border-radius: 4px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  height: 30px;
`;

const StyledInput = styled.input`
  flex:1;
  height: 2.1rem;
  padding: 7px;
  border: 1px solid #C9C9C9;
  border-radius: 4px;
`;
const StyledFilterSelect = styled.select`
  width: 4rem;
  height: 2.1rem;
  background: transparent;
  border: none;
  border-radius: 4px;
  transition: width 0.3s;  // 부드러운 전환 효과 추가
`;
const GroupCountFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
