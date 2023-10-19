import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SignInput from './SignInput';
import { loginIdValidation, passwordValidation } from '../../utils/validation';
import SignButton from './SignButton';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { loginApi } from '../../api/login';

export default function LoginForm() {
  const [loginValue, setLoginValue] = useState({
    loginId: "",
    password: "",
  }); 
  const [inputValid, setInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { data, isLoading, error, setData, setShouldFetch, status, setStatus } = useFetchData(loginApi,{data: {
    loginId: loginValue.loginId,
    loginPw: loginValue.password,
  },shouldFetch:false});

  const handleInputChange = (e) => {
    setLoginValue({...loginValue, [e.target.name]: e.target.value})
  }

  const handleLoginAction = async (e) => {
    e.preventDefault();
    setData({
      loginId: loginValue.loginId,
      loginPw: loginValue.password,
    });
    setShouldFetch(true);  // API 호출을 활성화
  };

  useEffect(()=>{
    if(status===202){
        localStorage.setItem("isLogin", true);
        navigate('/home',{state:{ menuId: "0" }});
    } else if (error && error.data && error.data.message) {  // error 객체에서 message 추출
      console.log("에러발생" , error);
      setErrorMessage(error.data.message);
    }
    setStatus(null);
  },[status, error]);

  return (
    <StyledForm onSubmit={handleLoginAction}>
       {isLoading && <LoadingOverlay><Loading /></LoadingOverlay>}
      <LoginText>로그인</LoginText>
      <SignInput
        name={"loginId"}
        placeholder={"아이디를 입력하세요."}
        type={"text"}
        onChange={handleInputChange}
        validate={loginIdValidation}
        value={loginValue.loginId}
        // errorMessage={"아이디 형식을 지켜주세요."}
        setValid={setInputValid}
      />
      <SignInput
        name={"password"}
        placeholder={"비밀번호를 입력하세요."}
        type={"password"}
        onChange={handleInputChange}
        validate={passwordValidation}
        value={loginValue.password}
        // errorMessage={"비밀번호 형식을 지켜주세요."}
        setValid={setInputValid}
      />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      <SignButton
        onClickHandler={handleLoginAction} 
      />
    </StyledForm>
  )
}
const StyledForm = styled.form`
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

const ErrorText = styled.div`
  margin-top: 10px;
  color: #eb5252;
  font-size: 14px;
`;
const Loading = () => (
  <div style={{ display: 'flex' }}>
    <Dot />
    <Dot />
    <Dot />
  </div>
);
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 5px;
  animation: bounce 1.4s infinite;

  &:nth-child(2) {
    animation-delay: -0.32s;
  }

  &:nth-child(3) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1.0);
    }
  }
`;