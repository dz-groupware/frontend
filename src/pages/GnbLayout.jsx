import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';

import TB from './TB';
import GNB from '../components/GNB/GNB';
import LnbLayout from './LnbLayout';

export default function GnbLayout() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));
  const [empId, setEmpId] = useState(null);
  const basicInfo = async(empId) => {
    try{
      const res = await basicInfoApi(empId);
      if (Array.isArray(res.data.data.profile)) {
        setProfile(res.data.data.profile);
      } else {
        console.log(":: error : profile is null ::");
      }
      if (Array.isArray(res.data.data.menu)) {
        setGnb(res.data.data.menu);
      } else {
        console.log(":: error : GNB is null ::");
      }
      if (Array.isArray(res.data.data.favor)) {
        setFavor(res.data.data.favor);  
      }
      console.log(res.data.data.empId, res.data.data.compId)
      localStorage.setItem("empId", res.data.data.empId);
      localStorage.setItem("compId", res.data.data.compId);
    } catch (error) {
      console.log('gnb에러',error);
      window.location.href="/login";
    }
  };

  useEffect(() => {
   setEmpId(localStorage.getItem("empId"));
  }, [])
  
  useEffect(() => {
    if (empId) {
      basicInfo(empId);
    } else {
      basicInfo(0);
    }  
  },[empId]);

  return (
    <>
      <Content>
        <TB profile={profile}/>
        <LnbLayout />
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