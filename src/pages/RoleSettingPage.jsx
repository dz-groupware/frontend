import React from 'react';
import styled from 'styled-components';
import RoleSettingHeadSection from '../components/RoleSetting/RoleSettingHeadSection';
import LinkButon from '../components/Commons/LinkButon';
import Line from '../components/Commons/Line';
import UserListSection from '../components/RoleSetting/UserListSection';
import AuthGroupSection from '../components/RoleSetting/AuthGroupSection';
import MenuTreeSection from '../components/RoleSetting/MenuTreeSection';

export default function RoleSettingPage() {
  const preventClickHandler = (e) =>{
    e.preventDefault();
  }
  return (
    <Container>
      <RoleSettingHeadSection/>
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <LinkButon 
        cursor="none"
        onClick={preventClickHandler}
        name="권한그룹"
        selected={true}
      />
      <Line/>
      <SectionContainer>
        <AuthGroupSection/>
        <MenuTreeSection/>
        <UserListSection/>
      </SectionContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
