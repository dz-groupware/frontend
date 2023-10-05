import { AiOutlinePoweroff } from 'react-icons/ai';
import styled from 'styled-components';

import { logOut } from '../../api/login';
import { UnAuthorized } from '../../common/Error/Error';

import PosiList from './PosiList';
import { ModalBackdrop, ModalView } from '../../common/Modal/Modal';

export default function ProfileModal({ profile, setProfileModal }) {

  const empId = localStorage.getItem("empId");
  const user = profile.find(prf => prf['empId']+"" === empId);

  const handleLogOut = () => {
    logOut();
    localStorage.setItem("empId", 0);
    localStorage.setItem("compId", 0);
    console.log('done')
    window.location.href = '/login';
  };

  const modalOff = () => {
    setProfileModal(false);
  };

  if (user) {
    return (
      <ModalBackdrop onClick={modalOff}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <Btn className='top_btn'>
            <div onClick={handleLogOut}>
              <AiOutlinePoweroff />
            </div>
          </Btn>
          <ProfileArea>  
            <img src={user['imageUrl']} alt='p_img' />
            <div className='prf'>
              <div id="prf_name">{user['empName']}</div>
              <div>{user['compName']} / {user['deptName']}</div>
              <p>최근접속 : {user['lastAccess']} || {user['lastIp']}(현재: {user['lastIp']})</p>
            </div>
          </ProfileArea>
          <TableName><div> • 회사정보</div></TableName>
          <PosiList empId={user['empId']} modalOff={modalOff} profile={profile}/>
        </ModalView>
      </ModalBackdrop>
    );
  } else {
    console.log('사용자 정보가 일치하지 않습니다.');
    UnAuthorized();
  }
};

const Btn = styled.div`
display: flex;
justify-content: end;
padding: 20px;
padding-bottom: 0px;
> svg {
  width: 20px;
  height: 20px;
}
`;
const ProfileArea = styled.div`

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
`;
const TableName = styled.div`
width: 100%;
display: flex;
justify-content: start;
font-weight: bold;
`;