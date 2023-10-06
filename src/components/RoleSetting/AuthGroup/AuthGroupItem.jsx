import React, { forwardRef } from 'react'
import styled from 'styled-components';

const AuthGroupItem = forwardRef(({ item, onClick, isActive, isEditMode }, ref) => {
  return (
    <Container ref={ref} $isActive={isActive} $isEditMode={isEditMode} onClick={onClick}>
      <StyledEnabledYn $enabledYn={item.enabledYn}>
        {item.enabledYn? "사용" : "미사용"}
      </StyledEnabledYn> 
      <StlyedTextWrapper>
        <p><StyledLabel>회사명 :</StyledLabel>  {item.companyName}</p>
        <p><StyledLabel>권한명 :</StyledLabel> {item.authName}</p>
        <p><StyledLabel>메뉴 :</StyledLabel> {item.menuCount} 개</p>
      </StlyedTextWrapper>
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


const StyledEnabledYn  = styled.div`
  display: flex;
  width: fit-content;
  height: 22px;
  align-items: center;
  background-color: ${props => (props.$enabledYn ? "#5dc3fb" : "#ccc")};
  color: black;
  border-radius: 20px;
  padding: 0 10px;
  margin-bottom: 10px;
`;
 
const StlyedTextWrapper= styled.div`
  margin-left: 20px;
`;
const StyledLabel = styled.label`
  font-weight: 500;
`;