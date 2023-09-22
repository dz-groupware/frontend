import React from 'react'
import styled from 'styled-components';

export default function EmployeeBox({ depth,id, name , position, masterYn, activeEmpId, onClick}) {
  return (
    <NameBar $depth={depth} $isActive={id === activeEmpId} onClick={onClick}>
      {masterYn ? <img src="/img/comp/master_50.png"width={20} alt="example" />:<img src="/img/comp/emp_64.png"width={20} alt="example" />}
      <p>{name} ({position})</p>
    </NameBar>
  )
}

const NameBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${({ $depth }) => `${$depth * 15}px`};
  background-color: ${({ $isActive }) => ($isActive ? 'yellow' : 'transparent')};
  align-items: center;
  margin-bottom: 4px;
`;