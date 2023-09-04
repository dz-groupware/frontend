import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../Commons/Line';
import { getAuthGroup, getCountAuthGroup } from '../../api/authgroup';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthGroupItem from './AuthGroupItem';

export default function AuthGroupSection({ companyId, activeAuthId, setActiveAuthId, setSelectedAuthId}) {
  const rangeOptions = ['전체', '부서', '사원'];  // 필터 옵션을 배열로 정의
  const orderOptions = [
    { label: '필터', value: 'none' },
    { label: '오래된순', value: 'authDashboardIdAsc' },
    { label: '최신순', value: 'authDashboardIdDesc' },
    { label: '권한명순', value: 'authNameAsc' },
    { label: '권한명역순', value: 'authNameDesc'},
    // ... 다른 옵션들
  ];
  
  const [rangeOp, setRangeOp] = useState(rangeOptions[0]);
  const [orderBy, setOrderBy] = useState(orderOptions[0].value);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupCount, setGroupCount] = useState(0); // 데이터받아서 쓸것
  
  const pageSize = 10;
  const queryClient = useQueryClient();
  const {
    data: countData,
    isLoading: isLoadingCount,
    isError: isErrorCount,
  } = useQuery(['authGroupCount', companyId, orderBy], getCountAuthGroup, {
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery(
    ['authSummaries'],
    ({ pageParam = 0 }) => getAuthGroup({ queryKey: ['authSummaries',companyId , pageSize ,pageParam ,orderBy]  }),  // <--- 수정
    {
      getNextPageParam: (lastPage) => {//lastPage는 배열로 넘어온다.만약에 data{}로넘어온다면 data. 으로 조회
        const lastAuthSummary = lastPage[lastPage.length - 1];
        if (!lastAuthSummary) return undefined;
        return lastAuthSummary.id;  
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
  }, [orderBy, searchTerm]);

  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>Error occurred</div>;
  if (!data) return null;

  
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
            style={{ border: '1px solid #a9a9a9', height: '100%', overflowY: 'auto' }}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            useWindow={false}
        >
          {data.pages.map((items, i) => (
            <div key={i}>
              {items.map(item => (
                <AuthGroupItem 
                  key={item.id}
                  item={item}
                  onClick={() => { 
                    setActiveAuthId(item.id); 
                }}
                  isActive={activeAuthId === item.id}
                >
                </AuthGroupItem>
              ))}
            </div>
          ))}
          </InfiniteScroll>
          {isFetchingNextPage && <div>로딩중입니다...</div>}
          {!hasNextPage && <div>더 이상 로드할 페이지가 없습니다.</div>}
        </GroupList>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 300px;
  height: 100%;
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
  margin-bottom: 20px;
  height: 30px;
`;

const StyledInput = styled.input`
  flex:1;
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 600px;
  overflow-y: auto; 
`;

const GroupCountFilter = styled.div`
  display: flex;
  justify-content: space-between
`;
