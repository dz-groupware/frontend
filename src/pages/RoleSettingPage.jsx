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
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButon 
          cursor="none"
          onClick={(e)=>e.preventDefault()}
          name="권한그룹"
          selected={true}
          padding={"0.1rem 1.2rem 0.5rem"}
          showBorderBottom={true}
          showBorderLeft={true}
          showBorderRight={true}
        />
      </div>
      <Line left={"1.2rem"}/>
      <RoleSettingMain/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; //높이 바꿔
`;