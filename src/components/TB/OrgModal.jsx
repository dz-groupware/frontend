import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { AiOutlineSearch, AiOutlineTeam } from "react-icons/ai";
import {LuBuilding2} from 'react-icons/lu';

import {orgTreeApi, orgEmpListApi, searchOrg} from '../../api/modal';

import EmpList from './OrgModal/EmpList';
import EmpDetail from './OrgModal/EmpDetail';

export default function OrgModal(props){
  
  const [data, setData] = useState(JSON.parse('[]'));
  const [empList, setEmpList] = useState(JSON.parse('[]'));
  const empId = useSelector(state => state.loginInfo.empId);

  const [searchOption, setSearchOption] = useState("all", "");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  useEffect(() => {
    async function LoadData(emp_id){
      const res = await orgTreeApi('basic', "","", "");
      setData(res.data);
    }
    LoadData(empId);
  }, [empId]);  

  async function loadEmpList(type, compId, deptId){
    const res = await orgEmpListApi(type, compId, deptId);
    setEmpList(res.data);
  }

  function EmpDetailHandler(detailData){
    if(detail === detailData){
      setDetailOpen(false);
    } else {
      setDetail(detailData);
      setDetailOpen(true);
    }
  }

  function searchHandler(){
    setData(JSON.parse('[]'));
    setEmpList(JSON.parse('[]'));
    searchOrg(searchOption, searchText).then(res => {
      if(searchOption === 'all'){
        if (res.data.Tree !== 0) {
          setData(res.data.Tree)
        }
        if (res.data.List !== 1) {
          setEmpList(res.data.List)
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

  const modalOff = () => {
    props.setOrgModal(false);
  }

  return (
    <ModalBackdrop onClick={modalOff}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
        <div id="nav">
          <h3>조직도</h3>
          <div onClick={modalOff}>X</div>
        </div>
      <div>
        <div id='search'>
          <div>
            <select value={searchOption} onChange={(e)=>{setSearchOption(e.target.value)}} >
              <option value='all'>전체</option>
              <option value='dept'>부서명</option>
              <option value='emp'>사원명</option>
            </select>
            <input type="text" placeholder="검색" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
          </div>
          <AiOutlineSearch onClick={() => {searchHandler()}}/>
        </div>
        <div id='content' className="flex">
          <DeptList>
          {
            data.map((a, i) => (
              <CompList value={a} loadEmpList={loadEmpList} key={a['name']+a['id']}/>
            ))
          }
          </DeptList>
          <EmpList value={empList} handler={EmpDetailHandler}/>
          {detailOpen ? <EmpDetail list={detail}/> : <Empty></Empty>}
      </div>
      </div>
    </OrgModalView>
  </ModalBackdrop>
  );
}


export function CompList(props) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleItem() {
    if (props.value['type'] === 'comp') {
      props.value['id'] = ""
    }
    orgTreeApi(props.value['type'], props.value['compId'], props.value['id']).then(res => setSubItem(res.data));
    props.loadEmpList(props.value['type'], props.value['compId'], props.value['id']);
    setOpen(!open);
  }

  return (
    <Dept key={props.value['name']+props.value['id']}>
      <div className="title" onClick={() => {
        handleItem()
        }}>
        <div>
        { props.value['type'] === 'comp' ? <LuBuilding2 /> : <AiOutlineTeam /> }
        { props.value['name'] }
        </div>
      </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={props.loadEmpList} key={a['name']+a['id']}/>
        ))
      }
    </Dept>
  );
}

export function DeptTree(props) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleItem() {
    if (props.value['type'] === 'comp') {
      props.value['id'] = ""
    }
    orgTreeApi(props.value['type'], props.value['compId'], props.value['id']).then(res => setSubItem(res.data));
    props.loadEmpList(props.value['type'], props.value['compId'], props.value['id']);
    setOpen(!open);
  }

  return (
    <Dept key={props.value['name']+props.value['id']}>
      <div className='deptList'>
        <div onClick={() => {
          handleItem()
          }}>
          { props.value['type'] === 'comp' ? <LuBuilding2 /> : <AiOutlineTeam /> }
          {props.value['name']}</div>
      </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={props.loadEmpList} key={a['name']+a['id']}/>
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
  

  > div > #search {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid gray;  
    margin-top: 20px;
    margin-bottom: 10px;
    height: 50px;

    > div {
      > select {
        width: 200px;
        height: 25px;
        margin: 10px;
      }
  
      > input {
        height: 25px;
        width: 600px;
        margin: 10px;
      }
    }

    > svg {
      width: 25px;
      height: 25px;
      border: 1px solid gray;
      border-radius: 5px;
      margin: 10px;
      padding: 5px;
    }
}

  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;


  }
`;
const DeptList = styled.div`
margin-top : 5px;
width: 250px;
height: 100%;
border : 1px gray solid;
overflow: scroll;
&::-webkit-scrollbar{
  display: none;
}
`;
export const Dept = styled.div`
margin-left: 15px;
> .title {
  display: flex;
  margin: 10px;
}
> .deptList {
  display: flex;
  margin: 10px;
  width: 100%;
  height: 20px;
}
`;
const Empty = styled.div`
margin-top : 5px;
width: 250px;
height: 100%;
`;