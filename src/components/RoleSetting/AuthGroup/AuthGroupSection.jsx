import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../../Commons/Line';
import AuthGroupList from './AuthGroupList';
import { FiSearch } from 'react-icons/fi'
import ActionButton from '../../Commons/ActionButton';
import { useFetchData } from '../../../hooks/useFetchData';
import { getCountAuthGroupApi } from '../../../api/authgroup';

export default function AuthGroupSection({ activeAuthId, setActiveAuthId, refresh, isEditMode, handleItemClick, headers}) {
  const canUseAuthOptions = [
    { label: '전체', value: '' },
    { label: '사용', value: true},
    { label: '미사용', value: false},
  ]
  const orderOptions = [
    { label: '최신순', value: 'authDashboardIdDesc' },
    { label: '오래된순', value: 'authDashboardIdAsc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
  ];
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [canUseAuth, setCanUseAuth] = useState(canUseAuthOptions[0].value);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: countData, isLoading: isLoadingCount, error: isErrorCount, setShouldFetch} = useFetchData(getCountAuthGroupApi, {
    headers,
    params:{canUseAuth: canUseAuth === '' ? null : canUseAuth},
    shouldFetch:false
  });
  const [isFilterd, setIsFiltered] = useState(false);
  
  const handleSearch = () => {
    if(searchInput === null || searchInput === undefined || searchInput === '') return;
    setSearchTerm(searchInput);
    setSearchInput('');  // 초기화
    setIsFiltered(true);
  };
  const handleRefresh = () => {
    setSearchTerm();
    setSearchInput('');  // 초기화
    setIsFiltered(false);
  };

  useEffect(()=>{
    setShouldFetch(true);
  },[refresh,canUseAuth]);
  useEffect(()=>{
    console.log('옵션',canUseAuth);
  },[canUseAuth])
;
  return (
    <Container>
      <StyledSelect           
          value={canUseAuth} 
          onChange={e => setCanUseAuth(e.target.value)} 
        >
        {canUseAuthOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
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
          {!isLoadingCount && !isErrorCount && ` ${countData}개`}
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
        refresh={refresh}
        activeAuthId={activeAuthId} 
        setActiveAuthId={setActiveAuthId} 
        canUseAuth={canUseAuth}
        orderBy={orderBy}
        searchTerm={searchTerm}
        isEditMode={isEditMode}
        handleItemClick={handleItemClick}
        headers={headers}
      />
      {isFilterd && <ActionButton onClick={()=>handleRefresh()} name="필터 초기화" /> }
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 300px;
  height: 90%;
  border-left: 1.5px solid #ccc;
  border-right: 1.5px solid #ccc;
  border-bottom: 1.5px solid #ccc;
  border-top: 2px solid gray;
  background-color: #FAFAFA;
  padding: 20px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;
const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  height: 2.1rem;
  padding: 7px;
  border: 1px solid #C9C9C9;
  border-radius: 4px;
  font-weight:550;
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

  p{
    font-weight:500;

  }
`;

