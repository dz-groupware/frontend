import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { menu, favor, profileList } from '../utils/Slice';
import { basicInfoApi } from '../api/gnb';

import TB from './TB';
import GNB from './GNB';
import LNB from './LNB';
import Module from './Module';
import { Main } from './VIEW';

export default function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const empId = useSelector(state => state.gnbMenu.empId);

  useEffect(() => {
    const basicInfo = async() => {
      try{
        await basicInfoApi(empId).then(response => {
          dispatch(profileList(response.data.profile));
          dispatch(menu(response.data.menu));
          dispatch(favor(response.data.favor));            
        });
      } catch (error) {
        console.log(error);
        if(error.message === 'UNAUTHORIZED'){
          navigate('/login');
        }
        if(error.message === 'FORBIDDEN'){
          navigate('/login');
        }
      }
    }
    
    basicInfo();

  }, [empId, dispatch, navigate]);

  return (
    <>
      <Content>
        <TB />
        <RouteArea id='route'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/:param' element={<LNB />}>
              <Route path=':menuName' element={<Module />} />
            </Route> 
          </Routes>
        </RouteArea>
      </Content>
      <GNB />
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