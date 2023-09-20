import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { basicInfoApi } from '../api/gnb';

import TB from './TB';
import GNB from './GNB';
import LNB from './LNB';
import Module from './Module';
import { Main } from './VIEW';

export default function Home() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));

  const navigate = useNavigate();

  const empId = useSelector(state => state.loginInfo.empId);

  useEffect(() => {
    console.log('in useEffect');
    const basicInfo = async() => {
      try{
        await basicInfoApi(empId).then(res => {
          setProfile(res.data.profile);
          setGnb(res.data.menu);
          setFavor(res.data.favor);           
        });
      } catch (error) {
        console.log(error);
        if(error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN'){
          navigate('/login');
        }
      }
    }
    
    basicInfo();

  }, [empId, navigate]);

  return (
    <>
      <Content>
        <TB profile={profile} empId={empId}/>
        <RouteArea id='route'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/:param' element={<LNB />}>
              <Route path=':menuName' element={<Module />} />
            </Route> 
          </Routes>
        </RouteArea>
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