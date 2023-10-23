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
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <UserListItem
                key={item.id}
                item={item}
              />
            </tr>
          ))
        ) : (
          <tr>
            <StyledTd colSpan="3">현재 권한이 부여된 사원이 없습니다</StyledTd>
          </tr>
        )}
      </tbody>
      </StyledTable>
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  height: 600px;
  overflow-y: auto;
  border-top: 2px solid gray;
  
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  color: black;
  height: 2rem;
  font-size: 18px; 
  font-weight: bold;
  border-left: 1.5px solid #ccc;
  border-right: 1.5px solid #ccc;
  padding: 8px;
  text-align: center;
`;
const StyledTd = styled.td`
  border-top: 1.5px solid #ccc;
  border-bottom: 1.5px solid #ccc;
  border-left: 1.5px solid #ccc;
  border-right: 1.5px solid #ccc;
  padding: 8px;
  text-align: center;
`;