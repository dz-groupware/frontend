import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import { menu, favor, profileList } from '../utils/Slice';
import { GnbMenuApi, GnbFavorApi, GnbFavorDeleteApi, profileAPI } from '../utils/API';

import TB from './TB';
import AWS from './AWS';
import { LNB, Module } from './LNB';
import { Main } from './VIEW';

import MenuList from '../components/GNB/MenuList';
import IconList from '../components/GNB/IconList';
import FavList from '../components/GNB/FavList';

import { BiSolidGrid } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import LoginPage from './LoginPage';


export default function Home() {

  const [menuOn, setMenuOn] = useState([false, false]);
  const dispatch = useDispatch();

  const menuData = useSelector(state => state.gnbMenu.menu);
  const favorData = useSelector(state => state.gnbMenu.favor);
  const empId = useSelector(state => state.gnbMenu.empId);

  useEffect(() => {
    // GnbMenuApi(empId).then(function (response) {
    //   dispatch(menu(response.data.data));
    // });
    // GnbFavorApi(empId).then(function (response) {
    //   dispatch(favor(response.data.data));
    // });
    // profileAPI(empId).then(function (response) {
    //   dispatch(profileList(response.data.data));
    // });
  }, [empId, dispatch]);

  return (
    <Container>
      <BgiArea>
        <TBArea><TB /></TBArea>
        <div style={{position: 'relative', zIndex:'-1', height: '100%'}}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/s3' element={<AWS />} />
          <Route path='/:param' element={<LNB />}>
            <Route path=':menuName' element={<Module />} />
          </Route> 
        </Routes>
        </div>
      </BgiArea>
      <GNBIconArea>   
        <BiSolidGrid onClick={() => {
          if (menuOn[0] || menuOn[1]) {
            setMenuOn([false, false]);
          } else {
            setMenuOn([true, false]);
          }
        }}/>
        <hr />
        <IconList value={menuData}/>
      </GNBIconArea>
      <GNBMenuArea className={`menu main ${menuOn[0]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <hr />
        <MenuList value={menuData}/>
      </GNBMenuArea>
      <GNBFavArea className={`main ${menuOn[1]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <hr />
        <FavList value={favorData} deleteApi={GnbFavorDeleteApi} favorApi={GnbFavorApi}/>
      </GNBFavArea>
    </Container>
  );
}

export const Container = styled.div`
display: flex;
background-color: white;
color: white;

width:100%;
height:100%;
margin: 0;
background-color: rgb(240, 245, 248);

`;
export const BgiArea = styled.div`
margin: 0px;
padding: 0px;
position: fixed;
left: 50px;
width: 100%;
height: 100%;
background-color: rgb(240,245,248);
> img {
  width:100%;
  height:100%;
  position: absolute;
  z-index: 0;
}
> #bgi{
  display: none;
}
`;
export const TBArea = styled.div`
height:80px;
width:100%;  
position: relative;
z-index: 0;
`;

export const GNBIconArea = styled.div`
display:block;
width:50px;
height: 100%;
background-color:rgb(45,49,62);
color:rgb(192, 185, 237);
position : absolute;
overflow : scroll;
&::-webkit-scrollbar{
  display: none;
}
> svg {
  width:35px;
  height:35px;
  margin-top: 15px;
  margin-left: 10px;  
}
  img {
    position: relative;
    width:30px;
    height:30px;
    margin:10px;
  }
 
`;
export const GNBMenuArea = styled.div`
padding-top: 10px;
padding-left: 10px;
position: absolute;
margin-left: 50px;
width: 200px;
height: 100%;
background-color: rgb(45,49,62);
color:rgb(192, 185, 237);
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

> div ul a li {
  color:rgb(192, 185, 237);
  list-style: none;
  margin-top: 7px;
  text-decoration: none;
}
`;
export const GNBFavArea = styled.div`
padding-top: 10px;
padding-left: 10px;
position: absolute;
margin-left: 50px;
width: 200px;
height: 100%;
background-color: rgb(45,49,62);
color:rgb(192, 185, 237);
cursor: pointer;

overflow: hidden;

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
`;
export const TopIconArea = styled.div`
display: flex;

> * {
  width: 30px;
  height: 30px;
  margin-left: 40px;
  margin-right: 10px;
  margin-top: 9px;
  margin-bottom: 5px;
} 
`;