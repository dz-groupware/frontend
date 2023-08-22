import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import {hover_on, menu_on, favor_on, recent_on} from '../utils/Slice'

import TB from './TB';
import VIEW from './VIEW';
import Test from './Test';

import MenuList from '../components/GNB/MenuList';
import RecentList from '../components/GNB/RecentList';
import IconList from '../components/GNB/IconList';
import FavList from '../components/GNB/FavList';

import { BiSolidGrid } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";

//styled-component

export const StyledDiv = styled.div`
display: flex;
background-color: black;
color: white;

width:1200px;
height:700px;
margin: 0;

` 
export const BgiDiv = styled.div`
margin: 0px;
padding: 0px;
position: fixed;
left: 50px;
width: 1150px;
height: 700px;
`;
export const TBDiv = styled.div`
height:80px;
width:1150px;  
`;
export const ScreenDiv = styled.div`
height:700px;
width:1150px;
`;
export const GNBIcon = styled.div`

  display:block;
  width:50px;
  height:100%;
  background-color:rgb(21,21,72);

  img {
    position: relative;
    width:30px;
    height:30px;
    margin:10px;
  }
  
  &:hover ~ .menu {
    left: 0;
    top: 0;
    opacity: 1;
    transition: left 2s;
  }
`;
export const GNBMenu = styled.div`
padding-top: 10px;
padding-left: 10px;
position: relative;
width: 200px;
background-color: rgb(21, 21, 72);
color:rgb(192, 185, 237);
cursor: pointer;

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

> div ul a li {
  color:rgb(192, 185, 237);
  list-style: none;
  margin-top: 7px;
  text-decoration: none;
}

> div > img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
}

&:hover {
  left: 0px;
  opacity: 1;
}
`;
export const GNBFav = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  top:0px;
  margin-left:50px;
  position: absolute;
  width: 200px;
  height: 700px;
  background-color: rgb(21, 21, 72);
  color:rgb(192, 185, 237);
  cursor: pointer;

  &.false {
    left: -300px;
    top: 0;
    opacity: 0;
  
    transaction: left 3s;
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
`
export const GNBRecent = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  top:0px;
  margin-left:50px;
  position: absolute;
  width: 200px;
  height: 700px;
  background-color: rgb(21, 21, 72);
  color:rgb(192, 185, 237);
  cursor: pointer;

  &.false {
    left: -300px;
    top: 0;
    opacity: 0;
  
    transaction: left 3s;
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
`

export default function Home() {

  const dispatch = useDispatch();

  return (
    <StyledDiv>
      <BgiDiv style={{backgroundImage : `url(${process.env.PUBLIC_URL}/img/bgi.jpg)`}}>
        <TBDiv><TB /></TBDiv>
        <ScreenDiv>
          <Routes>
            <Route path="/공지사항" element={<Test />} />
            <Route path="/" element={<VIEW />} />
          </Routes>
        </ScreenDiv>
      </BgiDiv>
      <GNBIcon>   
        <BiSolidGrid style={{width:'30px', height:'30px', marginLeft:'10px', marginTop:'20px'}} onClick={() => {dispatch(hover_on())}} />
        <hr />
        <IconList />
      </GNBIcon>
      <GNBMenu className={`menu main ${useSelector(state => state.gnbMenu.menu) ? 'true' : 'false'}`}>
        <div>
          <AiOutlineMenu style={{width:'30px', height:'30px', marginLeft:'10px', marginTop:'10px'}} onClick={() => {dispatch(menu_on())}} />
          <AiOutlineStar style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(favor_on())}} />
          <AiOutlineFieldTime style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(recent_on())}} />
          <hr />
        </div>
        <MenuList />
      </GNBMenu>
      <GNBFav className={`main ${useSelector(state => state.gnbMenu.favor) ? 'true' : 'false'}`}>
        <div>
          <AiOutlineMenu style={{width:'30px', height:'30px', marginLeft:'10px', marginTop:'10px'}} onClick={() => {dispatch(menu_on())}} />
          <AiOutlineStar style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(favor_on())}} />
          <AiOutlineFieldTime style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(recent_on())}} />
          <hr />
        </div>
        <FavList />
      </GNBFav>
      <GNBRecent className={`main ${useSelector(state => state.gnbMenu.recent) ? 'true' : 'false'}`}>
        <div>
          <AiOutlineMenu style={{width:'30px', height:'30px', marginLeft:'10px', marginTop:'10px'}} onClick={() => {dispatch(menu_on())}} />
          <AiOutlineStar style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(favor_on())}} />
          <AiOutlineFieldTime style={{width:'30px', height:'30px', marginLeft:'30px', marginTop:'10px'}} onClick={() => {dispatch(recent_on())}} />
        <hr />
        </div>
        <div>최근기록</div><div>x</div>
        <div>
          <RecentList />
        </div>
      </GNBRecent>

    </StyledDiv>
  );
}