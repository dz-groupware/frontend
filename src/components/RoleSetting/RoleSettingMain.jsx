import React, { useEffect, useState } from 'react'
import AuthGroupSection from './AuthGroupSection';
import MenuTreeTop from './MenuTreeTop';
import UserListSection from './UserListSection';
import styled  from 'styled-components';
import MenuTreeMain from './MenuTreeMain';
import SelectedAuthMenu from './SelectedAuthMenu';
import Line from '../Commons/Line';

export default function RoleSettingMain() {
  //여기서 Company누를 때 일어나는 상황 정하기
  const [activeAuthId, setActiveAuthId] = useState(null);
  //companyId는 리덕스로
  return (
    <Container>
        <AuthGroupSection 
          setActiveAuthId={setActiveAuthId} 
          activeAuthId={activeAuthId}
        />
        <MenuTreeSection>
          <MenuTreeTop />
          <Line color="black"/>
          <h2> 메뉴명 </h2>
          {activeAuthId ? <SelectedAuthMenu activeAuthId={activeAuthId} companyId={1}/> : <MenuTreeMain activeAuthId={activeAuthId} companyId={1}/>}
          {/* <MenuTreeMain activeAuthId={activeAuthId} companyId={1}/> */}
        </MenuTreeSection>
        <UserListSection/>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  height: 100%;
  gap: 30px;
`;
const MenuTreeSection = styled.div`
  flex-grow: 0;
  width: 600px;
`;

