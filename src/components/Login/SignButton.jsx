import React from 'react'
import styled, {css} from 'styled-components'

export default function SignButton({ onClickHandler, disabled}) {
  return (
    <Container onClick={onClickHandler} disabled={disabled}>
      로그인
    </Container>
  )
}

const Container = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  padding: 14px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: rgb(0, 170, 255);
  color: #ffffff;
  margin-top:30px;
`;