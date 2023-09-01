import React, { useState } from 'react'
import styled from 'styled-components';
import SignInput from './SignInput';
import { emailValidation, passwordValidation } from '../../utils/validation';
import SignButton from './SignButton';
import { axiosInstance } from '../../utils/axiosInstance';

export default function LoginForm() {
  const [loginValue, setLoginValue] = useState({
    loginId: "",
    password: "",
  }); 
  const [isValid, setIsValid] = useState(false); //버튼용
  const [inputValid, setInputValid] = useState(false);
  // const loginAction = useLoginMutation(loginValue);

  const handleInputChange = (e) => {
    setLoginValue({...loginValue, [e.target.name]: e.target.value})
  }

  const handleLoginAction = async (e) => {
    e.preventDefault();

    // 로그인 요청
    try {
      const response = await axiosInstance.post('/login', {
        loginId: loginValue.loginId,
        loginPw: loginValue.password,
      });

      // 응답 처리 (예: 로그인 성공 시 액션 수행)
      console.log(response.data);
    } catch (error) {
      // 에러 처리 (예: 로그인 실패 시 경고 메시지 표시)
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <LoginText>로그인</LoginText>
      <SignInput
        name={"loginId"}
        placeholder={"아이디를 입력하세요."}
        type={"text"}
        onChange={handleInputChange}
        validate={emailValidation}
        value={loginValue.loginId}
        errorMessage={"아이디 형식을 지켜주세요."}
        setValid={setInputValid}
      />
      <SignInput
        name={"password"}
        placeholder={"비밀번호를 입력하세요."}
        type={"password"}
        onChange={handleInputChange}
        validate={passwordValidation}
        value={loginValue.password}
        errorMessage={"비밀번호 형식을 지켜주세요."}
        setValid={setInputValid}
      />
      <SignButton
        onClickHandler={handleLoginAction} 
      />
    </Container>
  )
}
const Container = styled.article`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: end;
  justify-content: center;
`;
const LoginText = styled.div`
  align-self: flex-start;  
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
  color: black; // 배경이 검은색이므로 텍스트 색상 변경
`;