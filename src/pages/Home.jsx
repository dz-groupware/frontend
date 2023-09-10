import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { menu, favor, profileList } from '../utils/Slice';
import { GnbFavorApi, GnbFavorDeleteApi, basicInfoApi } from '../utils/API';

import TB from './TB';
import AWS from './AWS';
import LNB from './LNB';
import Module from './Module';
import { Main } from './VIEW';

import MenuList from '../components/GNB/MenuList';
import IconList from '../components/GNB/IconList';
import FavList from '../components/GNB/FavList';

import { BiSolidGrid } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

export default function Home() {

  const [menuOn, setMenuOn] = useState([false, false]);
  const dispatch = useDispatch();

  const menuData = useSelector(state => state.gnbMenu.menu);
  const favorData = useSelector(state => state.gnbMenu.favor);
  const empId = useSelector(state => state.gnbMenu.empId);

  const navigate = useNavigate();

  useEffect(() => {
    const basicInfo = async() => {
      try{
        await basicInfoApi(empId).then(response => {
          if(response.status === 403 || response.status === 401){
            navigate('./login');
          }
          dispatch(profileList(response.data.profile));
          dispatch(menu(response.data.menu));
          dispatch(favor(response.data.favor));            
        });

      } catch (error) {
        if(error.response && error.response.status === 403){
          navigate('/login');
        }
        if(error.response && error.response.status === 401){
          navigate('/login');
        }
      }
    }
    
    basicInfo();

  }, [empId, dispatch, navigate]);

  return (
    <Container>
      <BgiArea>
        <TBArea id='tb'><TB /></TBArea>
        <RouteArea id='route'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/s3' element={<AWS />} />
            <Route path='/:param' element={<LNB />}>
              <Route path=':menuName' element={<Module />} />
            </Route> 
          </Routes>
        </RouteArea>
      </BgiArea>
      <GNBIconArea id='gnbIcon'>   
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
      <GNBMenuArea id='gnbMenu' className={`menu main ${menuOn[0]} ? 'true' : 'false'}`}>
        <TopIconArea>
          <AiOutlineMenu onClick={() => {setMenuOn([true, false]);}} />
          <AiOutlineStar onClick={() => {setMenuOn([false, true]);}} />
        </TopIconArea>
        <hr />
        <MenuList value={menuData}/>
      </GNBMenuArea>
      <GNBFavArea id='gnbFav' className={`main ${menuOn[1]} ? 'true' : 'false'}`}>
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
export const RouteArea = styled.div`
color: rgb(66,71,84);
height: calc(100% - 80px);
width: 100%;
`;

export const Container = styled.div`
position: absolute;
display: flex;
color: rgb(181,194,200);
width: 100%;
height: 100%;
margin: 0;
`;

export const BgiArea = styled.div`
margin: 0px;
padding: 0px;
position: fixed;
left: 50px;
top: 0px;
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
z-index: 1;
color:rgb(66,71,84);
background-color:rgb(181,194,200);
`;

export const GNBIconArea = styled.div`
display:block;
width:50px;
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
  margin: 7px;  
  margin-top: 15px;
}

> a {
  text-decoration: none;

  > img {
    position: relative;
    width:30px;
    height:30px;
    margin:10px;
    margin-top: 20px;
  }
}
`;
export const GNBMenuArea = styled.div`
padding-top: 10px;
padding-left: 10px;
position: absolute;
margin-left: 50px;
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
padding-left: 10px;
position: absolute;
margin-left: 50px;
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
  margin-bottom: 10px;
} 
`;