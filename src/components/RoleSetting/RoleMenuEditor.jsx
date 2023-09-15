import React from 'react'
import styled from 'styled-components';
import MenuItem from './Menu/MenuItem';
import { useFetchData } from '../../hooks/useFetchData';
import { getCompanyGnbListApi } from '../../api/authgroup';

export default function RoleMenuEditor() {
  const { data, isLoading, error } = useFetchData(getCompanyGnbListApi);

  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <Container>
      {data.map((item, index) => (
        <MenuItem 
          key={item.menuId} 
          item={item} 
          childNodeYn={item.childNodeYn}
        />
      ))}
    </Container>
  );
}
const Container = styled.div`
`;