import React, { forwardRef } from 'react'
import styled from 'styled-components';

const AuthGroupItem = forwardRef(({ item, onClick, isActive, isEditMode }, ref) => {
  return (
    <Container ref={ref} $isActive={isActive} $isEditMode={isEditMode} onClick={onClick}>
      <p>회사id- {item.companyId}</p>
      <p>회사명- {item.companyName}</p>
      <p>권한id- {item.authId}</p>
      <p>권한명- {item.authName}</p>
    </Container>
  )
});

export default AuthGroupItem;

const Container = styled.div`
  border: 1px solid #ccc;
  border-width: ${props => props.$isActive ? '2px' : '1px'};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  height: 100px;
  transition: background-color 0.2s ease, border-color 0.2s ease;  
  
  ${props => !props.$isEditMode && `
    &:hover {
      border-width: 2px;
      background-color: #d0cece84;  
      border-color: #d0cece84;          
    }
  `}

  ${props => !props.$isEditMode && `
    &:active {
      border-width: 2px;
      background-color: #5dc3fb;  
      border-color: #5dc3fb;  
    }
  `}
  background-color: ${props => props.$isActive ? '#e6f4ff' : 'transparent'};
  border-color: ${props => props.$isActive ? '#7BAAF1' : '#ccc'};
`;
