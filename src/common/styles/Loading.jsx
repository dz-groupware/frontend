import styled, { keyframes } from 'styled-components';

export default function Loading(){
  return(
    <LoadingContent>
      <LoadingSpinner></LoadingSpinner>
    </LoadingContent>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const LoadingContent = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(182, 222, 255, 0.5);
`;
const LoadingSpinner = styled.div`
border: 4px solid rgba(255, 255, 255, 0.3);
border-top: 4px solid #3498db;
border-radius: 50%;
width: 40px;
height: 40px;
animation: ${spin} 1s linear infinite;
`;
