import React from 'react'
import styled from 'styled-components'

export default function UserListItem({item}) {
  return (
    //테이블 태그로 부서 이름 직급/직책
    <>
      <StyledTd>{item.deptName}</StyledTd>
      <StyledTd>{item.empName}</StyledTd>
      <StyledTd>{item.empPosition}</StyledTd>
    </>

  );
}

const StyledTd = styled.td`
  border: 1.5px solid #ccc;
  padding: 8px;
  text-align: left;
`;