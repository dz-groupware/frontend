import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { AiOutlineDeploymentUnit } from "react-icons/ai";

import Recent from '../components/TB/Recent';
import Profile from '../components/TB/Profile';
import ProfileModal from '../components/TB/ProfileModal';
import OrgModal from '../components/TB/OrgModal';


export default function TB({ profile, empId, routeList }) {

  const [profileModal, setProfileModal] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(isMain, decodeURIComponent(location.pathname))
    if (!isMain && decodeURIComponent(location.pathname) === '/') {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [location]);

  return (
    <TBArea className={isMain ? 'true' : 'false'}>
      <Link to='/'>
        Amaranth2023
      </Link>
      <Recent routeList={routeList}/>
      <div>
        <ProfileArea id='prf' onClick={() => {setProfileModal(true)}}>        
          <Profile profile={profile} empId={empId}/>
          {profileModal && <ProfileModal profile={profile} empId={empId} profileModal={profileModal} setProfileModal={setProfileModal}/>}
        </ProfileArea>
        <IconArea>
          <AiOutlineDeploymentUnit onClick={() => {setOrgModal(true)}}/>
        </IconArea>
        {orgModal && <OrgModal empId={empId} setOrgModal={setOrgModal}/>}
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
  margin-top: 30px;
  color: rgb(45,49,62);
  font-size: xx-large;
  font-weight: bold;
}

> div {
  display: flex;
}

&.true {
  background-color: transparent;
}
&.false{
  background-color: white;
}
`;
const ProfileArea = styled.div`
display: flex;
width: 250px;
right: 50px;

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