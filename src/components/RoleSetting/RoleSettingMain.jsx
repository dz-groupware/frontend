import React, { useState } from 'react'
import AuthGroupSection from './AuthGroupSection';
import MenuTreeTop from './MenuTreeTop';
import UserListSection from './UserListSection';
import { styled } from 'styled-components';
import MenuTreeMain from './MenuTreeMain';

export default function RoleSettingMain() {
  //여기서 Company누를 때 일어나는 상황 정하기
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const handleCompanyClick = (id) => {
    // setSelectedCompanyId(id);
  };
  return (
    <Container>
        <AuthGroupSection onCompanyClick={handleCompanyClick}/>
        <MenuTreeSection>
          <MenuTreeTop />
          <MenuTreeMain companyId={1}/>
        </MenuTreeSection>
        <UserListSection/>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 30px;
`;
const MenuTreeSection = styled.div`
  flex: 1;
`;

