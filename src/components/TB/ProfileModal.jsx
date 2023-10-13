import { AiOutlinePoweroff } from 'react-icons/ai';
import styled from 'styled-components';

import { logOut } from '../../api/login';

import PosiList from './PosiList';
import { useEffect, useState } from 'react';
import { getProfilePage } from '../../api/modal';

export default function ProfileModal({ profile, empId, setProfileModal }) {
  const user = profile.find(prf => prf['empId'] === empId);
  const [page, setPage] = useState({ pageNumber: 1, pageSize:3, totalElements: 1, totalPages: 1 });
  const [emp, setEmp] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.setItem("empId", "0");
        localStorage.setItem("compId", "0");
        localStorage.setItem("isLogin", false);
        window.location.href = '/login';
      })
      .catch(error => {
        console.error("로그아웃 중 오류 발생:", error);
      });
  };
  
  const modalOff = () => {
    setProfileModal(false);
  };

  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getProfilePage(page.pageNumber).then((res) => {
      setEmp(res.data.data);
      setPage(res.data.pageInfo);
    });
  }, [page.pageNumber]);

  if (user) {
    return (
      <ModalBackdrop onClick={() => {setProfileModal(false)}}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <Profile>  
            <img src={user['imageUrl']} alt='p_img' />
            <div className='prf'>
              <div id="prf_name">{user['empName']}</div>
              <div>{user['compName']} / {user['deptName']}</div>
              <p>최근접속 : {user['lastAccess']}</p>
              <p>현재접속 : {currentTime.toLocaleString().replace('. ', '-').replace('. ', '-').replace('. ', '-').replace('-오후', '')}</p>
            </div>
            <div onClick={handleLogOut}>
              <AiOutlinePoweroff />
            </div>
          </Profile>

          <div id='tableName'>
            <div> • 회사정보</div>
            <Page>
              {
                emp.map((a, i) => (
                  <Idx className={`${page.pageNumber === (i+1) ? 'true' : 'false'}`}
                  onClick={() => {setPage({ ...page, pageNumber: (i+1)})}} key={`page${i}`} />
                ))
              }
            </Page>            
            </div>
          <PosiList empId={user['empId']} modalOff={modalOff} profile={emp}/>
        </ModalView>
      </ModalBackdrop>
    );
  } else {
    console.log('사용자 정보가 일치하지 않습니다.');
  }
};

export const ModalBackdrop = styled.div`
  z-index: 3; 
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
background-image: url('/img/page/profile_bgi.png');
display: block;
position: absolute;
z-index: 2;
top: 80px;
right: 100px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 500px;
height: 400px;
color: black;
background-color: #ffffff;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.3),
            1px 1px 3px 0px rgba(0,0,0,.3);
            outline: none;

> #tableName {
  padding: 0 30px 0 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
`;
const Profile = styled.div`
padding: 20px;
display: flex;
justify-content: center;
width: 100%;
> img {
  margin: 10px 10px 10px 20px;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
}
> .prf {
  width: 300px;
  padding: 5px;
  color: white;
  > #prf_name {
    padding: 10px 0 5px 10px;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
  }
  > div {
    padding: 0 0 10px 10px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
    }
  > p {
    padding-left: 10px;
    color: #2d2929;
    font-size: 12px;
    margin: 0;
  }  
}
> div > svg {
  color: white;
  width: 20px;
  height: 20px;
  margin: 0 0 0 5px;
}
`;
const Page = styled.div`
width: 150px;
height: 20px;
display: flex;
justify-content: end;
`;
const Idx = styled.div`
cursor: pointer;
position: relative;
width: 10px;
height: 10px;
margin: 5px;
background-color: #89d3f5;
border-radius: 100%;
transition: all 0.3s ease;
&.true {
  width: 16px;
  height: 16px;
  margin: 2px;
  background-color: #318dfc;
  transition: all 0.3s ease;
}
`;