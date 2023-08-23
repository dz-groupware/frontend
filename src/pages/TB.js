import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineBell, AiOutlineMore, AiOutlineDeploymentUnit } from "react-icons/ai";

import {profile, search, alert, org, set} from '../utils/Slice';

import Profile from '../components/TB/Profile'
import FavorList from '../components/TB/FavorList'

import ProfileModal from '../components/TB/ProfileModal';
import SearchModal from '../components/TB/SearchModal';
import AlertModal from '../components/TB/AlertModal';
import OrgModal from '../components/TB/OrgModal';
import SetModal from '../components/TB/SetModal';

export const StyledTB = styled.div`
display: flex;
position: relative;
color: white;
height:100%;
width:100%;

> #logo {
  margin-left: 10px;
}

> .favorDiv {
  display: flex;
  width: 600px;
}

> Profile {
  display: flex;
  width:200px;
}

> #prf {
  width: 250px;
}
> .iconDiv {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}
`
export const IconDiv = styled.div`
padding-top: 30px;
width:180px;
position: relative;
right:0px;
> * {
  width:30px;
  height:30px;
  margin:5px;
}
`

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
    <StyledTB>
      <div id='logo'>
        <Link to='/'>
        <h1>Amaranth10</h1>
        </Link>
      </div>

      <div className='favorDiv'>
        <FavorList/>
      </div>

      <div id='prf' onClick={() => {ModalSwitch('profile')}}>        
        <Profile />
        {profileOpen && <ProfileModal api={ModalSwitch}/>}
      </div>

      <IconDiv >
        <AiOutlineSearch onClick={() => {ModalSwitch('search')}}/>
        <AiOutlineBell onClick={() => {ModalSwitch('alert')}}/>
        <AiOutlineDeploymentUnit onClick={() => {ModalSwitch('org')}}/>
        <AiOutlineMore onClick={() => {ModalSwitch('set')}}/>
      </IconDiv>
      {searchOpen && <SearchModal api={ModalSwitch} />}
      {alertOpen && <AlertModal api={ModalSwitch}/>}
      {orgOpen && <OrgModal api={ModalSwitch}/>}
      {setOpen && <SetModal api={ModalSwitch}/>}
    </StyledTB>
  );
}