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
              <Th>사용여부</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <MenuItemView
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
    border-top: 2px solid #747474;
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
    border-bottom: 2px solid #ddd;
    
  `;