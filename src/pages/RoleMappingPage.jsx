import React, { useState } from 'react'
import { MdDisplaySettings, MdOutlineMapsUgc, MdSmartDisplay } from 'react-icons/md';
import styled from 'styled-components';
import RoleMappingMain from '../components/RoleMapping/RoleMappingMain';
import Line from '../components/Commons/Line';
import LinkButon from '../components/Commons/LinkButon';

export default function RoleMappingPage() {
  const [refresh, setRefresh] = useState(false);
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [activeEmpId, setActiveEmpId] = useState(null);
  const changeRefresh = () => {
    setRefresh(!refresh);
  }

  const handleAuthClick = (authId) => {
    setActiveAuthId(authId);
  };

  const handleEmpClick = (empId) => {
    console.log("empId",empId);
    setActiveEmpId(empId);
  }

  return (
    <Container>
      <TopContainer>
      <TitleAndIconContainer>
        <h1>권한설정</h1>
        <IconWrapper>
          <MdDisplaySettings fontSize={20} color='#939393'/>
        </IconWrapper>
        <IconWrapper>
          <MdSmartDisplay fontSize={20} color='#939393'/>
        </IconWrapper>
        <IconWrapper>
          <MdOutlineMapsUgc fontSize={20} color='#939393'/>
        </IconWrapper>
      </TitleAndIconContainer>
      </TopContainer>
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButon 
          cursor="none"
          onClick={(e)=>e.preventDefault()}
          name="사용자 기준"
          selected={true}
          padding={"0.1rem 1.2rem 0.5rem"}
          showBorderBottom={true}
          showBorderLeft={true}
          showBorderRight={true}
        />
      </div>
      <Line left={"1.2rem"}/>
      <RoleMappingMain 
        refresh={refresh} 
        activeAuthId={activeAuthId} 
        changeRefresh={changeRefresh}
        handleAuthClick={handleAuthClick}
        activeEmpId={activeEmpId}
        handleEmpClick={handleEmpClick}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; //높이 바꿔
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 0.5rem;
`;
const TitleAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  h1{
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  position: relative;
  bottom: 5px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
`;