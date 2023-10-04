import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';

import TB from './TB';
import GNB from '../components/GNB/GNB';
import LNB from './LnbLayout';

export default function GnbLayout() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));

  const basicInfo = async(empId) => {
    try{
      const res = await basicInfoApi(empId, "0");
      setProfile(res.data.data.profile);
      setGnb(res.data.data.menu);
      setFavor(res.data.data.favor);  
      localStorage.setItem("empId", res.data.data.empId);
      localStorage.setItem("compId", res.data.data.compId);
    } catch (error) {
      console.log(error);
      // if (error.status === 401) {
      //   console.log('로그인 정보 없음 (in home)');
      //   localStorage.setItem("empId", 0);
      //   localStorage.setItem("compId", 0);
      //   window.location.href="/login";
      // }
    }
  };

  useEffect(() => {
    const empId = localStorage.getItem("empId");
    if (empId === null || empId === undefined){
      // 로그인 정보 없음.

    } else {
      basicInfo(empId);
    }
  }, [])

  return (
    <>
      <Content>
        <TB profile={profile}/>
        <LNB />
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