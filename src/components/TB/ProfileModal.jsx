import styled from 'styled-components';
//import { useNavigate } from 'react-router';

import { AiOutlinePoweroff } from 'react-icons/ai';

import PosiList from './PosiList';
import { logOut } from '../../api/login';

export default function ProfileModal({ profile, empId, setProfileModal }) {
//  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    localStorage.setItem("empId", 0);
    localStorage.setItem("compId", 0);
    console.log('done')
    window.location.href = '/login';
  }

  const modalOff = () => {
    setProfileModal(false);
  }

  for (let prf of profile) {
    if (prf['empId']+"" === empId) {
      return (
        <ModalBackdrop onClick={modalOff}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <div className='top_btn'>
              <div onClick={handleLogOut}>
                <AiOutlinePoweroff />
              </div>
            </div>
            <div>  
            <img src={prf['imageUrl']} alt='p_img' />
            <div className='prf'>
              <div id="prf_name">{prf['empName']}</div>
              <div>{prf['compName']} / {prf['deptName']}</div>
              <p>최근접속 : {prf['lastAccess']} || {prf['lastIp']}(현재: {prf['lastIp']})</p>
            </div>
          </div>
            <div id='tableName'><div> • 회사정보</div></div>
            <PosiList empId={prf['empId']} modalOff={modalOff} profile={profile}/>
          </ModalView>
        </ModalBackdrop>
      );
    }
  }
}

export const ModalBackdrop = styled.div`
  z-index: 1; 
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  width:100%;
  height:100%;
`;
export const ModalView = styled.div`
display: flex;
position: relative;
z-index: 2;
top:-100px;
right:-200px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 600px;
height: 400px;
color: black;
background-color: #ffffff;

> .top_btn {
  display: flex;
  justify-content: end;
  padding: 20px;
  padding-bottom: 0px;
  
  > svg {
    width: 20px;
    height: 20px;
  }
}
> div {
  padding: 20px;
  padding-top: 0px;
  display: flex;
  justify-content: center;
  width: 100%;

  > img {
    width:70px;
    height:70px;
    margin-right: 20px;
  }
  > .prf {
      > * {
        margin: 5px;
      }
      > #prf_name {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
      }
    }
  > p {
    color: grey;
    font-size: 12px;
    margin: 0;
  }
}



> #tableName {
  width: 100%;
  display: flex;
  justify-content: start;
  font-weight: bold;
}

`;