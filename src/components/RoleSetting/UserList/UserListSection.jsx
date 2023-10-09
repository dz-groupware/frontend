import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../../hooks/useFetchData';
import UserListItem from './UserListItem';
import { getUserListOfAuthApi } from '../../../api/authgroup';

export default function UserListSection({ authId, headers }) {
  const { data, isLoading, setShouldFetch, error } = useFetchData(getUserListOfAuthApi, {
    paths: { authId },  // paths 객체에 authId 추가
    shouldFetch: false,
    headers: headers,
  });
  useEffect(() => {
    if(authId !== null && authId !== undefined) { // authId가 유효한지 검사
      setShouldFetch(true);
    }
  }, [authId]);
  
  if(isLoading) return <div>로딩중</div>;
  if(error) return <div>에러</div>;
  if(!data) return <div>데이터없음</div>;

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>부서</StyledTh>
            <StyledTh>사원명</StyledTh>
            <StyledTh>직급/직책</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <UserListItem
                key={item.id}
                item={item}
              />
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  height: 600px;
  overflow-y: auto;
  border-top: 1.5px solid #ccc;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  color: black;
  border-left: 1.5px solid #ccc;
  border-right: 1.5px solid #ccc;
  padding: 8px;
  text-align: left;
`;
