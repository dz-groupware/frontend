import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';

import { logOut } from '../api/login';
export default function LoginPage() {
  
  const empId = localStorage.getItem("empId");

  return (
    <Container>
      <ImageArea>
        {/* <img src= {`${process.env.PUBLIC_URL}/img/login_banner.jpg`} alt="아마란스텐 이미지" /> */}
        <LoginArea>
      {/* { empId > 0 ? <Hello /> : <LoginForm/>} */}
        <LoginForm/>
      </LoginArea>
      </ImageArea>

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
  box-shadow: 
    0 0 10px rgba(0, 0, 0, 0.4);  // 우측 하단의 그림자

    /* -5px -5px 10px #ffffff,  // 좌측 상단의 하이라이트
    5px 5px 10px rgba(0, 0, 0, 0.4);  // 우측 하단의 그림자 */
  /* box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2); */
`;

const ImageArea = styled.div`
  flex: 1; // 남은 공간을 채우기 위해 flex 값을 1로 설정
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${process.env.PUBLIC_URL + '/img/login_banner.jpg'});
  background-size: cover;  // 이미지가 컨테이너 크기에 맞게 조절됩니다.
  background-repeat: no-repeat;  // 이미지가 반복되지 않습니다.
  background-position: center;  // 이미지가 중앙에 위치합니다.
  width: 100%;
  height: 100%;
  img {
    width: 105%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoginArea = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 495px; // 너비를 400px로 고정
  height: 100%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 100px;
  box-shadow: 
    0 0 25px rgba(0, 0, 0, 0.6);  // 우측 하단의 그림자

    /* -5px -5px 10px #ffffff,  // 좌측 상단의 하이라이트
    5px 5px 10px rgba(0, 0, 0, 0.4);  // 우측 하단의 그림자 */
  /* box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2); */
`;

const ImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff; // 글씨 색상은 필요에 따라 변경 가능
`;

