import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';

export default function LoginPage() {

  return (
    <Container>
      <LeftSection>
        <ImageWrapper>
          <img src= {`${process.env.PUBLIC_URL}/assets/images/login_banner.jpg`} alt="아마란스텐 이미지" />
          <ImageText>아마란스텐입니다.</ImageText>
        </ImageWrapper>
      </LeftSection>
      <RightSection>
        <LoginForm/>
      </RightSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: white;
  height: 100vh;
  overflow: hidden; // 스크롤바 숨기기
`;

const LeftSection = styled.div`
  flex: 1; // 남은 공간을 채우기 위해 flex 값을 1로 설정
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  box-sizing: border-box;
  width: 495px; // 너비를 400px로 고정
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff; // 글씨 색상은 필요에 따라 변경 가능
`;

