import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';
import { getMenuList } from '../api/menu';

import TB from './TB';
import LnbLayout from './LnbLayout';
import GNB from '../components/GNB/GNB';

import Retry from '../common/Error/Retry';
import Loading from '../common/styles/Loading.jsx';


export default function GnbLayout() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));
  const [empId, setEmpId] = useState(localStorage.getItem("empId"));
  const [routeOn, setRouteOn] = useState(false);
  const [error, setError] = useState(false);
  const [routeList, setRouteList] = useState(new Map([
    [`/`, { menuId: 0, gnbId: 0, gnbName: 'main', page: 'Main' }],
    [`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: '403', page: 'Error/FORBIDDEN' }],
    [`/SERVICE_UNAVAILABLE`, { menuId: 0, gnbId: 0, gnbName: '503', page: 'Error/SERVICE_UNAVAILABLE' }]]));
    
  const parseMenuList = (originMenuList) => {
    const menuList = new Map();
    originMenuList.forEach(row => {
      const { menuId, gnbId, gnbName, nameTree, page } = row;
      menuList.set(`/${nameTree}`, { menuId, gnbId, gnbName, page });
    });
    menuList.set(`/`, { menuId: 0, gnbId: 0, gnbName: 'main', page: 'Main' });
    menuList.set(`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: '403', page: 'Error/FORBIDDEN' });
    menuList.set(`/SERVICE_UNAVAILABLE`, { menuId: 0, gnbId: 0, gnbName: '503', page: 'Error/SERVICE_UNAVAILABLE' });
    setRouteList(menuList);
  };

  const initRouteList = async () => {
    try {
      const res = await getMenuList(0);
      parseMenuList(res.data.data);
    } catch (error) {
      console.log('error in RouteList');
    };
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
      console.log('ERR: ', error);
      window.location.href="/login";
    }
  };

  useEffect(() => {
    try{
      initRouteList().then(()=>{
        setRouteOn(true);
      });
    }catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    try {
      if (empId) {
        basicInfo(empId);
      } else {
        basicInfo(0);
      }  
    } catch (error) {
      setError(true);
    }
  }, [empId]);

  return (
    <Page>
      <Content>
        <TB profile={profile} empId={empId} routeList={routeList}/>
        { error ? <Retry /> : (
          routeOn ? <LnbLayout routeList={routeList}/> : <Loading />
        )}
      </Content>
      <GNB gnb={gnb} favor={favor}/>
    </Page>
  );
}

const Page = styled.div`
width: 80vw;
height: 80vh;
`;
const Content = styled.div`
  position: fixed;
  top: 0px;
  left: 45px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
`;

// const Fail = styled.div`
// display:block;
// width: 46px;
// height: 100%;
// background-color:#1d2437;
// color:rgb(181,194,200);
// position : absolute;
// overflow : scroll;
// z-index: 1;
// `;