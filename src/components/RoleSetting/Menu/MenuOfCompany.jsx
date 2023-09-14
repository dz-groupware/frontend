import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getCompanyGnbListApi } from '../../../api/authgroup';
import MenuItem from './MenuItem';
import { useFetchData } from '../../../hooks/useFetchData';

export default function MenuOfCompany() {
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
  min-width: 300px;
`;

