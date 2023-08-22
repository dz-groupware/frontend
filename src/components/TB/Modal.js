import styled from 'styled-components';

import PosiList from './PosiList'

import {AiOutlineSearch, AiFillFolderOpen} from 'react-icons/ai';
import {LuBuilding2} from 'react-icons/lu';

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

export const OrgModalView = styled.div`  
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:0px;
  right:0px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 1000px;
  height: 550px;
  color: black;
  background-color: #ffffff;

  > #nav {
    display: flex;
    justify-content: space-around;
  }

  > div > span {
    position : right;
  }
  

  > div > #search {
    width: 100%;
    border: 1px solid gray;  
    height: 40px;

    > select {
      width: 100px;
      height: 20px;
      margin: 5px;
      margin-right: 0px;
      > option {
        height: 20px;
      }
    }

    > input {
      height: 20px;
      width: 600px;
      margin: 5px;
      margin-right: 200px;
    }
}

  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;

    > #deptList {
      margin-top : 5px;
      width: 250px;
      height: 100%;
      border : 1px gray solid;
    }

    > #empList {
      background-color: gray;
      width: 450px;
      height: 100%;
      margin: 5px;
      border : 1px gray solid;
      > ::-webkit-scrollbar {
        background-color: gray;
      }
      >  ::-webkit-scrollbar-thumb {
        background-color: white;
        border_radius: 10px;

        }
      
    }

    > #empDetail {
      margin-top : 5px;
      width: 250px;
      height: 100%;
      border : 1px gray solid;
    }
  }
`;

export function ProfileModal(props) {
  const dummyProfile = JSON.parse('{"p_img":"사원1", "emp_name":"사원1", "comp_name":"회사A", "dept_name":"부서B"}')

  return (
    <ModalBackdrop onClick={() => {props.setOpen([false, false, false, false, false])}}>
      <ModalView onClick={(e) => e.stopPropagation()}>
      <br />
      <div>
        <img src={'/img/'+dummyProfile['p_img']+'.png'} alt='p_img' />
        <div>
          <div id="profile_name">{dummyProfile['emp_name']}</div>
            <div>{dummyProfile['comp_name']} || {dummyProfile['dept_name']}</div>
            <p>최근접속: 2023-07-12-22:30 | 1.254.217.5(현재: 1.254.217.5)</p>
          </div>
        </div>
        <div id='tableName'><div> • 회사정보</div></div>
        <PosiList />
        <br />
        <div id='modal_btn'>
          <ExitBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>취소</ExitBtn>
          <DoneBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>확인</DoneBtn>
        </div>
      </ModalView>
    </ModalBackdrop>
  )
}

export function SearchModal(props){
  
  return (
    <ModalBackdrop onClick={() => {props.setOpen([false, false, false, false, false])}}>
    <ModalView onClick={(e) => e.stopPropagation()}>
      <br />
      <div>
        <h2>검색</h2>
        <input />
        <br />
        <hr />
        <ExitBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>취소</ExitBtn>
        <DoneBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>확인</DoneBtn>
      </div>
    </ModalView>
  </ModalBackdrop>

  )
}

export function AlertModal(props){
  
  return (
    <ModalBackdrop onClick={() => {props.setOpen([false, false, false, false, false])}}>
    <ModalView onClick={(e) => e.stopPropagation()}>
      <br />
      <div>
        <h2>알림창</h2>
        <ExitBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>취소</ExitBtn>
        <DoneBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>확인</DoneBtn>
      </div>
    </ModalView>
  </ModalBackdrop>
  )
}

const EmpItem=styled.div`
display: flex;
border : 1px solid black;
margin: 5px;
background-color: white;

> div > img {
    margin: 20px;
    width: 50px;
    heigth: 50px;
}
> div {
    > # title {
        font-weight: border;
    }

    > span {
    color: gray;
}
`

export function OrgModal(props){
  const dummyData = JSON.parse('[{"id":"0", "dept_name":"부서0", "child":[{"id":"1", "dept_name":"부서1", "child":[{"id":"2", "dept_name":"부서1-1", "child":[]}, {"id":"3", "dept_name":"부서1-2", "child":[]}]}, {"id":"4", "dept_name":"부서2", "child":[{"id":"5", "dept_name":"부서2-2", "child":[]}]}]}]')

  return (
    <ModalBackdrop onClick={() => {props.setOpen([false, false, false, false, false])}}>
    <OrgModalView onClick={(e) => e.stopPropagation()}>
      <br />
      <div id="nav">
        <div>조직도</div>
        <div onClick={() => {props.setOpen([false, false, false, false, false])}}>X</div>
      </div>
      <hr style={{width: '965px'}}/>
      <div>
        <div id='search'>
          <select ><option value='all'>전체</option><option value='dept'>부서명</option><option value='emp'>사원명</option></select>
          <input type="text" placeholder="검색" />
          <AiOutlineSearch />
        </div>
        <div id='content' className="flex">
          <div id='deptList'>
          <div><LuBuilding2 /></div>
            { (
              dummyData.map((a, i) => (
                <div style={{marginLeft:'15px'}}>
                  <div value={a['id']}>
                    <AiFillFolderOpen/>{a['dept_name']}
                      {  (
                        <DeptList value={a['child']}/>
                      )}
                  </div>
                </div>
          ) )) }
          </div>
          <div id='empList'>
            <EmpList/>
          </div>
          <div id='empDetail'>
            { (
                <EmpDetail/>
              )
            }
        </div>
      </div>
      </div>
    </OrgModalView>
  </ModalBackdrop>
  )
}
export function SetModal(props){
  
  return (
    <ModalBackdrop onClick={() => {props.setOpen([false, false, false, false, false])}}>
    <ModalView onClick={(e) => e.stopPropagation()}>
      <br />
      <div>
        <h2>설정</h2>
        <ExitBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>취소</ExitBtn>
        <DoneBtn onClick={() => {props.setOpen([false, false, false, false, false])}}>확인</DoneBtn>
      </div>
    </ModalView>
  </ModalBackdrop>
  )
}


export function Dept(props){
  return (
    <>
     {
        props.value && props.value.length > 0 && (
        props.value.map((a, i) => (
          <div style={{marginLeft:'15px'}}>
            <div value={a['id']} ><AiFillFolderOpen />{a['dept_name']}</div>
              { (
              <Dept value={a['child']}/>
              )}
          </div>
        )))
    }
    </>
    )
}


export function DeptList(props) {
  return (
      <Dept value={props.value}/>
  )
}


export function EmpList(){
  const dummyData = JSON.parse('[{"p_img":"사원1", "emp_name":"회사A", "login_id":"dztmpid123@test.com", "tree_path":"회사A/부서B", "mobile_number":"010-1122-3344"}]')

  return (
      <div style={{overflow: "scroll", height: "95%" }}>
      {
          dummyData.map ((a, i) => (
              <EmpItem >
                  <div>
                      <img src={'/img/'+a['p_img']+'.png'} alt='p_img' />
                  </div>
                  <div>
                      <div id='title'>
                          {a['emp_name']} / {a['login_id']}
                      </div>
                      <div>{a['tree_path']}</div>
                      <span>{a['mobile_number']}</span>
                  </div>
              </EmpItem>
          ))

      }
      </div>
  )
}

export function EmpDetail() {
  const dummyData = JSON.parse('[{"p_img":"사원1", "emp_name":"회사A", "login_id":"dztmpid123@test.com", "tree_path":"회사A/부서B", "mobile_number":"010-1122-3344"}]')
  return (
      <div>
          <div>
              <img src={'/img/'+dummyData[0]['p_img']+'.png'} alt='p_img'  style={{width:'50px', height:'50px'}}/>
              <hr />
          </div>
          <table>
              <tr>
                  <td style={{backgroundColor:'grey'}}>전화번호</td><td>{dummyData[0]['mobile_number']}</td>
              </tr>
          </table>
      </div>
  )
}