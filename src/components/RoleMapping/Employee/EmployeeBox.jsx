import React from 'react'
import styled from 'styled-components';

export default function EmployeeBox({ depth,id, name , position, masterYn, activeEmpId, onClick}) {
  return (
    <NameBar $depth={depth}  onClick={onClick}>
      {masterYn ? <img src="/img/comp/master_50.png"width={20} alt="example" />:<img src="/img/comp/emp_64.png"width={20} alt="example" />}
      <StyledEmployeeInfo $isActive={id === activeEmpId}>
        <p>{name} ({position})</p>
      </StyledEmployeeInfo>
    </NameBar>
  )
}

const NameBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${({ $depth }) => `${$depth * 15}px`};
  align-items: center;
  margin-bottom: 4px;
  `;

const StyledEmployeeInfo = styled.div`
  border: 1px solid transparent;
  display: flex;
  align-items: center;  // 가로 방향으로 중앙 정렬
  padding-top: 5px; // 상하로 5px 패딩 추가
  border-radius: 5px;
  &:hover {
    border-width: 2px;
    background-color: #d0cece84;  
    border-color: #d0cece84;          
  }

  &:active {
    border-width: 2px;
    background-color: #5dc3fb;  
    border-color: #5dc3fb;  
  }
  background-color: ${props => props.$isActive ? '#e6f4ff' : 'transparent'};
`;