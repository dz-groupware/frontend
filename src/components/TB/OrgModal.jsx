import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { AiOutlineSearch, AiOutlineTeam } from "react-icons/ai";
import {LuBuilding2} from 'react-icons/lu';

import {orgTreeApi, orgEmpListApi, searchOrg} from '../../utils/API';

import EmpList from './EmpList';

export default function OrgModal(props){
  
  const [data, setData] = useState(JSON.parse('[]'));
  const [empList, setEmpList] = useState(JSON.parse('[]'));
  const empId = useSelector(state => state.gnbMenu.empId);

  const [searchOption, setSearchOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  useEffect(() => {
    async function LoadData(emp_id){
      const res = await orgTreeApi('comp', "","",empId);
      setData(res.data);
    }
    LoadData(empId);
  }, [empId]);  

  async function loadEmpList(type, text){
    const res = await orgEmpListApi(type, text);
    setEmpList(res.data);
  }

  function EmpDetailHandler(detailData){
    setDetail(detailData);
    setDetailOpen(!detailOpen);
  }

  function searchHandler(){
    setData(JSON.parse('[]'));
    setEmpList(JSON.parse('[]'));
    searchOrg(searchOption, searchText).then(res => {
      if(searchOption === 'all'){
        if (res.data.data[0].data.length !== 0) {
          setData(res.data.data[0].data)
        }
        if (res.data.data[1].data.length !== 1) {
          setEmpList(res.data.data[1].data)
        }
      }
      if(searchOption === 'dept'){
        setData(res.data.data);
      }
      if(searchOption === 'emp'){
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
            <select value={searchOption} onChange={(e)=>{setSearchOption(e.target.value)}} ><option value='all'>전체</option><option value='dept'>부서명</option><option value='emp'>사원명</option></select>
            <input type="text" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
          </div>
          <AiOutlineSearch onClick={() => {searchHandler()}}/>
        </div>
        <div id='content' className="flex">
          <div id='deptList'>
          {
            data.map((a, i) => (
              <CompList comp={a} loadEmpList={loadEmpList} key={a['name']+a['id']}/>
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
  );
}

export function CompList(props) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleCompItem(compId) {
    if(subItem.length === 0) {
      orgTreeApi('Dept1', compId,"","").then(res => setSubItem(res.data));
    }
    setOpen(!open);
    props.loadEmpList('comp', props.comp['id']);
  }

  return (
    <Dept>
      <div className="title"  style={{display: 'flex', margin: '10px'}}>
        <div onClick={() => {handleCompItem(props.comp['id'])}}><LuBuilding2 />{props.comp['name']}</div>
        </div>
        {
          open && subItem.map((a, i) => (
            <DeptTree dept={a} compId={props.comp['id']} loadEmpList={props.loadEmpList} key={a['name']+a['id']}/>
          ))
        }
    </Dept>
  );
}

export function DeptTree(props) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleDeptItem(compId, deptId) {
    if(subItem.length === 0) {
      orgTreeApi('Dept2', compId, deptId,"").then(res => setSubItem(res.data));
      props.loadEmpList('dept', deptId )
    }
    setOpen(!open);
  }
  return (
    <Dept>
    <div style={{display: 'flex', margin: '10px', width:'100%', height:'20px'}}>
      <div onClick={() => {handleDeptItem(props.compId, props.dept['id'])}}><AiOutlineTeam />{props.dept['name']}</div>
    </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree dept={a} compId={props.compId} loadEmpList={props.loadEmpList} key={a['name']+a['id']}/>
        ))
      }
  </Dept>
  );
}

/*
export function Dept(props) {
  const [data, setData] = useState(['[{"id":"", "name":""}]']);
  const [dept, setDept] = useState([false]);

  useEffect(() => {
    async function LoadData(){
      const res = await orgTreeApi('Dept2', props.comp,props.dept,"");
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
  );
}
*/
export function EmpDetail(props) {
  return (
    <DetailEmp>
      <div>
        <img src={props.list['imageUrl']} alt='p_img'/>
        <p>{props.list['name']} / {props.list['position']}</p>
      </div>
      <table>
          <tbody>
            <tr>
              <td>소속부서</td><td>{props.list['nameTree']}</td>
            </tr>
            <tr>
              <td>전화번호</td><td>{props.list['number']}</td>
            </tr>
            <tr>
              <td>개인메일</td><td>{props.list['email']}</td>
            </tr>
          </tbody>
        </table>
    </DetailEmp>
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
  > tbody {
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
}

`;
export const Dept = styled.div`
margin-left: 15px;

`;