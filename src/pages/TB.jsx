import { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineDeploymentUnit } from "react-icons/ai";

import Recent from '../components/TB/Recent';
import Profile from '../components/TB/Profile';
import ProfileModal from '../components/TB/ProfileModal';
import OrgModal from '../components/TB/OrgModal';


export default function TB({ profile }) {

  const [profileModal, setProfileModal] = useState(false);
  const [orgModal, setOrgModal] = useState(false);

  return (
    <TBArea>
      <Link to='/'>
        Amaranth10
      </Link>
      <Recent />
      <div>
        <ProfileArea id='prf' onClick={() => {setProfileModal(true)}}>        
          <Profile profile={profile}/>
          {profileModal && <ProfileModal profile={profile} profileModal={profileModal} setProfileModal={setProfileModal}/>}
        </ProfileArea>
        <IconArea>
          <AiOutlineDeploymentUnit onClick={() => {setOrgModal(true)}}/>
        </IconArea>
        {orgModal && <OrgModal setOrgModal={setOrgModal}/>}
      </div>
    </TBArea>
  );
}

const TBArea = styled.div`
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
const IconArea = styled.div`
padding-top: 10px;
width:60px;
position: relative;
right:50px;
color: rgb(7, 10, 69);
> * {
  width:35px;
  height:35px;
  margin:10px;
}
`;