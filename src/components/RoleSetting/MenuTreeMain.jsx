import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getGnbList, getLnbList } from '../../api/authgroup';
import MenuItem from './MenuItem';
import { useFetchData } from '../../hooks/useFetchData';

export default function MenuTreeMain({ companyId }) {
  const { data, isLoading, error } = useFetchData( getGnbList, {paths:{companyId}});
  const [selectedKey, setSelectedKey] = useState(null);

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
          childNodeYn={item.childNodeYn}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  min-width: 300px;
`;

