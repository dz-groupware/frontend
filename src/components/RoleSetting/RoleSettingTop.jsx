import React from 'react'
import { styled } from 'styled-components';
import { MdDisplaySettings, MdSmartDisplay, MdOutlineMapsUgc } from 'react-icons/md'
import { PiCalendarCheck, PiStarBold } from 'react-icons/pi'
export default function RoleSettingTop() {
  return (
    <Container>
      <LeftWrapper>
        <h1>권한Role설정</h1>
        <IconWrapper>
          <MdDisplaySettings fontSize={20} color='#939393'/>
        </IconWrapper>
        <IconWrapper>
          <MdSmartDisplay fontSize={20} color='#939393'/>
        </IconWrapper>
        <IconWrapper>
          <MdOutlineMapsUgc fontSize={20} color='#939393'/>
        </IconWrapper>
      </LeftWrapper>
      <RightWrapper>
        <StyledButton>추가</StyledButton>
        <StyledButton>변경이력</StyledButton>
        <VerticalLine/>
        <PiCalendarCheck fontSize={26} color='C9C9C9'/>
        <PiStarBold fontSize={26} color='C9C9C9'/>
      </RightWrapper>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  h1{
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
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
const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-weight: 600;
  background: linear-gradient(to bottom, #ffffff,#ffffff,#e4e4e4); 
  padding: 7px;
  margin-left: 3px;
  border: 1px solid #C9C9C9;
  border-radius: 5px;

`
const VerticalLine = styled.div`
  height: 20px; 
  width: 1px;
  background-color: #C9C9C9; 
  margin: 0 10px;
`;