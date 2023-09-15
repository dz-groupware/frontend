import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../../hooks/useFetchData';
import { getGnbListOfAuthWithAllApi, getLnbListOfAuthWithAllApi } from '../../../api/authgroup';
import MenuItem from './MenuItem';

  export default function MenuOfAuthEditor({ authId }) {
    
    const { data, isLoading, setShouldFetch, error } = useFetchData(getGnbListOfAuthWithAllApi,{
      paths: {
        authId,
      },
    });
    // const dispatch = useDispatch();
    // const { data, isLoading, error } = useSelector((state) => state.authMappedMenu);

    useEffect(() => {
      if(authId !== null && authId !== undefined) { // authId가 유효한지 검사
        setShouldFetch(true);
      }
    }, [authId]);

    // useEffect(() => {
    //   if(authId !== null && authId !== undefined) {
    //     dispatch(fetchAuthMappedMenuByThunk(authId));
    //   }
    // }, [authId, dispatch]);
    if (isLoading) return <div>로딩중입니다!...</div>;
    if (error) return <div>{console.log(error)}</div>;
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
              <MenuItem 
                key={item.menuId} 
                item={item}
                hasMenu={item.hasMenu}
                authId={authId}
                fetchApi={getLnbListOfAuthWithAllApi}
                paths={{authId, parId: item.menuId }}
                />
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }


  const Container = styled.div`
    margin-bottom: 1.2rem;
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
    background-color: beige;
    border-bottom: 2px solid #ccc;
  `;
