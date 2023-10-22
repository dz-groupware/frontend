import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

import Recent from "../components/TB/Recent";
import Profile from "../components/TB/Profile";
import ProfileModal from "../components/TB/ProfileModal";
import OrgModal from "../components/TB/OrgModal";

export default function TB({ profile, empId, routeList }) {
  const [profileModal, setProfileModal] = useState(false);
  const [orgModal, setOrgModal] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if ( !isMain && decodeURIComponent(location.pathname) === "/home" ) {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [location]);

  return (
    <Content className={ isMain ? "true" : "false" }>
      <Logo onClick={() => {window.location.href="/home"}}>
        <Link to="/home">
        Amaranth2023
        </Link>
      </Logo>
      <Recent routeList={routeList}/>
      <ModalArea>
        <ProfileArea id="prf" onClick={() => {setProfileModal(true)}}>        
          <Profile profile={profile} />
          {profileModal && <ProfileModal profile={profile} profileModal={profileModal} setProfileModal={setProfileModal}/>}
        </ProfileArea>
        <IconArea>
          <AiOutlineDeploymentUnit onClick={() => {setOrgModal(true)}}/>
        </IconArea>
        {orgModal && <OrgModal empId={empId} setOrgModal={setOrgModal}/>}
      </ModalArea>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: white;
  color: rgb(66,71,84);
  width:100%;
  height: 62px; 
  z-index: 2;

  &.true {
    background-color: transparent;
  }
  &.false{
    background-color: white;
  }
`;
const Logo = styled.div` 
  margin: 20px 0 0 20px;
  > a{
    text-decoration: none; 
    color: #1d2437;
    font-size: xx-large;
    font-weight: bold;
  }
`;
const ModalArea = styled.div`
  display: flex;
`;
const ProfileArea = styled.div`
  display: flex;
  width: 280px;
  right: 50px;
`;
const IconArea = styled.div`
  padding-top: 10px;
  width:55px;
  position: relative;
  right:50px;
  color: #1d2437;
  > * {
    width: 35px;
    height: 35px;
    margin: 5px;
    text-shadow: 1px 1px 1px rgba(255,255,255,0.7),
                  -1px -1px 1px rgba(255,255,255,0.7);
  }
`;