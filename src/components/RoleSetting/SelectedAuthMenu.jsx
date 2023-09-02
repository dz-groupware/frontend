import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../hooks/useFetchData';
import { getAuthGroupMenuList } from '../../api/company';
import MenuItem from './MenuItem';

export default function SelectedAuthMenu({ companyId,activeAuthId }) {
  
  const { data, isLoading, error } = useFetchData(getAuthGroupMenuList,{
    paths: {
      companyId:1,
      authId: activeAuthId,
    }
  });
  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return (
    <Container>
      {data.map((item, index) => (
        <MenuItem 
          key={item.id} 
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
