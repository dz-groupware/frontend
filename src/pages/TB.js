import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Profile from '../components/TB/Profile'
import FavorList from '../components/TB/FavorList'
import {ProfileModal, SearchModal, AlertModal, OrgModal, SetModal} from '../components/TB/Modal';

import { AiOutlineSearch, AiOutlineBell, AiOutlineMore, AiOutlineDeploymentUnit } from "react-icons/ai";
import { useState } from 'react';

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
  const [open, setOpen] = useState([false, false, false, false, false]);

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

      <div id='prf' onClick={() => {setOpen([true, false, false, false, false])}}>        
        <Profile />
        {open[0] && <ProfileModal open={open} setOpen={setOpen}/>}
      </div>

      <IconDiv >
        <AiOutlineSearch onClick={() => {console.log('click');setOpen([false, true, false, false, false])}}/>
        <AiOutlineBell onClick={() => {console.log('click');setOpen([false, false, true, false, false])}}/>
        <AiOutlineDeploymentUnit onClick={() => {console.log('click');setOpen([false, false, false, true, false])}}/>
        <AiOutlineMore onClick={() => {console.log('click');setOpen([false, false, false, false, true])}}/>
      </IconDiv>
      {open[1] && <SearchModal  open={open} setOpen={setOpen}/>}
      {open[2] && <AlertModal  open={open} setOpen={setOpen}/>}
      {open[3] && <OrgModal open={open} setOpen={setOpen} />}
      {open[4] && <SetModal  open={open} setOpen={setOpen}/>}
    </StyledTB>
  );
}