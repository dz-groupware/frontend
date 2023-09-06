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
  position: relative;
  color: ${props=> props.selected? "#0B85EE" : "black"};
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 4px;
  word-spacing: 4px;
  border: none;
  background: none;
  padding: 0;
  /* cursor: ${props => props.cursor || 'pointer'}; */
  line-height: 1;
  text-decoration: underline;
  text-decoration-color: ${props => props.selected? "#0B85EE" : "black"};
  text-decoration-thickness: 2px;
`;