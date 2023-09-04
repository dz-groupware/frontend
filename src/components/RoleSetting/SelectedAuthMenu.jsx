import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../hooks/useFetchData';
import { getAuthGroup, getGnbListOfAuth, getGnbListOfAuthWithAll } from '../../api/authgroup';
import MenuItem from './MenuItem';

export default function SelectedAuthMenu({ companyId,activeAuthId }) {
  
  const { data, isLoading, error } = useFetchData(getGnbListOfAuth,{
    paths: {
      companyId,
      authId: activeAuthId,
    },
  });

  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <Container>
      {data.map((item, index) => (
        <MenuItem 
          key={item.menuId} 
          item={item} 
          companyId={companyId}  // MenuItem에 companyId 전달
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  gap: 30px;
`;
