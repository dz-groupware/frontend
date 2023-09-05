import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

export function Main() {
  return (
    <div className="Main" style={{backgroundColor: 'black', height: '100%', zIndex: '-1'}}>
        <img src='/img/mainBgi.jpg' alt='mainBgi' style={{width: '100%', height:'auto', opacity: '0.5', position:'fixed', zIndex: '0'}}/>
        <SearchArea>
          <input type='text' id='searchBar'/>
          <AiOutlineSearch style={{width:'50px', height:'50px', position: 'relative', color: 'black', left: '-70px', top:'17px'}}/>
          
        </SearchArea>
    </div>
  );
}

const SearchArea = styled.div`
display: flex;
justify-content: center;
padding-top: 350px;
position: relative;
z-index: 1;

> input {
  border-radius: 100px;
  width: 700px;
  height: 10px;
  background-color: white;
  
  padding: 40px;
  font-size: x-large;
}

`;
