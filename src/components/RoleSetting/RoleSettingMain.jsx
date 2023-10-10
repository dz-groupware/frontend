import React, { useEffect, useRef, useState } from 'react'
import styled  from 'styled-components';
import Line from '../Commons/Line';
import UserListSection from './UserList/UserListSection';
import MenuTreeTop from './Menu/MenuTreeTop';
import AuthGroupSection from './AuthGroup/AuthGroupSection';
import MenuOfAuth from './Menu/MenuOfAuth';
import MenuOfAuthEditor from './Menu/MenuOfAuthEditor';
export default function RoleSettingMain({refresh, activeAuthId, changeRefresh, isEditMode, setIsEditMode, handleItemClick, headers}) {
  const [visible, setVisible] = useState(true);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  useEffect(() => {
    if (activeAuthId !== null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [activeAuthId]);
  return (
    <Container>
        <StyledAuthGroupContainer>
          <AuthGroupSection 
            refresh={refresh}
            activeAuthId={activeAuthId}
            isEditMode={isEditMode}
            handleItemClick={handleItemClick}
            headers={headers}
          />
        </StyledAuthGroupContainer>
        <StyledMenuTreeContainer $visible={visible} >
          <MenuTreeTop 
            activeAuthId={activeAuthId}
            isEditMode={isEditMode} 
            setIsEditMode={setIsEditMode} 
            setIsSaveClicked={setIsSaveClicked}
            setIsDeleteClicked={setIsDeleteClicked}
          />
          {isEditMode ? 
            <MenuOfAuthEditor 
              authId={activeAuthId} 
              isSaveClicked={isSaveClicked} 
              setIsSaveClicked={setIsSaveClicked} 
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              isDeleteClicked={isDeleteClicked}
              setIsDeleteClicked={setIsDeleteClicked}
              changeRefresh={changeRefresh}
              headers={headers}
            /> : activeAuthId ? 
              <MenuOfAuth authId={activeAuthId} headers={headers}/> : <div style={{ height: '100%' }} />
          }
        </StyledMenuTreeContainer>
        <StyledUserListContainer $visible={visible}>
          <UserListSection authId={activeAuthId} headers={headers}/>
        </StyledUserListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 80%;
  gap: 30px;
`;
const StyledAuthGroupContainer = styled.div`
  height: 100%;
`;

const StyledMenuTreeContainer = styled.div`
  flex: 1;
  min-width: 400px;
  margin-top: 1.2rem;
  height: 90%;
  overflow-y: auto;
  visibility: ${props =>   props.$visible ? 'visible' : 'hidden'};
  
`;

const StyledUserListContainer = styled.div`
  width: 400px;
  height: 100%;
  margin-top: 1.2rem;
  margin-right: 1.2rem;
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
`