import { useEffect, useState } from "react";

import {  AiOutlineInfoCircle } from 'react-icons/ai';

import styled from 'styled-components';

import { getDepartemnt, getOptionCompList, getBasicDetailById, getEmpListByDeptId, findDeptNameAndCode } from '../api/department';
import { FavorApi } from '../api/menu';

import DetailBasic from '../components/Department/DetailBasic';
import DetailEmp from '../components/Department/DetailEmp';
import TitleBtn from '../components/Department/TitleBtn';
import SearchForm from '../components/Department/SearchForm';
import SearchResult from '../components/Department/SearchResult';
import DetailTitle from '../components/Department/DetailTitle';

export default function Department({ menuId }) {
  // initialState
  const initSearch = {
    option: '',
    test: '',
    on: false,
  }
  const initDetail = {
    type: false,
    id: '',
    state: false,
    save: false,
    isChanging: false,
  }
  const initValue = {
    parId: 0,
    parName: "없음",
    id: 0,
    name: "",
    abbr: "",
    code: "",
    sortOrder: 0,
    enabledYn: true,
    managementYn: false,
    includedYn: true,
  }
  // 컴포넌트에서 보내는 상태
  const [search, setSearch] = useState(initSearch);
  const [detail, setDetail] = useState(initDetail);
  const [value, setValue] = useState(initValue);

  const [favor, setFavor] = useState(false);
  const [form, setForm] = useState(JSON.parse('[]'));

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);

  useEffect(()=>{
    const loadDeptList = async () => {
      try {
        const menu = await getDepartemnt(menuId);
        setResult(menu.data);
        const fav = await FavorApi('load', menuId);
        setFavor(fav.data);
        const opt = await getOptionCompList(menuId);
        setOption(opt.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeptList();
  }, []);

  // 부서 상세 정보 요청
  useEffect(()=>{ 
    if(detail.type === 'basic') {
      getBasicDetailById(detail.id).then(res => setValue(res.data));
    }
    if (detail.type === 'emp'){
      getEmpListByDeptId(detail.id).then(res => setEmpList(res.data));
    }
  },[detail.id]);


  useEffect(()=>{
    
    setValue(initValue);
  },[detail.save]);


  // 즐겨찾기 추가/삭제 요청
  function FavorHandler(){
    FavorApi('off', menuId).then(() => {
      setFavor(!favor);
    });
  }
  return(
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <TitleBtn favor={favor} FavorHandler={FavorHandler} detail={detail} setDetail={setDetail}/>
      </DeptTitle>
      <Info>
          <div>
            <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
          </div>
      </Info>
      <DetailArea>
        <SearchResultArea>
          <SearchForm option={option}/>
          <div>
            <span>조직도</span>
            <select name="filter">
              <option value="all">필터</option>
              <option value='admin'>관리자 부서</option>
              <option value='general'>사용자 사용자</option>
            </select>
          </div>
          <SearchResult result={result} detail={detail} setDetail={setDetail} menuId={menuId}/>
        </SearchResultArea>
        <Detail>
          <DetailTitle detail={detail} setDetail={setDetail} />
            {detail.type === 'basic' ? 
            <DetailBasic data={value} setData={setValue} detail={detail} setDetail={setDetail} /> : null}
            {detail.type === 'emp' ? 
            <DetailEmp empList={empList} /> : null}
        </Detail>
      </DetailArea>
    </ContentDept>
  );
};


const ContentDept = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: calc(100% - 90px);
`;
const DeptTitle = styled.div`
display: flex;
justify-content: space-between;

width: 100%;

border-top: 5px solid rgb(20,136,247);
border-bottom: 1px solid grey;
color: black;

> #deptTitle {
  margin: 10px;
  margin-left: 20px;
  font-size: large;
  font-weight: bold;
  color: rgb(32,35,44);
}
`;

const Info = styled.div`
display: flex;
justify-content: center;
> div {
  margin: 10px;
  padding: 10px;
  padding-left:15px;
  width: 100%;
  height: 40px;
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;
  color: black;
  font-weight: bold;
}
`;
const DetailArea = styled.div`
display: flex;
width: 100%;
height: calc(100% - 120px);
`;
const SearchResultArea = styled.div`
margin:10px;
height: calc(100% - 10px);
background-color: white;
width: 330px;
border: 1px solid rgb(171,172,178);
color: black;

> div {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 5px;
  height: 20px;
  > span {
    font-size: small;
  }
  > select {
    font-weight: bold;
    position: relative;
    border: none;
    text-align: right;
    > option {
      background-color: white;
    }
  }
}

`;


const Detail = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
margin: 10px;
`;
