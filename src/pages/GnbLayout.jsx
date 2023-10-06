import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';
import { getMenuList } from '../api/menu';

import TB from './TB';
import GNB from '../components/GNB/GNB';
import LnbLayout from './LnbLayout';

export default function GnbLayout() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));
  const [routeList, setRouteList] = useState(new Map([
    [`/`, { menuId: 0, gnbId: 0, gnbName: 'main', page: 'Main' }],
    [`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: '403', page: 'FORBIDDEN' }],]));

  const [empId, setEmpId] = useState(localStorage.getItem("empId"));
  const [routeOn, setRouteOn] = useState(false);
    
  const parseMenuList = (originMenuList) => {
    const menuList = new Map();
    originMenuList.forEach(row => {
      const { menuId, gnbId, gnbName, nameTree, page } = row;
      menuList.set(`/${nameTree}`, { menuId, gnbId, gnbName, page });
    });
    menuList.set(`/`, { menuId: 0, gnbId: 0, gnbName: 'main', page: 'Main' });
    menuList.set(`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: '403', page: 'FORBIDDEN' });
    setRouteList(menuList);
  }

  const initRouteList = async () => {
    try {
      const res = await getMenuList(0);
      parseMenuList(res.data.data);
    } catch (error) {
      console.log('error in RouteList');
    };
    // 컴포넌트 마운트 시 현재 경로를 기반으로 routeList 업데이트
  };

  const basicInfo = async(empId) => {
    try{
      await basicInfoApi(empId).then(res => {
        setProfile(res.data.data.profile);
        setGnb(res.data.data.menu);
        setFavor(res.data.data.favor);  
        setEmpId(res.data.data.empId);
        localStorage.setItem("empId", res.data.data.empId);
        localStorage.setItem("compId", res.data.data.compId);
        initRouteList();
      });
    } catch (error) {
      console.log(error);
      window.location.href="/login";
    }
  };

  useEffect(() => {
    if (empId) {
      basicInfo(empId);
    } else {
      basicInfo(0);
    }  
  }, [empId]);


  useEffect(() => {
    try{
      initRouteList().then(()=>{
        setRouteOn(true);
      });
      
    }catch (error) {
      console.log('route-list : ',error);
    }
  }, []);

  return (
    <>
      <Content>
        <TB profile={profile} empId={empId}/>
        { routeOn && <LnbLayout routeList={routeList}/> }
      </Content>
      <GNB gnb={gnb} favor={favor}/>
    </>
  );
}

export const Content = styled.div`
position: fixed;
top: 0px;
left: 50px;
margin: 0px;
padding: 0px;
width: 100%;
height: 100%;
`;
export const RouteArea = styled.div`
color: rgb(66,71,84);
height: calc(100% - 80px);
width: 100%;


`;
export const TBArea = styled.div`
height:80px;
width:100%;  
position: relative;
z-index: 2;
color:rgb(66,71,84);
background-color:rgb(181,194,200);
`;