import styled from 'styled-components';

import {AiOutlineSearch, AiFillFolderOpen} from 'react-icons/ai';
import {LuBuilding2} from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {orgTreeApi, orgEmpListApi, searchOrg} from '../../utils/API';

import EmpList from './EmpList';

export default function OrgModal(props){
  
  const [data, setData] = useState(JSON.parse('[{"id":"", "name":""}]'));
  const [empList, setEmpList] = useState(JSON.parse('[{"id":"", "name":""}]'));
  const [open, setOpen] = useState(Array(data.length).fill(false));
  const emp_id = useSelector(state => state.gnbMenu.key);

  const [searchOption, setSearchOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  console.log('in orgModal', open)
  useEffect(() => {
    async function LoadData(emp_id){
      const res = await orgTreeApi('comp', "","",emp_id);
      console.log('in useEffect : ', res.data.data)
      setData(res.data.data);
    }
    LoadData(emp_id);
  }, [emp_id]);  

  async function loadEmpList(type, text){
    const res = await orgEmpListApi(type, text);
    setEmpList(res.data.data);
  }

  function EmpDetailHandler(detailData){
    console.log('in handler : ', detailData);
    setDetail(detailData);
    setDetailOpen(!detailOpen);
  }

  function searchHandler(){
    
    searchOrg(searchOption, searchText).then(res => {
      console.log(res.data.data);
      if(searchOption === 'dept'){
        console.log('type dept');
        setData(res.data.data);
      }
      if(searchOption === 'emp'){
        console.log('type emp');
        setEmpList(res.data.data);
      }
    });
  }

    return (
      <ModalBackdrop onClick={() => {props.api('org')}}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
        <div id="nav">
          <h3>조직도</h3>
          <div onClick={() => {props.api('org')}}>X</div>
        </div>
        <hr style={{width: '965px'}}/>
        <div>
          <div id='search'>
            <div>
              <select value={searchOption} onChange={(e)=>setSearchOption(e.target.value)} ><option value='all'>전체</option><option value='dept'>부서명</option><option value='emp'>사원명</option></select>
              <input type="text" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            </div>
            <AiOutlineSearch onClick={() => {searchHandler()}}/>
          </div>
          <div id='content' className="flex">
            <div id='deptList'>
            { false &&
              data.map((a, i) => (
                <div key={a['name']+a['id']}>
                  <div onClick={(i) => {}}><LuBuilding2 />{a['name']}</div>
                  <DeptList value={a['id']} api={loadEmpList}/>
                </div>
                ))
              }
              
            </div>
            
              <EmpList value={empList} api={EmpDetailHandler}/>
            
            <div id='empDetail'>
              {detailOpen && <EmpDetail list={detail}/>}
          </div>
        </div>
        </div>
      </OrgModalView>
    </ModalBackdrop>
  
    )
  }


  export function DeptList(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [deptOpen, setDeptOpen] = useState([false]);
    console.log('in deptList')
  
    useEffect(() => {
      async function LoadData(){
        const res = await orgTreeApi('Dept1', props.value,"","");
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData();
    }, [props.value]);
  
    return (
      <>
        {data.length > 0 && (
          data.map((a, i) => (
            <div key={a['name']+a['id']} >
              <div onClick={() => {
                setDeptOpen(deptOpen => {
                  const newDeptOpen = [...deptOpen];
                  newDeptOpen[i] = !newDeptOpen[i];
                  return newDeptOpen;
                });
                props.api('dept', a['id']);
                }} style={{marginLeft:'15px'}}><AiFillFolderOpen />{a['name']}
              </div>
              { deptOpen[i] && (
                  <Dept dept={a['id']} comp={props.value} api={props.api}/>
                )}
            </div>
          )))
        }
      </>
    )
  }
  
    
  export function Dept(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [dept, setDept] = useState([false]);
    console.log('in deptList')
  
    useEffect(() => {
      async function LoadData(){
        const res = await orgTreeApi('Dept2', props.comp,props.dept,"");
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData();
    }, [props]);
  
    return (
      <>
        {data.length > 0 && (
          data.map((a, i) => (
            <div key={a['name']+a['id']} >
              <div onClick={() => {
                setDept(deptOpen => {
                  const newDept = [...dept];
                  newDept[i] = !newDept[i];
                  return newDept;
                });
                props.api('dept', a['id']);
                }} style={{marginLeft:'35px'}}><AiFillFolderOpen />{a['name']}
              </div>
              { dept[i] && (
                  <Dept dept={a['id']} comp={props.comp}/>
                )}
            </div>
          )))
        }
      </>
    )
  }
  

export function EmpDetail(props) {
  console.log('emp detail : ', props.list)
  return (
    <DetailEmp>
      <div>
        <img src={props.list['imageUrl']} alt='p_img'/>
        <p>{props.list['name']} / {props.list['position']}</p>
      </div>
      <table>
        <tr>
          <td>소속부서</td><td>{props.list['nameTree']}</td>
        </tr>
        <tr>
          <td>전화번호</td><td>{props.list['number']}</td>
        </tr>
        <tr>
          <td>개인메일</td><td>{props.list['email']}</td>
        </tr>
      </table>
    </DetailEmp>
  )
}

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: ; //위치지정 요소
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
    justify-content: space-between;
    width: 100%;
    > * {
      margin: 20px;
      margin-bottom: 0px;
    }
  }

  > div > span {
    position : right;
  }
  

  > div > #search {
    display: flex;
    justify-content: space-between;
    width: 99%;
    border: 1px solid gray;  
    height: 40px;

    > div {
      > select {
        width: 100px;
        height: 25px;
        margin: 5px;
      }
  
      > input {
        height: 20px;
        width: 600px;
        margin: 5px;
      }
    }

    > svg {
      width: 17px;
      height: 17px;
      border: 1px solid gray;
      border-radius: 5px;
      margin: 5px;
      padding: 5px;
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

    > #empDetail {
      margin-top : 5px;
      width: 250px;
      height: 100%;
      border : 1px gray solid;
    }
  }
`;
export const DetailEmp = styled.div`

> div {
  margin: 10px;
  text-align: center;
  background-color:rgb(240, 245, 248);
  border: 1px solid rgb(192, 185, 237);
  border-radius: 5px;
  > img {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    border-radius: 100%;
  }

  > p {
    margin: 10px;
    font-weight: bold;
    font-size: large;
  }

}
> table {
  margin: 10px;
  border-collapse: collapse;
  border-top: 3px solid black;

  > tr :nth-child(1) {
    margin: 5px;
    background-color: rgb(240, 245, 248);
    border-bottom: 1px solid rgb(192, 185, 237);
  }

  > tr :nth-child(2) {
    border-bottom: 1px solid rgb(192, 185, 237);
  }
}

`