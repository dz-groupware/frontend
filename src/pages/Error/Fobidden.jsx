import React from "react";
import styled from "styled-components";

import { AiOutlineWarning } from "react-icons/ai";

export default function Forbidden() {
  const handleReturn = () => {
    window.location.href="/home";
  };

  const handleRetry = () => {
    window.history.back();
  };

  return (
    <Container>
      <AiOutlineWarning />
      <WarningText>권한이 없습니다.</WarningText>
      <ButtonContainer>
        <ReturnButton onClick={handleReturn}>메인 페이지로 돌아가기</ReturnButton>
        <RetryButton onClick={handleRetry}>다시 시도하기</RetryButton>
      </ButtonContainer>
    </Container>
  );
};


const Container = styled.div`
  width: calc(100% - 200px);
  text-align: center;
  padding: 2rem;
  
  > svg {
    width: 50px;
    height: 50px;
    margin-top: 50px;
    color: rgb(247,206,90);
  }
`;
const WarningText = styled.p`
  font-size: 24px;
  margin: 20px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
  margin-top: 20px;
`;
const ReturnButton = styled.button`
  background-color: #1da1f2; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease; 
  
  &:hover {
    background-color: #0f81d9; 
  }
`;
const RetryButton = styled.button`
  background-color: transparent;
  border: 2px solid #1da1f2; 
  color: #1da1f2; 
  padding: 10px 20px;
  border-radius: 999px; 
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease; 
  
  &:hover {
    background-color: #1da1f2; 
    color: white;
  }
`;