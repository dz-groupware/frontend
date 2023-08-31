import styled from 'styled-components';
import { useSelector } from 'react-redux';

import PosiList from './PosiList';

export default function ProfileModal(props) {
  const data = useSelector(state => state.gnbMenu.profileList)[0];

  return(
    <ModalBackdrop onClick={() => {props.api('profile');}}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <br />
        <div>
          <img src={data['imageUrl']} alt='p_img' />
          <div>
            <div id="profile_name">{data['name']} / {data['loginId']}</div>
            <div>{data['nameTree']}</div>
            <p>접속 IP : {data['lastIp']}(현재: {data['lastIp']})</p>
          </div>
        </div>
        <div id='tableName'><div> • 회사정보</div></div>
        <PosiList />
        <br />
        <div id='modal_btn'>
          <ExitBtn onClick={() => {props.api('profile');}}>취소</ExitBtn>
          <DoneBtn onClick={() => {props.api('profile');}}>확인</DoneBtn>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
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
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:-150px;
  right:-200px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 500px;
  heigth: 200px;
  color: black;
  background-color: #ffffff;
  z-index:2;
  > div {
    display: flex;

    > img {
      width:60px;
      height:60px;
      margin: 20px;
    }

    > div {
      width: 350px;

      > #profile_name {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
      }

      > p {
        color: grey;
        font-size: 12px;
        margin: 0;
      }
    }

    > PosiList {
      width: 450px;
    }
  }

  >#modal_btn {
    display: flex;
    justify-content: center;
    width: 90%;
    background-color: rgb(230,230,250);
    margin-bottom: 10px;
  }

  > #tableName {
    width: 85%;
    align-items: left;
    font-weight: bold;
  }

`;
export const ModalBtn = styled.button`
  display : flex;
  justify-content : center;
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: grab;
  width:100px;
`;
export const DoneBtn = styled(ModalBtn) `
background-color : rgb(21,21,72);
color: white;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 100px;
height: 40px;
align-items : center;
`;
export const ExitBtn = styled(ModalBtn) `
background-color : white;
color: black;
border-radius: 10px;
text-decoration: none;
margin: 10px;
padding: 5px 10px;
width: 100px;
height: 40px;
align-items : center;
`;