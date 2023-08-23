import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import {hover_on, menu_on, favor_on, recent_on, menu, favor, recent, profileList} from '../utils/Slice'
import { GnbMenuApi, GnbFavorApi, GnbFavorDeleteApi, profileAPI } from '../utils/API';

import TB from './TB';
import { VIEW, Test, EmpM, DeptM, CompM } from './VIEW';

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
background-color: white;
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
> img {
  width:100%;
  height:100%;
  position: absolute;
  z-index: 0;
}
`;
export const TBDiv = styled.div`
height:80px;
width:1150px;  
position: relative;
z-index: 2;
`;
export const ScreenDiv = styled.div`
height:700px;
width:1150px;
position: relative;
z-index: 0;


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

  const menuData = useSelector(state => state.gnbMenu.menu);
  const favorData = useSelector(state => state.gnbMenu.favor);

  const emp_id = useSelector(state => state.gnbMenu.key);

  useEffect(() => {
    GnbMenuApi(emp_id).then(function (response) {
      dispatch(menu(response.data.data));
    });
    GnbFavorApi(emp_id).then(function (response) {
      dispatch(favor(response.data.data));
    });
    dispatch(recent(emp_id));
    profileAPI(emp_id).then(function (response) {
      dispatch(profileList(response.data.data));
    });
  }, [emp_id, dispatch]);

  return (
    <StyledDiv>
      <BgiDiv >
        <img src={`/img/bgi.jpg`} alt='bgi'/>
        <TBDiv><TB /></TBDiv>
        <ScreenDiv>
          <Routes>
            <Route path="/회사관리" element={<CompM />} />
            <Route path="/부서관리" element={<DeptM />} />
            <Route path="/사원관리" element={<EmpM />} />
            <Route path="/공지사항" element={<Test />} />
            <Route path="/" element={<VIEW />} />
          </Routes>
        </ScreenDiv>
      </BgiDiv>
      <GNBIcon>   
        <BiSolidGrid style={{width:'30px', height:'30px', marginLeft:'10px', marginTop:'20px'}} onClick={() => {dispatch(hover_on())}} />
        <hr />
        <IconList value={menuData}/>
      </GNBIcon>
      <GNBMenu className={`menu main ${useSelector(state => state.gnbSwitch.menu) ? 'true' : 'false'}`}>
        <div>
          <GnbTop />
          <hr />
        </div>
        <MenuList value={menuData}/>
      </GNBMenu>
      <GNBFav className={`main ${useSelector(state => state.gnbSwitch.favor) ? 'true' : 'false'}`}>
        <div>
          <GnbTop />
          <hr />
        </div>
        <FavList value={favorData} deleteApi={GnbFavorDeleteApi} favorApi={GnbFavorApi}/>
      </GNBFav>
      <GNBRecent className={`main ${useSelector(state => state.gnbSwitch.recent) ? 'true' : 'false'}`}>
        <div>
          <GnbTop />
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

export const Top = styled.div`
display: flex;
> * {
  width: 30px;
  height: 30px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 14px;
} 
`
export function GnbTop(){
  const dispatch = useDispatch();
  return (
    <Top>
      <AiOutlineMenu onClick={() => {dispatch(menu_on())}} />
      <AiOutlineStar onClick={() => {dispatch(favor_on())}} />
      <AiOutlineFieldTime onClick={() => {dispatch(recent_on())}} />
    </Top>
  )
}