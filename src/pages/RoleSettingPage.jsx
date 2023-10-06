import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LinkButon from '../components/Commons/LinkButon';
import Line from '../components/Commons/Line';
import RoleSettingMain from '../components/RoleSetting/RoleSettingMain';
import { MdDisplaySettings, MdSmartDisplay, MdOutlineMapsUgc } from 'react-icons/md'
import { PiCalendarCheck, PiStarBold } from 'react-icons/pi'
import RoleModal from '../components/RoleSetting/RoleModal';
import ActionButton from '../components/Commons/ActionButton';
import { addAuthApi, updateAuthApi } from '../api/authgroup';

export default function RoleSettingPage({pageId}) {
  const [refresh, setRefresh] = useState(false);
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const changeRefresh = () => {
    setRefresh(!refresh);
  }

  const handleItemClick = (authId) => {
    if (isEditMode) {
      if (activeAuthId !== authId) {
        alert("수정 중에는 이동할 수 없습니다.");
      }  
    } else {
      setActiveAuthId(authId);
    }
  };

  return (
    <Container>
      <TopContainer>
        <TitleAndIconContainer>
          <h1>권한Role설정</h1>
          {/* <IconWrapper>
            <MdDisplaySettings fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdSmartDisplay fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdOutlineMapsUgc fontSize={20} color='#939393'/>
          </IconWrapper> */}
        </TitleAndIconContainer>
        <ActionsContainer>
          <ActionButton 
            width={'3rem'}
            fontWeight={400} 
            fontSize={'1.0rem'} 
            name="추가"
            onClick={() =>{ 
              if(!isEditMode){
                setOpenCreateModal(true); 
              }else {
                alert('수정중에는 추가할 수 없습니다.')
              }
            }}/> 
            {activeAuthId &&(         
              <ActionButton 
                width={'3rem'}
                fontWeight={400} 
                fontSize={'1.0rem'} 
                name="수정"
                onClick={() =>{ 
                  if(!isEditMode){
                    setOpenModifyModal(true); 
                  }else {
                    alert('수정중에는 추가할 수 없습니다.')
                  }
                }}
              />
            )}
          <VerticalLine/>
          {/* <PiCalendarCheck fontSize={26} color='C9C9C9'/> */}
          <PiStarBold fontSize={26} color='C9C9C9'/>
        </ActionsContainer>
        <RoleModal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} changeRefresh={changeRefresh} setActiveAuthId={setActiveAuthId} apiFunction={addAuthApi} headers={{pageId}}/>
        <RoleModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} modifyMode={true} changeRefresh={changeRefresh} activeAuthId={activeAuthId} setActiveAuthId={setActiveAuthId} apiFunction={updateAuthApi} headers={{pageId}}/>
      </TopContainer>
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButon 
          as="h1"
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
      <RoleSettingMain 
        refresh={refresh} 
        activeAuthId={activeAuthId} 
        changeRefresh={changeRefresh}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        handleItemClick={handleItemClick}
        headers={{pageId}}
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
const ActionsContainer = styled.div`
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
const VerticalLine = styled.div`
  height: 20px; 
  width: 1px;
  background-color: #C9C9C9; 
  margin: 0 10px;
`;
