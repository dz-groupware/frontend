import React from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../hooks/useFetchData';
import { getGnbListOfAuthWithAllApi } from '../../api/authgroup';
import MenuItem from './MenuItem';

export default function SelectedAuthMenu({ activeAuthId }) {
  
  const { data, isLoading, error } = useFetchData(getGnbListOfAuthWithAllApi,{
    paths: {
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
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
`;
