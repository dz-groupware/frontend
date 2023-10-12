import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components';

const MappingAuthGroupItem = forwardRef(({ item, hasAuth, onClick, isActive, selectedAuthIds, handleCheckboxChange, isEditMode }, ref) => {
  useEffect(() => {
    if (hasAuth) {
      handleCheckboxChange(item.authId);
    }
  }, [item]);
  return (
    <Container
      ref={ref}
      $isActive={isActive}
      $isEditMode={isEditMode}
      onClick={onClick}
    >
        {isEditMode && (
          <StyledInput
            type="checkbox"
            checked={!!selectedAuthIds[item.authId]}
            onChange={() => handleCheckboxChange(item.authId)}
          />
        )}

      
      <StlyedTextWrapper>
        <Text $hasAuth={hasAuth}><StyledLabel>회사명 :</StyledLabel> {item.companyName}</Text>
        <Text $hasAuth={hasAuth}><StyledLabel>권한명 :</StyledLabel> {item.authName}</Text>
        <Text $hasAuth={hasAuth}><StyledLabel>메뉴 :</StyledLabel> {item.menuCount} 개 </Text>
      </StlyedTextWrapper>

      {/* <StyledEnabledYn $enabledYn={item.enabledYn}>
          {item.enabledYn? "사용가능" : "사용불가"}
        </StyledEnabledYn>  */}
    </Container>
  )
});

export default MappingAuthGroupItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  border-width: ${props => props.$isActive ? '2px' : '1px'};
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  height: 100px;
  align-items: center;

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
const StlyedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;
const Text = styled.p`
  color: ${props => props.$hasAuth ? 'red' : 'inherit'};
  margin-bottom: 2px;
`;
const StyledInput = styled.input`
  appearance: none;
  width: 20px;  // 원하는 크기로 조정
  height: 20px;
  background-color: #f3f3f3;
  border: 1px solid #c6c6c6;
  border-radius: 3px;
  cursor: pointer;

  &:checked {
    background-color: #ffffff; // 체크된 상태의 배경색 설정
  }

  &:checked::after {
    content: ''; // 체크 표시 추가
    display: block;
    width: 17px; // 체크 표시의 크기 조정
    height: 15px;
    background-image: url(${process.env.PUBLIC_URL + '/img/mark.png'});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`
const StyledLabel = styled.label`
`;



