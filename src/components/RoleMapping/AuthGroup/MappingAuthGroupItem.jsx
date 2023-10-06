import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components';

const MappingAuthGroupItem  = forwardRef(({ item, hasAuth, onClick, isActive, selectedAuthIds, handleCheckboxChange, isEditMode }, ref) => {
  useEffect(()=>{
    if(hasAuth) {
      handleCheckboxChange(item.authId);
    }
  },[item]);
  return (
    <Container 
      ref={ref} 
      $isActive={isActive} 
      $isEditMode={isEditMode}
      onClick={onClick}
    >
      {isEditMode && (
        <input
          type="checkbox"
          checked={!!selectedAuthIds[item.authId]}
          onChange={() => handleCheckboxChange(item.authId)}
        />
      )}
      {/* <Text $hasAuth={hasAuth}>회사id- {item.companyId}</Text> */}
      <StlyedTextWrapper>
        <Text $hasAuth={hasAuth}><StyledLabel>회사명 :</StyledLabel> ㅂ{item.companyName}</Text>
        <Text $hasAuth={hasAuth}><StyledLabel>권한명 :</StyledLabel> {item.authName}</Text>
        <Text $hasAuth={hasAuth}><StyledLabel>메뉴 :</StyledLabel> {item.menuCount} 개</Text>
      </StlyedTextWrapper>

        {/* <StyledEnabledYn $enabledYn={item.enabledYn}>
          {item.enabledYn? "사용가능" : "사용불가"}
        </StyledEnabledYn>  */}
    </Container>
  )
});

export default MappingAuthGroupItem;

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

const Text = styled.p`
  color: ${props => props.$hasAuth ? 'red' : 'inherit'};
`;

const StyledEnabledYn  = styled.div`
  display: flex;
  align-items: center;
  /* background-color: ${props => (props.$enabledYn ? "#947AFF" : "#4DE9D6")}; */
  color: black;
  border-radius: 20px;
  margin-top: 5px;
  height: 20px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;
const StlyedTextWrapper= styled.div`
  margin-left: 20px;
`;
const StyledLabel = styled.label`
`;