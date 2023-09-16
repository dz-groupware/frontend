import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { addDepartment } from '../api/department';

import { getDepartemnt, getBasicDetailById } from '../api/department';
import {  AiOutlineInfoCircle, AiOutlineSearch } from 'react-icons/ai';

export default function Department() {
  const [deptId, setDeptId] = useState('');
  const [detailType, setDetailType] = useState('basic');
  const [detail, setDetail] = useState('');
  const [result, setResult] = useState(JSON.parse('[{"code":"KQ1D9A8", "name":"시스템 개발팀"}, {"code":"8S22K9X", "name":"데이터 분석팀"}]'));

  const [form, setForm] = useState([]);

  const isModified = useRef(false);

  // 더미 데이터
  const gnbList = JSON.parse('[{"code":"KQ1D9A8", "name":"시스템 개발팀"}, {"code":"8S22K9X", "name":"데이터 분석팀"}]');

  console.log("deptId : ", deptId);
  console.log("form : ", form);
  console.log(detail);
  useEffect(() => {
    getDepartemnt().then(res => {
      console.log(res.data);
      setResult(res.data);
    });
  }, []);

  // 선택한 부서가 바뀔 때, 
  useEffect(() => {
    
    const updateFormDataById = (id, newData) => {
      setForm((prev) => {
        const checkForm = prev.some(item => item.id === id);

        // 저장된 적 없으면 추가
        if(!checkForm){
          addFormData();
          return prev;
        }

        // 저장된 적 있으면 수정
        return prev.map(item => item.id === id ? {status: "modify",  ...item, ...newData } : item);
    });

    const addFormData = () => {   
      console.log("request deptId : ", deptId);
      getBasicDetailById(deptId).then(res => {
        const newFormData = { id: res.data.id, status: "added", ...res.data }; // 현재의 타임스탬프를 id로 사용
        setForm((prev) => [...prev, newFormData]);
        setDetail(res.data);
        console.log("request done");
      });    
    };


    
  }
  if(deptId !== ""){
    console.log("here")
    updateFormDataById(deptId, detail);     
    setDetail(detail); 
  }
    // deptId 다른 부서 상세 페이지로 이동할 때, 이전까지 작성한 내용을 저장하기 위해서
  }, [deptId]);

  return (
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <div id = "deptBtn">
          <button onClick={() => {}}>일괄등록</button>
          <button onClick={() => {}}>추가</button>
          <button onClick={() => {}}>변경이력</button>
          <button onClick={() => {}}>즐겨찾기</button>&nbsp;
        </div>
      </DeptTitle>
      <Info>
          <div>
            <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
          </div>
      </Info>
      <DetailArea>
        <SearchArea>
          <SearchForm id="deptSearchForm">
            <select>
              {
                gnbList.map((a, i) => (
                  <option key={a['name']+a['id']} id='gnbName' value={a['name']}>{a['name']}</option>
                ))
              }
            </select>
            <input placeholder='코드/사업장/부서명을 입력하세요'/>
            <AiOutlineSearch onClick={() => {}}/>
          </SearchForm>
          <SearchTree>
            <div id='SearchSortOrder'>
              <span>조직도</span>
              <select name="filter" sytle={{zIndex: -2}}>
                <option value="all">필터</option>
                <option value='admin'>관리자 부서</option>
                <option value='general'>사용자 사용자</option>
              </select>
            </div>
            <div id='SearchResult'>
              {
                result.map((a, i) => (
                  <DeptItem key={a['name']+a['id']} setDetailType={setDetailType} value={a} detailType={detailType} setDeptId={setDeptId} setDetail={setDetail}/>
                ))
              } 
            </div>
          </SearchTree>
        </SearchArea>
        <DeptDetail detailType={detailType} setDetail={setDetail} deptId={deptId} detail={detail} isModified={isModified}/>
      </DetailArea>
    </ContentDept>
  )
}
function DeptDetail(props){
  const handleAddDept = () => {
    // 현재 수정 정보 저장
    const dept = new FormData(document.getElementById('basic'));
    addDepartment(dept).then();
  }
  const handleDelDept = () => {
    // 현재 수정 정보 저장
    //setDetail('');
    // 수정 중이던 (일괄변경 : form 에서 detail에서 모두 삭제)
  }
  return (
    <>
      {
        props.detailType &&
        <Content>
        <DetailTitle>
        <div>상세정보</div>
        <div>
          <button onClick={handleAddDept}>저장</button> 
          <button onClick={handleDelDept}>삭제</button> 
          <div>|</div>
          <div onClick={() => props.setDetailType(false)}>X</div>
        </div> 
      </DetailTitle>
      <DetailType>
        <div className={props.detailType === 'basic' ? 'on' : 'off'} onClick={() => props.setDetailType('basic')}>기본 정보</div>
        <span>|</span>
        <div className={props.detailType === 'emp'  ? 'on' : 'off'} onClick={() => props.setDetailType('emp')}>부서원 정보</div>
      </DetailType>

      {props.detailType === 'basic' ? <DeptDetailBasic detail={props.detail} isModified={props.isModified}/> : null}
      {props.detailType === 'emp' ? <DeptDetailEmp detail={props.detail} /> : null}
      </Content>
      }
    </>
  )
}

function DeptItem(props){
  console.log(props.value);

  const handleDetail = () => {
    // 원래 id가 맞음
    //    props.setDeptId(props.value['code']);
    props.setDeptId(props.value['id']);
    props.setDetailType('basic');
  }

  return (
    <>
      <div onClick={handleDetail} >
        {props.value['code']}.{props.value['name']}
      </div>
    </>
  );
}

function DeptDetailBasic(props){
  

  // props.detail이 바뀌면 새로운 데이터 저장. isModified = false
  // useEffect(() => {
  //   // 새로운 데이터를 저장하기 전에, 이전 데이터 저장

  //   // 새로운 데이터 저장

  //   // 
  //   isModified.current = false;
  // }, [props.detail]);


  const handleChange = () => {
    props.isModified.current = true;
  }

  console.log('in detailBasic');
  console.log(props.detail);
  console.log(props.isModified);

  return (
    <Detail>
      <BasicForm>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colspan="3">
              <input name="parId" value={props.detail['parId']} onChange={handleChange}/>(모달)
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colspan="3">
              <input name="code" value={props.detail['code']} />
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colspan="3">
              <input name="name" value={props.detail['name']} />
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colspan="3">
              <input name="abbr" value={props.detail['abbr']} />
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio'/>사용<input name='enabledYn' value="false" type='radio' checked={props.detail['enabledYn'] === true ? true: false} />미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio'/>설정<input name='managementYn' value="false" type='radio'/>미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio'/>표시<input name='includedYn' value="false" type='radio'/>미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' value={props.detail['sortOrder']} />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
    </Detail>
  )
}

function DeptDetailEmp(){
  const empList = JSON.parse('[{"deptName":"부서명1", "position":"직책1","empName":"사원명1","sortOrder":"1"}, {"deptName":"부서명1", "position":"직책2","empName":"사원명2","sortOrder":"2"}]')
  return (
    <>
      <BasicForm>
        <table>
          <tr className="detailEmpTitle">
            <td>부서</td>
            <td>직책</td>
            <td>사용자명</td>
            <td>정렬순서</td>
          </tr>
          {
            empList.map((a, i) => (
              <tr>
                <td>{a['deptName']}</td>
                <td>{a['position']}</td>
                <td>{a['empName']}</td>
                <td>{a['sortOrder']}</td>
              </tr>
            ))
          }
        </table>
      </BasicForm>
    </>
  )
}
const ContentDept = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: calc(100% - 90px);
`;
const DetailArea = styled.div`
display: flex;
width: 100%;
height: calc(100% - 120px);
`;
const SearchArea = styled.div`
margin:10px;
height: calc(100% - 10px);
background-color: white;
width: 330px;
border: 1px solid rgb(171,172,178);
color: black;
`;
const SearchForm = styled.form`
width: 100%;
padding: 5px;
height: 100px;
background-color: rgb(240,245,248);
border-bottom: 1px solid rgb(171,172,178);
color: black;
> select {
  width: calc(100% - 20px);
  height:25px;
  margin: 10px;
}
> input {
  width: calc(100% - 50px);
  height: 20px;
  margin: 5px;
  margin-left: 10px;
}
> svg {
  width: 20px;
  height: 20px;
  position: relative;
  top: 7px;
}
`;
const SearchTree = styled.div`
width: 300px;
height: calc(100% - 100px);
border: 1px solid gray;
> #SearchSortOrder{
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
> #SearchResult {
  overflow: scroll;
  height: calc(100% - 30px);
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    margin: 10px;
    padding: 10px;
    background-color: rgb(214,236,248);
  }
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
> #deptBtn {
  display: flex;
  margin-top: 5px;
  > * {
    height: 30px;
    margin: 5px;
  }
  > svg {
    margin-top: 10px;
    width: 20px;
    height: 20px;
    color: gray;
  }
}
`;
const Content = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
margin: 10px;
`;
const Detail = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
`;
const DetailTitle = styled.div`
display: flex;
justify-content: space-between;
font-size: large;
font-weight: bold;
width: 100%;
border-bottom: 2px solid gray;
margin-bottom: 5px;
> div {
  padding: 5px;
  display: flex;
}
`;
const DetailType = styled.div`
display: flex;
width: 100%;
border-bottom: 2px solid gray;
margin-bottom: 5px;
font-size: medium;
font-weight: bold;

& .on {
  color: blue;
  border-bottom: 1px solid blue;
}
& .off {
  color: black;
}
> div {
  display: flex;
  padding : 10px;
}
> span{
  padding-top: 10px;
}
`;
const BasicForm = styled.div`
width: 100%;
height: calc(100% - 100px);
> form {
overflow: scroll;
height: calc(100% - 100px);
&::-webkit-scrollbar{
  display: none;
}
> table {
  min-width: 700px;
  border-collapse: collapse;
  > tr {
    > td:nth-child(1) {
      background-color: rgb(240,245,248);
      width: 20%;
      min-width: 150px;
      font-size: medium;
      font-weight: bold;
      padding: 10px;
      text-align: right;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    > td:nth-child(2) {
      background-color:  white;
      color: gray;
      width: 80%;
      min-width: 400px;
      font-size: small;
      padding: 10px;
      text-align: left;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    }
  > tr {
    > .field{
      background-color: rgb(240,245,248);
      width: 20%;
      min-width: 150px;
      font-size: medium;
      font-weight: bold;
      padding: 10px;
      text-align: right;
      border-bottom: 1px solid gray;
    }
    > .data {
      background-color:  white;
      color: gray;
      width: 80%;
      min-width: 400px;
      font-size: small;
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid gray;
    }
  }
  }  

}
> table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  text-align: center;
  > .detailEmpTitle {
      background-color: rgb(240,245,248);
      width: 100%;
      min-width: 400px;
      font-size: large;
      font-weight: bold;
      padding: 10px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
  }
  > tr td {
    padding: 10px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;

  }
}
`;