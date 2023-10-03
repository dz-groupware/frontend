import React, { useEffect } from 'react'
import styled from 'styled-components';

export default function EmployeeBox({ refresh,depth,id, name , position, masterYn, activeEmp, onClick, isEditMode}) {
  useEffect(()=>{
    console.log('employee', refresh);
  },[refresh]);
  return (
    <NameBar $depth={depth}  onClick={onClick} >
      <StyledEmployeeInfo $isActive={id === activeEmp.id} $isEditMode={isEditMode}>
        {masterYn}
        {masterYn ? <img src="/img/comp/master.png"width={15} alt="example" />:<img src="/img/comp/emp_64.png"width={20} alt="example" />}
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
  padding-top: 5px; // 상하로 5px 패딩 추가
  border-radius: 5px;

  img {
    align-self: flex-start; // flex 시작점에 이미지를 정렬
    margin-bottom: 3px; // 하단 마진을 음수로 주어 위치를 올림
    margin-right: 2px;
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