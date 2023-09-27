import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

export default function Main() {
  return (
    <MainArea id="Main">
        <img src="https://dz-test-image.s3.ap-northeast-2.amazonaws.com/bgi/mainBgi.jpg" alt="bgiMain" />
        <SearchArea>
            <div>
              <p>기업의 지속가능한 성장을 위해 디지털 혁신을 완성한다.</p>
            </div>
            <div>
              <div>
                <input type='text' id='searchBar'/>
                <AiOutlineSearch/>
              </div>
            </div>
        </SearchArea>
    </MainArea>
  );
}

const MainArea = styled.div`
position: relative;
background-color: #bbbbbb;
background-repeat: no-repeat;
background-size: cover;
width: 100%;
height: 100%;

> img {
  width:100%;
  position: absolute;
  opacity: 0.7;
}
`;
const SearchArea = styled.div`
position: absolute;
display: block;
justify-content: center;
z-index: 1;
top: 30%; 
bottom: 40%;
left: 20%;
right: 20%;

> div {
  display: flex;
  justify-content: center;
  
  > p {
    color: white;
    font-size: x-large;
    font-weight: bold;
    margin-bottom: 70px;

    @media (max-width: 1290px){
      font-size: large;
    }

    @media (max-width: 1000px){
      font-size: medium;
    }

    @media (max-width: 800px){
      font-size: small;
    }
  }
  
  > div {
    display: flex;
    justify-content: center;
  
    > input {
      border-radius: 100px;
      box-shadow: 0px 0px 30px 30px rgba(8, 8, 8, 0.2) ;
      width: 600px;
      height: 70px;
      background-color: white;
      font-size: x-large;
    }
    > svg {
      width: 50px;
      height: 50px;
      position: relative;
      color: black;
      left: -70px;
      top: 17px;
      z-index: 2;
    }
  }
}
`;
