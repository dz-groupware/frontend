import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../Commons/Line';
import { getAuthGroup, getCountAuthGroup } from '../../api/company';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AuthGroupSection() {
  const rangeOptions = ['전체', '부서', '사원'];  // 필터 옵션을 배열로 정의
  const orderOptions = [
    { label: '필터', value: 'none' },
    { label: '오래된순', value: 'authCompanyIdAsc' },
    { label: '최신순', value: 'authCompanyIdDesc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
    // ... 다른 옵션들
  ];
  
  const [activeId, setActiveId] = useState(null);
  const [rangeOp, setRangeOp] = useState(rangeOptions[0]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);

  const [searchTerm, setSearchTerm] = useState('');
  const [groupCount, setGroupCount] = useState(0); // 데이터받아서 쓸것
  
  const companyId=1;
  const queryClient = useQueryClient();
  const {
    data: countData,
    isLoading: isLoadingCount,
    isError: isErrorCount,
  } = useQuery(['authGroupCount', companyId, orderBy], getCountAuthGroup, {
    staleTime: 300000,
  });
  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery(
    ['authSummaries'],
    ({ pageParam }) => getAuthGroup({ queryKey: ['authSummaries',companyId , ,pageParam ,orderBy]  }),  // <--- 수정
    {
      getNextPageParam: (lastPage) => {//lastPage는 배열로 넘어온다.만약에 data{}로넘어온다면 data. 으로 조회
        const lastAuthSummary = lastPage[lastPage.length - 1];
        if (!lastAuthSummary) return undefined;
        return lastAuthSummary.id; //해당데이터의 식별자
      },
    }
  );

  useEffect(() => {
    if (countData) {
      setGroupCount(countData);
    } else if(isLoadingCount) {
      setGroupCount("Api 서버 요청중...");
    } else if(isErrorCount) {
      setGroupCount("Api 서버 에러 발생");
    }
  }, [countData, isLoadingCount, isErrorCount]);

  useEffect(() => {
  queryClient.removeQueries('authSummaries');
}, [orderBy, searchTerm, queryClient]);

  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!data) return null;

  
  return (
    <SidebarContainer>
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
        <p>그룹 개수: {groupCount}</p>
        <select value={orderBy} onChange={e => setOrderBy(e.target.value)}>
        {orderOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </GroupCountFilter>
      <Line color="#C9C9C9" height={"1px"} top={"5px"}/>
      <GroupList>
        <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            useWindow={false}
        >
          {data.pages.map((items, i) => (
            <div key={i}>
              {items.map(item => (
                <Company 
                  key={item.id}
                  companyId={companyId}  
                  onClick={() => setActiveId(item.id)} 
                  isActive={activeId === item.id}
                >
                  <p>회사 이름: {item.companyName}</p>
                  <p>권한 이름: {item.authName}</p>
                </Company>
              ))}
            </div>
          ))}
          </InfiniteScroll>
          {isFetchingNextPage && <div>로딩중입니다...</div>}
        </GroupList>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  margin-top: 20px;
  width: 300px;
  border: 1px solid #ccc;
  height: 100%;
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
const GroupCountFilter = styled.div`
  display: flex;
  justify-content: space-between
`;
const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 300px); 
  overflow-y: auto; 
`;

const Company = styled.div`
  border: 1px solid #ccc;
  border-width: ${props => props.isActive ? '2px' : '1px'};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  height: 100px;
  transition: background-color 0.2s ease, border-color 0.2s ease;  // 부드럽게 색이 변경되도록
  &:hover {
    border-width: 2px;
    background-color: #d0cece84;  // 마우스 오버시 배경색 변경
    border-color: #d0cece84;          // 마우스 오버시 테두리 색 변경
  }

  &:active {
    border-width: 2px;
    background-color: #5dc3fb;  // 클릭시 배경색 변경
    border-color: #5dc3fb;  
  }
  background-color: ${props => props.isActive ? 'rgba(93, 195, 251, 0.7)' : 'transparent'};
  border-color: ${props => props.isActive ? 'rgba(121, 125, 241, 0.7)' : '#ccc'};
`;