import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Line from '../components/Commons/Line';
import RoleSettingMain from '../components/RoleSetting/RoleSettingMain';
import RoleModal from '../components/RoleSetting/RoleModal';
import ActionButton from '../components/Commons/ActionButton';
import { addAuthApi, updateAuthApi } from '../api/authgroup';
import MgmtHeader from '../components/Commons/MgmtHeader';
import LinkButton from '../components/Commons/LinkButton';

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
 
        <MgmtHeader title="권한Role설정" pageId={pageId} extraButtonComponents={
        
        <ButtonArea>
        <ActionsContainer>
          <ActionButton 
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
          
        </ActionsContainer>
        <RoleModal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} changeRefresh={changeRefresh} setActiveAuthId={setActiveAuthId} apiFunction={addAuthApi} headers={{pageId}}/>
        <RoleModal isOpen={openModifyModal} onClose={() => setOpenModifyModal(false)} modifyMode={true} changeRefresh={changeRefresh} activeAuthId={activeAuthId} setActiveAuthId={setActiveAuthId} apiFunction={updateAuthApi} headers={{pageId}}/>
        <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '10px', marginRight: '5px' }} />
           
           </ButtonArea>   
              }>
      
        </MgmtHeader>
       
      
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButton
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
  height: 100%;
`;


const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;