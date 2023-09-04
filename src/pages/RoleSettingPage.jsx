import React from 'react';
import styled from 'styled-components';
import RoleSettingTop from '../components/RoleSetting/RoleSettingTop';
import LinkButon from '../components/Commons/LinkButon';
import Line from '../components/Commons/Line';
import RoleSettingMain from '../components/RoleSetting/RoleSettingMain';

export default function RoleSettingPage() {
  return (
    <Container>
      <RoleSettingTop/>
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <LinkButon 
        cursor="none"
        onClick={(e)=>e.preventDefault()}
        name="권한그룹"
        selected={true}
      />
      <Line/>
      <RoleSettingMain/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 1200px; //높이 바꿔
  border: 1px solid blue;
`;