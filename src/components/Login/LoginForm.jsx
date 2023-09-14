import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SignInput from './SignInput';
import { emailValidation, passwordValidation } from '../../utils/validation';
import SignButton from './SignButton';
import { axiosInstance } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { loginApi } from '../../api/login';
import { useDispatch } from 'react-redux';

// 추가 (김현주)
import { newEmpId, newCompId } from '../../utils/Slice';

export default function LoginForm() {
  const [loginValue, setLoginValue] = useState({
    loginId: "",
    password: "",
  }); 
  const [inputValid, setInputValid] = useState(false);
  // const loginAction = useLoginMutation(loginValue);
  const navigate = useNavigate();
  const { data, isLoading, error, setData, setShouldFetch, statusCode } = useFetchData(loginApi,{data: {
    loginId: loginValue.loginId,
    loginPw: loginValue.password,
  },shouldFetch:false});

  const handleInputChange = (e) => {
    setLoginValue({...loginValue, [e.target.name]: e.target.value})
    setData({
      loginId: loginValue.loginId,
      loginPw: loginValue.password,
    });
  }

  const handleLoginAction = async (e) => {
    setShouldFetch(true);  // API 호출을 활성화
  };

  // 추가(김현주)
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("code,",statusCode);
    if(statusCode===200){
      // 추가(김현주) : 로그인 시 empId, compId를 리덕스 슬라이스에 저장해야 함.
      dispatch(newEmpId(data.data['empId']));
      dispatch(newCompId(data.data['compId']));
      localStorage.setItem('empId', data.data['empId']);
      localStorage.setItem('compId', data.data['compId']);
      console.log('redirect');
      navigate('/',{state:{ menuId: "0" }});
    }
  }, [statusCode]);

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