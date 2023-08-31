import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineBell, AiOutlineMore, AiOutlineDeploymentUnit } from "react-icons/ai";

import {profile, search, alert, org, set} from '../utils/Slice';

import Profile from '../components/TB/Profile';
import ProfileModal from '../components/TB/ProfileModal';
import OrgModal from '../components/TB/OrgModal';
import { SearchModal, AlertModal, SetModal } from '../components/TB/Modal';


export default function TB() {
  const dispatch = useDispatch();
  const profileOpen = useSelector(state => state.modalSwitch.profile);
  const searchOpen = useSelector(state => state.modalSwitch.search);
  const alertOpen = useSelector(state => state.modalSwitch.alert);
  const orgOpen = useSelector(state => state.modalSwitch.org);
  const setOpen = useSelector(state => state.modalSwitch.set);
  
  // modal을 키고 끄는 메서드
  function ModalSwitch(type){
    if(type === 'profile'){
      dispatch(profile());
    }
    if(type === 'search'){
      dispatch(search());
    }
    if(type === 'alert'){
      dispatch(alert());
    }
    if(type === 'org'){
      dispatch(org());
    }
    if(type === 'set'){
      dispatch(set());
    }
  }
  
  return (
    <TBArea>
      <div id='logo'>
        <Link to='/'>
        <h1>Amaranth10</h1>
        </Link>
      </div>

      <div>
        <div id='prf' onClick={() => {ModalSwitch('profile');}}>        
          <Profile />
          {profileOpen && <ProfileModal api={ModalSwitch}/>}
        </div>

        <IconArea>
          <AiOutlineSearch onClick={() => {ModalSwitch('search');}}/>
          <AiOutlineBell onClick={() => {ModalSwitch('alert');}}/>
          <AiOutlineDeploymentUnit onClick={() => {ModalSwitch('org');}}/>
          <AiOutlineMore onClick={() => {ModalSwitch('set');}}/>
        </IconArea>
        {searchOpen && <SearchModal api={ModalSwitch} />}
        {alertOpen && <AlertModal api={ModalSwitch}/>}
        {orgOpen && <OrgModal api={ModalSwitch}/>}
        {setOpen && <SetModal api={ModalSwitch}/>}
      </div>
    </TBArea>
  );
}

export const TBArea = styled.div`
display: flex;
justify-content: space-between;
position: relative;
color: white;
height:100%;
width:100%;

> #logo {
  margin-left: 20px;
  > a {
    text-decoration: none; 
    > h1 {
      color: rgb(45,49,62);
    }
  }
}

> div {
  display: flex;
  > Profile {
    position:relative;
    display: flex;
    width:200px;
  }
  
  > #prf {
    di
    width: 250px;
  }
 
}
`;
export const IconArea = styled.div`
padding-top: 30px;
width:180px;
position: relative;
right:50px;
> * {
  width:30px;
  height:30px;
  margin:5px;
}
`;