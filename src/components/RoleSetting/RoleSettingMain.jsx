import React, { useEffect, useState } from 'react'
import AuthGroupSection from './AuthGroupSection';
import MenuTreeTop from './MenuTreeTop';
import UserListContainer from './UserListSection';
import styled  from 'styled-components';
import MenuTreeMain from './MenuTreeMain';
import SelectedAuthMenu from './SelectedAuthMenu';
import Line from '../Commons/Line';
import UserListSection from './UserListSection';

export default function RoleSettingMain() {
  //여기서 Company누를 때 일어나는 상황 정하기
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [visible, setVisible] = useState(false);
  const companyId = 1;
  useEffect(() => {
    if (activeAuthId !== null) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [activeAuthId]);
  //companyId는 리덕스로
  return (
    <Container>
        <StyledAuthGroupContainer>
          <AuthGroupSection 
            companyId={companyId}
            setActiveAuthId={setActiveAuthId} 
            activeAuthId={activeAuthId}
          />
        </StyledAuthGroupContainer>
        <StyledMenuTreeContainer visible={visible}>
          <MenuTreeTop />
          <Line color="black"/>
          <h2> 메뉴명 </h2>
          {activeAuthId ? <SelectedAuthMenu companyId={companyId} activeAuthId={activeAuthId}/> : <MenuTreeMain companyId={companyId}/>}
        </StyledMenuTreeContainer>
        <StyledUserListContainer visible={visible}>
          <UserListSection activeAuthId={activeAuthId}/>
        </StyledUserListContainer>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  height: 100%;
  gap: 30px;
`;
const StyledAuthGroupContainer = styled.div`
  width: 400px;
`;

const StyledMenuTreeContainer = styled.div`
  width: 800px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

const StyledUserListContainer = styled.div`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
`
