import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { addDepartment,  deleteDepartment, getBasicDetailById, getEmpListByDeptId } from '../../api/department';
import DeptDetailBasic from './DeptDetailBasic';
import DeptDetailEmp from './DeptDetailEmp';

export default function DeptDetail(props){
  const [id, setId] = useState();
  const [parId, setParId] = useState();
  const [code, setCode] = useState();
  const [parName, setParName] = useState();
  const [name, setName] = useState();
  const [abbr, setAbbr] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [ enabledYn, setEnabledYn ] = useState(false);
  const [ managementYn, setManagementYn ] = useState(false);
  const [ includedYn, setIncludedYn ] = useState(false);
  
  const setDetail = (value) => {
    setId(value['id'] === undefined || value['id'] === null ? "" : value['id']);
    setParId(value['parId'] === undefined ? "" : value['parId']);
    setCode(value['code'] === undefined ? "" : value['code']);
    setName(value['name'] === undefined ? "" : value['name']);
    setParName(value['parName'] === undefined ? "" : value['parName']);
    setAbbr(value['abbr'] === undefined ? "" : value['abbr']);
    setSortOrder(value['sortOrder'] === undefined ? "" : value['sortOrder']);
    setEnabledYn(value['enabledYn'] === undefined ? "" : value['enabledYn']);
    setManagementYn(value['managementYn'] === undefined ? "" : value['managementYn']);
    setIncludedYn(value['includedYn'] === undefined ? "" : value['includedYn']);
//    props.setStatus(value['status'] === undefined || value['status'] === null ? "" : value['status']);
    props.isModified.current = false;
  };

  console.log("status : ", props.status);
  const handleAddDept = () => {
    // 현재 수정 정보 저장
    const dept = new FormData();
    dept.set('id', id);
    dept.set('parId', parId);
    dept.set('code', code);
    dept.set('name', name);
    dept.set('parName', parName);
    dept.set('abbr', abbr);
    dept.set('sortOrder', sortOrder);
    dept.set('enabledYn', enabledYn);
    dept.set('managementYn', managementYn);
    dept.set('includedYn', includedYn);
    dept.set('status', props.status === "" ? "modify" : props.status);
    addDepartment(dept).then();
  }
  const handleDelDept = () => {
    // 삭제 요청
    deleteDepartment(id);
    // 현재 수정 정보 저장
    deletedForm();
    setDetail('');
    props.setRe(id);
    // 수정 중이던 (일괄변경 : form 에서 detail에서 모두 삭제)
  }

  // 선택한 부서가 바뀔 때, 변경사항이 있다면 변경 시키고, 폼에 맞는 데이터를 넣어줌.
  useEffect(() => {
    let itemFound = false;

    const addFormData = () => {   
      getBasicDetailById(props.newDeptId).then(res => {
        if (res !== null){
          props.setForm((prev) => [...prev, res.data]);
          setDetail(res.data);
          props.setStatus("");  
        }
      });    
    }

    console.log('in useEffect/ newDeptId : ',props.newDeptId);
    console.log('switch deptId : ', props.deptId , "->", props.newDeptId);
    // 변경사항이 있다면 저장시킴.
    if (props.isModified.current === true) {
      const updateForm = props.form.map(item => {
        if (item.id === props.deptId) {
          console.log('in form : ', props.deptId);
          // 수정된 적 있으면 실행
          const detail = {
            id: id,
            name: name,
            abbr: abbr,
            code: code,
            parId: parId,
            sortOrder: sortOrder,
            enabledYn: enabledYn,
            managementYn: managementYn,
            includedYn: includedYn,
            status: "modify"
          };
          console.log('detail : ', detail);
          // 바뀐 정보 가져오기
          return detail;
        } 
        return item;
      });
      console.log("updateForm ", props.newDeptId, "=> ", updateForm)
      props.setForm(updateForm);
    };

/////////////////// 위로는 변경 내용 저장 아래는 폼에 맞는 내용 추가 /////////////////
    // 새로운 부서 추가
    if (props.newDeptId === "0" || props.newDeptId === 0) {
      setDetail('');
      setId("0");
      props.setStatus("add");
    } 
    // 눌렀던 내용 다시 가져오기
    props.form.forEach(item => {
      if (item.id === props.newDeptId) {
        setDetail(item);
        itemFound = true;
      }
    });
    console.log('in useEffect/ newDeptId : ',props.newDeptId);
    // 누른 적 없던 내용 가져오기 
    if (!itemFound &&  props.newDeptId !== undefined &&  props.newDeptId !== null &&  props.newDeptId !== "" &&  props.newDeptId !== "0" &&  props.newDeptId !== -1){
      console.log('여기 들어오면 안됨')
      addFormData();
      props.setDeptId(props.newDeptId);
    }
    // deptId 다른 부서 상세 페이지로 이동할 때, 이전까지 작성한 내용을 저장하기 위해서
  }, [props.newDeptId]);

  useEffect(() => {
    if (props.detailType === 'emp'){
      getEmpListByDeptId(props.deptId).then(res => props.setDetailEmp(res.data));
    }
  }, [props.detailType, props.newDeptId]);

  const deletedForm = () => {
    let newform = props.form.filter(item => item.id !== props.deptId);
    props.setForm(newform);
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

      {props.detailType === 'basic' ? 
      <DeptDetailBasic detail={props.detail} isModified={props.isModified} handleAddDept={handleAddDept}
      id={id} parId={parId} name={name} parName={parName} code={code} abbr={abbr} sortOrder={sortOrder} enabledYn={enabledYn} 
      managementYn={managementYn} includedYn={includedYn} setId={setId} setParId={setParId}
      setName={setName} setParName={setParName} setCode={setCode} setAbbr={setAbbr} setSortOrder={setSortOrder} 
      setEnabledYn={setEnabledYn} setManagementYn={setManagementYn} setIncludedYn={setIncludedYn} /> : null}
      {props.detailType === 'emp' ? <DeptDetailEmp detail={props.detail} empList={props.empList}/> : null}
      </Content>
      }
    </>
  )
}

const Content = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
margin: 10px;
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