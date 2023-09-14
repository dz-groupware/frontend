import React, { useEffect, useState } from 'react'
import styled  from 'styled-components';
import Line from '../Commons/Line';
import MenuOfAuthEditor from './Menu/MenuOfAuthEditor';
import UserListSection from './UserList/UserListSection';
import MenuTreeTop from './Menu/MenuTreeTop';
import AuthGroupSection from './AuthGroup/AuthGroupSection';

export default function RoleSettingMain() {
  //여기서 Company누를 때 일어나는 상황 정하기
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    console.log("RoleSettingMain컴포넌트의 activeAuthId" , activeAuthId);
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
            setActiveAuthId={setActiveAuthId} 
            activeAuthId={activeAuthId}
          />
        </StyledAuthGroupContainer>
        <StyledMenuTreeContainer $visible={visible} >
          <MenuTreeTop />
          <Line color="black"/>
          {/* {activeAuthId ? <AuthMappedMenu authId={activeAuthId}/> : <div style={{ height: '100%' }} />} */}
          {activeAuthId ? <MenuOfAuthEditor authId={activeAuthId}/> : <div style={{ height: '100%' }} />}
        </StyledMenuTreeContainer>
        <StyledUserListContainer $visible={visible}>
          <UserListSection authId={activeAuthId}/>
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
