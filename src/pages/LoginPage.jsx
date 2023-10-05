import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';

import { logOut } from '../api/login';
export default function LoginPage() {
  
  const empId = localStorage.getItem("empId");

  return (
    <Container>
      <ImageArea>
        <img src= {`${process.env.PUBLIC_URL}/img/login_banner.jpg`} alt="아마란스텐 이미지" />
        <ImageText>아마란스2023입니다.</ImageText>
      </ImageArea>
      <LoginArea>
      {/* { empId > 0 ? <Hello /> : <LoginForm/>} */}
      <LoginForm/>
      </LoginArea>
    </Container>
  );
}

function Hello(){

  const handleLogOut = () => {
    logOut(); 
    window.location.href='/login';
    localStorage.setItem("empId", 0);
  }


  return (
    <HelloContent>
      <HelloTitle>반갑습니다.</HelloTitle>
      <div>
        <HelloSpan onClick={() => {window.location.href='/'}}>메인페이지</HelloSpan>
        <HelloSpan onClick={handleLogOut}>로그아웃</HelloSpan>
      </div>
    </HelloContent>
  )
}

const HelloContent = styled.div`
text-align: left;
width: 400px;
padding: 20px;

> div {
  display: flex;
  justify-content: space-between;
  
}
`;
const HelloTitle = styled.div`
font-size : xx-large;
font-weight: bold;
margin: 20px;
`;
const HelloSpan = styled.div`
font-size : large;
font-weight: bold;
color: rgb(22, 114, 225);
margin: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  height: 100vh;
  overflow: hidden; // 스크롤바 숨기기
`;

const ImageArea = styled.div`
  flex: 1; // 남은 공간을 채우기 위해 flex 값을 1로 설정
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoginArea = styled.div`
  box-sizing: border-box;
  width: 495px; // 너비를 400px로 고정
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff; // 글씨 색상은 필요에 따라 변경 가능
`;

