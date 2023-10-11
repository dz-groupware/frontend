import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

import {orgTreeApi, orgEmpListApi, searchOrg} from '../../api/modal';

import EmpList from './OrgModal/EmpList';
import EmpDetail from './OrgModal/EmpDetail';

export default function OrgModal({ setOrgModal, empId }){

  const [data, setData] = useState(JSON.parse('[]'));
  const [empList, setEmpList] = useState(JSON.parse('[]'));

  const [searchOption, setSearchOption] = useState("all", "");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  const [clickedComp, setClickedComp] = useState('');
  const [clickedDept, setClickedDept] = useState('');
  const [clickedEmp, setClickedEmp] = useState('');
  console.log(clickedComp, clickedEmp);

  useEffect(() => {
    async function LoadData(){
      const res = await orgTreeApi('basic', "","");
      if (Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    }
    LoadData();
  }, []);  

  async function loadEmpList(type, compId, deptId){
    const res = await orgEmpListApi(type, compId, deptId);
    if (Array.isArray(res.data.data)) {
      setEmpList(res.data.data);
    }
  }

  function EmpDetailHandler(detailData){
    if(detail === detailData){
      setDetailOpen(false);
    } else {
      setDetail(detailData);
      setDetailOpen(true);
    }
    setClickedEmp(detailData['deptName']+detailData['empName']);
  }

  function searchHandler(){
    setData(JSON.parse('[]'));
    setEmpList(JSON.parse('[]'));
    searchOrg(0, searchOption, searchText).then(res => {
      if(searchOption === 'all'){
        if (res.data.data.Tree !== 0) {
          setData(res.data.data.Tree)
        }
        if (res.data.data.List !== 1) {
          setEmpList(res.data.data.List)
        }
      }
      if(searchOption === 'dept'){
        setData(res.data.data.data);
      }
      if(searchOption === 'emp'){
        setEmpList(res.data.data.data);
      }
    });
  };

  const modalOff = () => {
    setOrgModal(false);
  };

  console.log(data);

  return (
    <ModalBackdrop onClick={modalOff}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
        <div id="nav">
          <h3>조직도</h3>
          <div onClick={modalOff}>X</div>
        </div>
      <div>
        <SearchBar>
          <div>
            <select value={searchOption} onChange={(e)=>{setSearchOption(e.target.value)}} >
              <option value='all'>전체</option>
              <option value='dept'>부서명</option>
              <option value='emp'>사원명</option>
            </select>
            <input type="text" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
          </div>
          <AiOutlineSearch onClick={() => {searchHandler()}}/>
        </SearchBar>
        <div id='content' className="flex">
          <DeptList>
          {
            data.map((a, i) => (
              <CompList value={a} loadEmpList={loadEmpList} clickedComp={clickedComp} setClickedComp={setClickedComp} clickedDept={clickedDept} setClickedDept={setClickedDept} key={a['name']+a['id']}/>
            ))
          } 
          
          </DeptList>
          <EmpList value={empList} handler={EmpDetailHandler} clickedEmp={clickedEmp} setClickedEmp={setClickedEmp}/>
          {detailOpen ? <EmpDetail list={detail}/> : <Empty/>}
      </div>
      </div>
    </OrgModalView>
  </ModalBackdrop>
  );
}

function CompList({ value, loadEmpList, clickedComp, setClickedComp, clickedDept, setClickedDept }) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);
  function handleItem() {
    if (value['type'] === 'comp') {
      orgTreeApi(value['type'], value['compId'], '').then(res => {
        if (Array.isArray(res.data.data)) {
          setSubItem(res.data.data);
        }
      });
    } else {
      orgTreeApi(value['type'], value['compId'], value['id']).then(res => {
        if (Array.isArray(res.data.data)) {
          setSubItem(res.data.data);
        }
      });
    }
    loadEmpList(value['type'], value['compId'], value['id']);
    setOpen(!open);
    if(value['type'] === 'comp'){
      setClickedComp(value['type']+value['id']);
    }
    if(value['type'] === 'dept'){
      setClickedComp('comp'+value['compId']);
      setClickedComp(value['type']+value['id']);
    }
  }

  return (
    <Dept key={value['name']+value['id']}>
      <div className={`title ${(value['type']+value['id'] === clickedComp) || (value['type']+value['id'] === clickedDept ) ? 'true' : 'false'}`} onClick={() => {
        handleItem()
        }}>
        { value['type'] === 'comp' ? <img src='/img/comp/branch_48.png' alt='icon'/> 
        : <img src='/img/dept.png' alt='icon'/> }
        <p>{ value['name'] }</p>
      </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={loadEmpList} clickedComp={clickedComp} setClickedComp={setClickedComp} key={a['name']+a['id']}/>
        ))
      }
    </Dept>
  );
}

export function DeptTree({ value, loadEmpList, clickedComp, setClickedComp, clickedDept, setClickedDept }) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleItem() {
    if (value['type'] === 'comp') {
      orgTreeApi(value['type'], value['compId'], '').then(res => {
        if (Array.isArray(res.data.data)) {
          setSubItem(res.data.data);
        }
      });
    } else {
      orgTreeApi(value['type'], value['compId'], value['id']).then(res => {
        if (Array.isArray(res.data.data)) {
          setSubItem(res.data.data);
        }
      });
    }
    orgTreeApi(value['type'], value['compId'], value['id']).then(res => {
      if (Array.isArray(res.data.data)) {
        setSubItem(res.data.data);
      }
    });
    loadEmpList(value['type'], value['compId'], value['id']);
    setOpen(!open);
    if(value['type'] === 'comp'){
      setClickedComp(value['type']+value['id']);
    }
    if(value['type'] === 'dept'){
      setClickedComp('comp'+value['compId']);
      setClickedComp(value['type']+value['id']);
    }
  }

  return (
    <Dept key={value['name']+value['id']}>
        <div onClick={() => {
          handleItem()
          }} className={`title ${(value['type']+value['id'] === clickedComp) || (value['type']+value['id'] === clickedDept ) ? 'true' : 'false'}`} >
          { value['type'] === 'comp' 
          ? <img src='/img/comp/branch_48.png' alt='icon'/>
           : <img src='/img/dept.png' alt='icon'/> }
          <p>{value['name']}</p></div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={loadEmpList} clickedComp={clickedComp} setClickedComp={setClickedComp} key={a['name']+a['id']}/>
        ))
      }
  </Dept>
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
  padding: 20px;
  > #nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > h3 {
      font-size: x-large;
      font-weight: bold;
    }
    > div {
      font-size: x-large;
      font-weight: bold;
    }
  }
  > div > span {
    position : right;
  }
  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;
  }
`;
const DeptList = styled.ul`
margin-top : 5px;
width: 250px;
height: 100%;
border : 1px gray solid;
overflow: scroll;
&::-webkit-scrollbar{
  display: none;
}
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;
export const Dept = styled.li`
margin-left: 10px;
list-style: none;
> .title {
  display: flex;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(214,236,248);
    border-radius: 5px;
  }
  > img {
    margin: 5px;
    width: 20px;
    height: 20px;
  }
  &.true {
    background-color: rgb(214,236,248);
    border: 1px solid rgb(146,183,214);
    border-radius: 5px;
  }
  > p {
    padding-top: 10px;
  }
}
`;
const Empty = styled.div`
margin-top : 5px;
width: 250px;
height: 100%;
`;
const SearchBar = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
border: 1px solid gray;  
margin-top: 20px;
margin-bottom: 10px;
height: 50px;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
> div {
  > select {
    width: 200px;
    height: 25px;
    margin: 10px;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  }

  > input {
    height: 25px;
    width: 600px;
    margin: 10px;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  }
}
> svg {
  width: 35px;
  height: 35px;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
}
`;