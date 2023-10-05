import React, { useState } from 'react';
import styled from 'styled-components';

export default function SignInput(props) {
  const [errShow, setErrShow] = useState(false);

  const checkValidate = (value) => {
      // value가 false일때 즉, 비어있으면 check를 true로 설정하고 반환합니다.
    if (!value) {
      setErrShow(false);
      return;
    }
   
    const isValidate = props.validate(value);
    props.setValid(isValidate);
    setErrShow(true);
  }

  return (
    <Container>
      <StyledInput
        type={props.type || "text"}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => props.onChange(e)}
        onKeyUp={() => checkValidate(props.value)}
        value={props.value}
      />
      <WarnMessage show={`${errShow}`}>{props.errorMessage}</WarnMessage>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  height: 3.5rem; /* 높이를 명시적으로 설정 */
  border-radius: 40px;
  padding: 10px 20px;
  width: 100%;
  font-size: 1.2rem;
  outline: none;
  line-height: 1.2rem;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: #72aeee;
  }

  &::placeholder {
    color: #999;
  }
`;
  const WarnMessage = styled.div`
    height: 14px;
    color: yellow;
    font-size: 14px;

    margin-left: 10px;
    opacity: ${props => (props.show==='true' ? 1 : 0)}; // errShow true일 때만 텍스트를 표시
    transition: opacity 0.2s linear; // 투명도 변화에 애니메이션 효과 추가
    pointer-events: none; // 투명한 상태에서도 마우스 드래그를 막음
  `;



