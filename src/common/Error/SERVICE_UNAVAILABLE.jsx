import React from "react";
import styled from "styled-components";

import { AiOutlineWarning } from 'react-icons/ai';


export default function SERVICE_UNAVAILABLE() {
  const handleReturn = () => {
    window.location.href='/';
    // 메인 페이지로 돌아가는 로직을 추가합니다.
  };

  const handleRetry = () => {
    window.history.back();
    // 다시 시도하기 로직을 추가합니다.
  };

  return (
    <ForbiddenPageContainer>
      <AiOutlineWarning />
      <WarningText>일시적인 오류 입니다. 잠시 뒤 다시 시작해 주세요</WarningText>
      <ButtonContainer>
        <ReturnButton onClick={handleReturn}>메인 페이지로 돌아가기</ReturnButton>
        <RetryButton onClick={handleRetry}>다시 시도하기</RetryButton>
      </ButtonContainer>
    </ForbiddenPageContainer>
  );
};


const ForbiddenPageContainer = styled.div`
width: calc(100% - 200px);
  text-align: center;
  padding: 2rem;
  > svg {
    margin-top: 50px;
    color: rgb(247,206,90);
    width: 50px;
    height: 50px;
  }
`;
const WarningText = styled.p`
  font-size: 24px;
  margin: 20px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* 버튼 사이 간격 조정 */
  margin-top: 20px;
`;
const ReturnButton = styled.button`
  background-color: #1da1f2; /* 트위터 블루 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px; /* 원형 버튼 */
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease; /* 부드러운 배경색 전환 */
  
  &:hover {
    background-color: #0f81d9; /* 호버 상태 배경색 */
  }
`;
const RetryButton = styled.button`
  background-color: transparent;
  border: 2px solid #1da1f2; /* 트위터 블루 테두리 */
  color: #1da1f2; /* 트위터 블루 텍스트 */
  padding: 10px 20px;
  border-radius: 999px; /* 원형 버튼 */
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease; /* 부드러운 전환 */
  
  &:hover {
    background-color: #1da1f2; /* 호버 상태 배경색 */
    color: white; /* 호버 상태 텍스트 색상 */
  }
`;