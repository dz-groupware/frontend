import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
// display:'none',
export function Main() {
  return (
    <MainArea id="Main">
        <SearchArea>
          <input type='text' id='searchBar'/>
          <AiOutlineSearch style={{width:'50px', height:'50px', position: 'relative', color: 'black', left: '-70px', top:'17px', zIndex:'2'}}/>
        </SearchArea>
    </MainArea>
  );
}

export function EmptyPage(props){
  return(
    <div style={{display:'block'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>빈페이지 입니다.</div>

      <div style={{fontSize: 'large', margin: '30px'}}>{props.menuName}</div>
    </div>
  )
}

export function Error(){
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
  }, []);

  // 우선은 main 페이지로 이동하도록 했는데, 
  // 로그인 하지 않은 상태에서 main 페이지로 이동하면 안되므로, 
  // main 페이지 이동시 토큰이 없다면 login 페이지로 이동하는걸 추가하면 될 듯.
  return(
    <div style={{display:'block', backgroundColor:'white', color:'black'}}>
      <div style={{fontSize: 'xx-large', margin: '20px'}}>잘못된 접근입니다.</div>
      <div style={{fontSize: 'large', margin: '30px'}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}

const MainArea = styled.div`
position: relative;
background-image: url('/img/mainBgi.jpg');
background-repeat: no-repeat;
background-size: cover;
width: 100%;
height: 100%;
`;

const SearchArea = styled.div`
position: absolute;
display: flex;
justify-content: center;
top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%); 
z-index: 1;

> input {
  border-radius: 100px;
  width: 500px;
  height: 10px;
  background-color: white;
  
  padding: 40px;
  font-size: x-large;
}

`;
