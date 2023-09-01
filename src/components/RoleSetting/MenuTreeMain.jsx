import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getGnbList, getLnbList } from '../../api/company';
import MenuItem from './MenuItem';

export default function MenuTreeMain({ companyId }) {
  const { data, isLoading, isError } = useQuery(
    ['companyData', companyId],
    getGnbList,
    { enabled: !!companyId } //companyId가 유효한 값일때만
  );

  if (isLoading) return <div>로딩중입니다!...</div>;
  if (isError) return <div>Error occurred</div>;
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
  );
}

const Container = styled.div`

`;

