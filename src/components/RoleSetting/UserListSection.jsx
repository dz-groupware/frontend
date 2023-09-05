import React from 'react'
import { styled } from 'styled-components'
import { getUserListOfAuth } from '../../api/authgroup';
import { useFetchData } from '../../hooks/useFetchData';
import UserListItem from './UserListItem';

export default function UserListSection({ activeAuthId }) {

  const { data, isLoading, error } = useFetchData(getUserListOfAuth, {
    paths:{authId: activeAuthId},
    shouldFetch: activeAuthId != null
  });

  if(isLoading) return <div>로딩중</div>;
  if(error) return <div>에러</div>;
  if(!data) return null;
  if (typeof data[Symbol.iterator] !== 'function') {
    return <div>데이터가 iterable하지 않습니다.</div>;
  }
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
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  color: black;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;
