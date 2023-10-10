import React from 'react'
import styled from 'styled-components';

export default function LinkButton(props) {
  const fontTag = props.tagName || 'span';  
  return(
    <Container
      $cursor={props.cursor}
      $selected={props.selected}
      $showBorderBottom={props.showBorderBottom}
      $showBorderLeft={props.showBorderLeft}
      $showBorderRight={props.showBorderRight}
      $padding={props.padding}
    >
      <StyledTag as={fontTag}>
        {props.name}
      </StyledTag>
    </Container>
  );
}

const Container = styled.button`
  width: fit-content;
  color: ${props=> props.$selected? "#308EFC" : "black"};
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 4px;
  word-spacing: 4px;
  background: none;
  padding: ${({$padding}) => ($padding ? $padding : 'none')};
  /* cursor: ${props => props.cursor || 'pointer'}; */
  line-height: 1;
  position: relative;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 0.2rem solid ${props=> props.$showBorderBottom? '#5398ff': 'transparent'};
  letter-spacing: normal;  // 글자 간격을 기본값으로 설정
  word-spacing: normal;    // 단어 간격을 기본값으로 설정

  &::before {
    content: ${({ $showBorderLeft }) => ($showBorderLeft ? "''" : 'none')};
    left: 0;  
    position: absolute;
    top: 0;  
    height: 80%;
    width: 1px;
    background-color: #ccc;  
  }

  &::after {
    content: ${({ $showBorderRight }) => ($showBorderRight ? "''" : 'none')};
    right: 0; 
    position: absolute;
    top: 0;  
    height: 80%;
    width: 1px;
    background-color: #ccc; //  
  }
`;

const StyledTag = styled.div`
  display: inline-block;
`;