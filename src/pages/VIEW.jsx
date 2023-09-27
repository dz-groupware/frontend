import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

export function Loading(){
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

export function EmptyPage(props){
  return(
    <div style={{display:'block'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>빈페이지 입니다.</div>

      <div style={{fontSize: 'large', margin: '30px'}}>{props.menuName}</div>
    </div>
  )
}

export function NotFound(){
  useEffect(() => {
    setTimeout(() => window.location.href='/', 3000);
  }, []);

  return(
    <div style={{display:'block', backgroundColor:'white', color:'black'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>없는 페이지 입니다.</div>
      <div style={{fontSize: 'large', margin: '30px'}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}

export function Error(){
  useEffect(() => {
    setTimeout(() => window.location.href='/', 3000);
  }, []);

  return(
    <div style={{display:'block', backgroundColor:'white', color:'black'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>잘못된 접근입니다.</div>
      <div style={{fontSize: 'large', margin: '30px'}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}

export function Error404(){
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
  }, []);

  return(
    <div style={{display:'block', backgroundColor:'white', color:'black'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>없는 페이지 입니다.</div>
      <div style={{fontSize: 'large', margin: '30px'}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}
