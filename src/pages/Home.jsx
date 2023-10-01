import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';

import TB from './TB';
import GNB from './GNB';
import LNB from './LNB';

export default function Home() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));

  const empId = localStorage.getItem("empId") ?? 0;

  const basicInfo = async() => {
    try{
      const res = await basicInfoApi(empId, "0");
      setProfile(res.data.data.profile);
      setGnb(res.data.data.menu);
      setFavor(res.data.data.favor);  
      localStorage.setItem("empId", res.data.data.empId);
      localStorage.setItem("compId", res.data.data.compId);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        console.log('로그인 정보 없음 (in home)');
        window.location.href="/login";
      }
    }
  };

  useEffect(() => {
    basicInfo();
  }, [empId]);

  return (
    <>
      <Content>
        <TB profile={profile} empId={empId}/>
        <LNB />
      </Content>
      <GNB gnb={gnb} favor={favor} empId={empId}/>
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