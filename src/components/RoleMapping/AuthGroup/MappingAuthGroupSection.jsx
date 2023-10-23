import React, { useEffect, useState } from 'react'
import { useFetchData } from '../../../hooks/useFetchData';
import { getAuthGroupApi, getCountAuthGroupApi, getEmpAuthCountApi } from '../../../api/authgroup';
import styled from 'styled-components';
import ActionButton from '../../Commons/ActionButton';
import { FiSearch } from 'react-icons/fi';
import MappingAuthGroupList from './MappingAuthGroupList';
import Line from '../../Commons/Line';

export default function MappingAuthGroupSection({ activeAuthId, activeEmp, handleAuthClick, isEditMode, selectedAuthIds, handleCheckboxChange ,setSelectedAuthIds, headers}) {
  const orderOptions = [
    // { label: '필터', value: 'none' },
    { label: '최신순', value: 'authDashboardIdDesc' },
    { label: '오래된순', value: 'authDashboardIdAsc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
  ];
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterd, setIsFiltered] = useState(false);

  const { data: countData, isLoading: isLoadingCount, error: isErrorCount, statusCode, setShouldFetch} = useFetchData(isEditMode ? getCountAuthGroupApi : getEmpAuthCountApi,{
    paths: isEditMode? null :{employeeId: activeEmp.id},
    params: isEditMode? {canUseAuth: true}: null,
    shouldFetch:false,
    headers
  });



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
    if(activeEmp.id){
      setShouldFetch(true);
    }
    if(!isEditMode) {
      setSelectedAuthIds({});
    }
  },[activeEmp,isEditMode]);

  useEffect(() => {
    console.log(selectedAuthIds)
  },[selectedAuthIds]);
  
  if (!activeEmp.id) {
    return null;  
  }

  return (
    <Container>
      <Title> 권한그룹목록</Title>
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
        <ActionButton onClick={()=>handleSearch()} name={<FiSearch/>} />
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
      <MappingAuthGroupList 
        orderBy={orderBy}
        searchTerm={searchTerm}
        activeAuthId={activeAuthId}
        activeEmp={activeEmp}
        handleAuthClick={handleAuthClick}
        selectedAuthIds={selectedAuthIds}
        handleCheckboxChange={handleCheckboxChange}
        isEditMode={isEditMode}
        headers={headers}
      />
      {isFilterd && <ActionButton onClick={()=>handleRefresh()} name="필터 초기화" /> }
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 350px;
  min-width: 350px;
  height: 94%;
  border-top: 2px solid #747474;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  background-color: #FAFAFA;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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

const Title = styled.p`
  font-weight: 600;
`;