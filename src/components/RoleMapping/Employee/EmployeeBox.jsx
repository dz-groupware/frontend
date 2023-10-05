import React, { useEffect } from 'react'
import styled from 'styled-components';

export default function EmployeeBox({ refresh,depth,id, name , position, masterYn, activeEmp, onClick, isEditMode}) {
  useEffect(()=>{
    console.log('employee', refresh);
  },[refresh]);
  return (
    <NameBar $depth={depth}  onClick={onClick} >
      <StyledEmployeeInfo $isActive={id === activeEmp.id} $isEditMode={isEditMode}>
      <ImageWrapper>
          {masterYn ? <img src="/img/comp/master.png" alt="master" /> : <img src="/img/comp/emp_64.png" alt="employee" />}
        </ImageWrapper>
        <p>{name} ({position})</p>
      </StyledEmployeeInfo>
    </NameBar>
  )
}

const NameBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${({ $depth }) => `${$depth * 15}px`};
  align-items: center;
  margin-bottom: 4px;
  `;

const StyledEmployeeInfo = styled.div`
  border: 1px solid transparent;
  display: flex;
  align-items: center;  // 가로 방향으로 중앙 정렬
  border-radius: 5px;

  img {
    align-self: flex-start; // flex 시작점에 이미지를 정렬
  }
  

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
`;

const ImageWrapper = styled.div`
  width: 20px;  // 이미지의 최대 너비 설정
  height: 20px; // 이미지의 최대 높이 설정
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  img[src="/img/comp/master.png"] {
    width: 15px;  // Master 이미지의 너비를 조절
    height: 15px; // Master 이미지의 높이를 조절
  }
`;