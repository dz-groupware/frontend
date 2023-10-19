import React from 'react';

import styled from 'styled-components';

export default function Retry ({ onRetryClick }) {

  return (
    <RetryContainer>
      <ErrorMessage>일시적인 오류입니다.</ErrorMessage>
      <RetryButton onClick={() => {window.history.go(0)}}>다시 시도</RetryButton>
    </RetryContainer>
  );
};


const RetryContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  margin-bottom: 20px;
`;

const RetryButton = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;