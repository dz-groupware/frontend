import React, { useEffect } from 'react'
import { getGnbListOfAuthApi, getLnbListOfAuthApi } from '../../../api/authgroup';
import styled from 'styled-components';
import { useFetchData } from '../../../hooks/useFetchData';
import MenuItemView from './MenuItemView';

export default function MenuOfAuth({ authId, headers }) {
  const { data, isLoading, setShouldFetch, error } = useFetchData(getGnbListOfAuthApi,{
    paths: {
      authId,
    },
    shouldFetch:false,
    headers,
  });
  useEffect(() => {
    if(authId !== null && authId !== undefined) { // authId가 유효한지 검사
      setShouldFetch(true);
    }
  }, [authId]);

  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>에러가 발생하였습니다...</div>;
  if (!data) return null;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>메뉴명</Th>
            <Th style={{ width: '13%'}}>사용여부</Th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <MenuItemView
                key={item.menuId} 
                item={item}
                authId={authId}
                fetchApi={getLnbListOfAuthApi}
                paths={{authId, parId: item.menuId }}
                headers={headers}
              />
            ))
          ) : (
          <tr>
            <StyledTd colSpan="2">현재 매핑된 메뉴가 없습니다</StyledTd>
          </tr>
        )}
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 1.2rem;
  border-top: 2px solid gray;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
          3px 3px 3px 0px rgba(0,0,0,.1),
          1px 1px 3px 0px rgba(0,0,0,.1);
          outline: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  overflow-y: hidden;
  thead tr {
    th:nth-child(1) {
      border-right: 1px dashed #ccc;
      border-left: 1px solid #ccc;
    }

    th:nth-child(2) {
      border-left: none;
      border-right: 1px solid #ccc;
      text-align: center;
    }
  }
`;

const Th = styled.th`
  text-align: center;
  height: 2.5rem;
  padding: 0.5rem;
  background-color: #f2f2f2;
  border-bottom: 2px solid #ddd;
  font-weight: bold; // 글씨를 진하게
  font-size: 18px; // 글씨 크기를 18px로
`;
const StyledTd = styled.td`
  border-top: 1.5px solid #ccc;
  border-bottom: 1.5px solid #ccc;
  border-left: 1.5px solid #ccc;
  border-right: 1.5px solid #ccc;
  padding: 8px;
  text-align: center;
`;