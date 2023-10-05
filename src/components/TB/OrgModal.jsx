import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineTeam } from "react-icons/ai";
import {LuBuilding2} from 'react-icons/lu';

import {orgTreeApi, orgEmpListApi, searchOrg} from '../../api/modal';

import EmpList from './OrgModal/EmpList';
import EmpDetail from './OrgModal/EmpDetail';
import { ModalBackdrop, ModalView } from '../../common/Modal/Modal';

export default function OrgModal({ setOrgModal }){

  const [data, setData] = useState(JSON.parse('[]'));
  const [empList, setEmpList] = useState(JSON.parse('[]'));

  const empId = localStorage.getItem("empId");

  const [searchOption, setSearchOption] = useState("all", "");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  useEffect(() => {
    async function LoadData(){
      const res = await orgTreeApi('basic', "","", "");
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
          {detailOpen ? <EmpDetail list={detail}/> : <Empty/>}
      </div>
      </div>
    </OrgModalView>
  </ModalBackdrop>
  );
}

function CompList({ value, loadEmpList }) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleItem() {
    if (value['type'] === 'comp') {
      value['id'] = ""
    }
    orgTreeApi(0, value['type'], value['compId'], value['id']).then(res => {
      if (Array.isArray(res.data.data)) {
        setSubItem(res.data.data);
      }
    });
    loadEmpList(value['type'], value['compId'], value['id']);
    setOpen(!open);
  }

  return (
    <Dept key={value['name']+value['id']}>
      <div className="title" onClick={() => {
        handleItem()
        }}>
        <div>
        { value['type'] === 'comp' ? <LuBuilding2 /> : <AiOutlineTeam /> }
        { value['name'] }
        </div>
      </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={loadEmpList} key={a['name']+a['id']}/>
        ))
      }
    </Dept>
  );
}

export function DeptTree({ value, loadEmpList }) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  function handleItem() {
    if (value['type'] === 'comp') {
      value['id'] = ""
    }
    orgTreeApi(value['type'], value['compId'], value['id']).then(res => {
      if (Array.isArray(res.data.data)) {
        setSubItem(res.data.data);
      }
    });
    loadEmpList(value['type'], value['compId'], value['id']);
    setOpen(!open);
  }

  return (
    <Dept key={value['name']+value['id']}>
      <div className='deptList'>
        <div onClick={() => {
          handleItem()
          }}>
          { value['type'] === 'comp' ? <LuBuilding2 /> : <AiOutlineTeam /> }
          {value['name']}</div>
      </div>
      {
        open && subItem.map((a, i) => (
          <DeptTree value={a} loadEmpList={loadEmpList} key={a['name']+a['id']}/>
        ))
      }
  </Dept>
  );
}

const OrgModalView = styled(ModalView)`  
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