import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineBell, AiOutlineMore, AiOutlineDeploymentUnit } from "react-icons/ai";

import Profile from '../components/TB/Profile';
import ProfileModal from '../components/TB/ProfileModal';
import OrgModal from '../components/TB/OrgModal';
import { SearchModal, AlertModal, SetModal } from '../components/TB/Modal';
import { useState } from 'react';


export default function TB({ profile, empId }) {

  const [profileModal, setProfileModal] = useState(false);
  const [searchModal , setSearchModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [setModal, setSetModal] = useState(false);

  return (
    <TBArea>
        <Link to='/'>
          Amaranth10
        </Link>

      <div>
        <ProfileArea id='prf' onClick={() => {setProfileModal(true)}}>        
          <Profile profile={profile} empId={empId}/>
          {profileModal && <ProfileModal profile={profile} empId={empId} profileModal={profileModal} setProfileModal={setProfileModal}/>}
        </ProfileArea>

        <IconArea>
          <AiOutlineSearch onClick={() => {setSearchModal(true)}}/>
          <AiOutlineBell onClick={() => {setAlertModal(true)}}/>
          <AiOutlineDeploymentUnit onClick={() => {setOrgModal(true)}}/>
          <AiOutlineMore onClick={() => {setSetModal(true)}}/>
        </IconArea>
        {searchModal && <SearchModal setSearchModal={setSearchModal} />}
        {alertModal && <AlertModal setAlertModal={setAlertModal}/>}
        {orgModal && <OrgModal setOrgModal={setOrgModal}/>}
        {setModal && <SetModal setSetModal={setSetModal}/>}
      </div>
    </TBArea>
  );
}


export const TBArea = styled.div`
display: flex;
justify-content: space-between;
position: relative;
background-color: white;
color: rgb(66,71,84);
width:100%;
height:80px; 
z-index: 2;
 
> a {
  text-decoration: none; 
  margin-left: 20px;
  margin-top: 20px;
  color: rgb(45,49,62);
  font-size: xx-large;
  font-weight: bold;
}

> div {
  display: flex;
}
`;
const ProfileArea = styled.div`
display: flex;
width: 250px;
`;
export const IconArea = styled.div`
padding-top: 10px;
width:220px;
position: relative;
right:50px;
color: rgb(7, 10, 69);
> * {
  width:35px;
  height:35px;
  margin:10px;
}
`;