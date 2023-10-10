
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
        <BiSolidGrid onClick={() => {
          if (menuOn[0] || menuOn[1]) {
            setMenuOn([false, false]);
          } else {
            setMenuOn([true, false]);
          }
        }}/>
        <hr />
        <IconList gnb={gnb}/>
      </GNBIconArea>
      <GNBMenuArea id='gnbMenu' className={`menu main ${menuOn[0]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <MenuList gnb={gnb}/>
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
width: 45px;
height: 100%;
background-color:rgb(66,71,84);
color:rgb(181,194,200);
position : absolute;
overflow : scroll;
&::-webkit-scrollbar{
  display: none;
}
> svg {
  width:35px;
  height:35px;
  margin: 15px 7px 7px 7px;  
  cursor: pointer;
}
> a {
  text-decoration: none;
  > img {
    position: relative;
    width:30px;
    height:30px;
    margin: 20px 7px 5px 7px;
  }
}
`;
export const GNBMenuArea = styled.div`
padding-top: 10px;
position: absolute;
margin-left: 45px;
width: 200px;
height: 100%;
background-color: rgb(66,71,84);
color:rgb(181,194,200);
cursor: pointer;
overflow: hidden;
&.false {
  left: -300px;
  top: 0;
  opacity: 0;
  transition: left 2s;
}
&.true {
  left:0px;
  opacity:1;
}
> a {
  color:rgb(181,194,200);
  list-style: none;
  margin-top: 20px;
  text-decoration: none;
  font-size: x-large;
}
`;
export const GNBFavArea = styled.div`
padding-top: 10px;
position: absolute;
margin-left: 45px;
width: 200px;
height: 100%;
background-color: rgb(66,71,84);
color:rgb(181,194,200);
cursor: pointer;
overflow: hidden;
  &.false {
    left: -300px;
    top: 0;
    opacity: 0;
  }
  &.true {
    left:0px;
    opacity:1;
  }
  > div > img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
`;
export const TopIconArea = styled.div`
display: flex;
border-bottom: 2px solid rgb(181,194,200);
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