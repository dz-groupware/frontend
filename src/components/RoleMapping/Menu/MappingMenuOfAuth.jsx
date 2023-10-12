import React, { useEffect } from 'react'
import { getGnbListOfAuthApi, getLnbListOfAuthApi } from '../../../api/authgroup';
import styled from 'styled-components';
import { useFetchData } from '../../../hooks/useFetchData';
import MappingMenuItemView from './MappingMenuItemView';

export default function MappingMenuOfAuth({ authId, headers }) {
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
  if (error) return <div>{console.log(error)}</div>;
  if (!data) return null;
  if (!authId) {
    return null;
  }
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>메뉴명</Th>
            <Th>사용여부</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <MappingMenuItemView
              key={item.menuId} 
              item={item}
              authId={authId}
              fetchApi={getLnbListOfAuthApi}
              paths={{authId, parId: item.menuId }}
              headers={headers}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 1.2rem;
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
  text-align: left;
  padding: 0.5rem;
  background-color: #f2f2f2;
  border-top: 2px solid #f2f2f2;
  border-bottom: 2px solid #f2f2f2;
  font-weight: 600;
`;