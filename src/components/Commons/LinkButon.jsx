import React from 'react'
import styled from 'styled-components';

export default function LinkButon(props) {
  console.log(props.selected)
  return (
    <Container
      cursor={props.cursor}
      onClick={props.onClick}
      selected={props.selected}
    >
      {props.name}
    </Container>
  )
}

const Container = styled.button`
  width: fit-content;
  color: ${props=> props.selected? "#5398ff" : "black"};
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 4px;
  word-spacing: 4px;
  background: none;
  padding: 0.1rem 1.2rem 0.5rem;
  /* cursor: ${props => props.cursor || 'pointer'}; */
  line-height: 1;
  position: relative;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.2rem solid #5398ff;
  letter-spacing: normal;  // 글자 간격을 기본값으로 설정
  word-spacing: normal;    // 단어 간격을 기본값으로 설정

  &::before {
    left: 0;  
    content: '';
    position: absolute;
    top: 0;  
    height: 80%;
    width: 1px;
    background-color: #ccc;  
  }

  &::after {
    right: 0; 
    content: '';
    position: absolute;
    top: 0;  
    height: 80%;
    width: 1px;
    background-color: #ccc; //  
  }
`;