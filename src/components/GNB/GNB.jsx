
import { useState } from 'react';

import styled from 'styled-components';

import { AiOutlineMenu, AiOutlineStar } from "react-icons/ai";
import { BiSolidGrid } from "react-icons/bi";

import { MenuList, FavList, IconList } from './GnbList';


export default function GNB({ gnb, favor }){
  const [menuOn, setMenuOn] = useState([false, false]);

  
  return (
    <>
      <GNBIconArea id='gnbIcon'>   
        <div style={{borderBottom: '1px solid white', width: '50px', height: '50px', marginTop: '10px', paddingTop: '7px'}}>
        <BiSolidGrid size='35px' onClick={() => {
          if (menuOn[0] || menuOn[1]) {
            setMenuOn([false, false]);
          } else {
            setMenuOn([true, false]);
          }
        }}/>
        </div>
        <IconList gnb={gnb} />
      </GNBIconArea>
      <GNBMenuArea id='gnbMenu' className={`menu ${menuOn[0]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <MenuList gnb={gnb} />
      </GNBMenuArea>
      <GNBFavArea id='gnbFav' className={`main ${menuOn[1]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <FavList favor={favor} />
      </GNBFavArea>
    </>
  )
}

export const GNBIconArea = styled.div`
display:block;
width: 46px;
height: 100%;
background-color:#1d2437;
color:rgb(181,194,200);
position : absolute;
overflow : scroll;
z-index: 1;

&::-webkit-scrollbar{
  display: none;
}
> svg {
  width:35px;
  height:35px;
  margin: 15px 7px 7px 5px;  
  cursor: pointer;
}
> div {
  display: flex;
  justify-content: center;
  > a {
  text-decoration: none;
  width: 70%;
  height: 50%;
  > img {
    position: relative;
    width:30px;
    height:30px;
  }
}
}

`;
export const GNBMenuArea = styled.div`
padding-top: 10px;
position: absolute;
margin-left: 44px;
width: 200px;
height: 100%;
background-color: #1d2437;
color:rgb(181,194,200);
cursor: pointer;
overflow: hidden;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.7),
            1px 1px 3px 0px rgba(0,0,0,.7);
            outline: none;
&.false {
  left: -200px;
  top: 0;
  opacity: 1;
  transition: all 1s ease;
}
&.true {
  left: 0;
  opacity:1;
  transition: all 1s ease;
}
`;
export const GNBFavArea = styled.div`
padding-top: 10px;
position: absolute;
margin-left: 44px;
width: 200px;
height: 100%;
background-color: #1d2437;
color:rgb(181,194,200);
cursor: pointer;
overflow: hidden;

&.false {
  left: -200px;
  top: 0;
  opacity: 1;
  transition: all 1s ease;
}
&.true {
  left: 0;
  opacity:1;
  transition: all 1s ease;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.7),
            1px 1px 3px 0px rgba(0,0,0,.7);
            outline: none;
}
`;
export const TopIconArea = styled.div`
display: flex;
border-bottom: 1px solid white;
> * {
  width: 30px;
  height: 30px;
  margin-left: 40px;
  margin-right: 10px;
  margin-top: 9px;
  margin-bottom: 10px;
  cursor: pointer;
} 
`;