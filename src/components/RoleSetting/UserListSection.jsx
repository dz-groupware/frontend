import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { styled } from 'styled-components'
import { getAuthGroup } from '../../api/company';

export default function UserListSection() {
  
  return (
    <Container>
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  height: 600px;
`;
