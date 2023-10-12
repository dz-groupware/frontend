import React from 'react'
import { styled } from 'styled-components';

export default function PageContainer({children}) {
  return (
    <StyledPage>{children}</StyledPage>
  )
}

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;