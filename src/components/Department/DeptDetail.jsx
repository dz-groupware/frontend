import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { addDepartment,  deleteDepartment, getBasicDetailById, getEmpListByDeptId } from '../../api/department';
import DeptDetailBasic from './DeptDetailBasic';
import DeptDetailEmp from './DeptDetailEmp';

export default function DeptDetail({ id, setId, status, setStatus, form, setForm, isModified, empList, setDetailEmp }){

  console.log("empList: ", empList);
  const initValue = {
    parId: 0,
    parName: "",
    id: 0,
    name: "",
    abbr: "",
    code: "",
    sortOrder: 0,
    enabledYn: true,
    managementYn: false,
    includedYn: true,
  }

  const [value, setValue] = useState(initValue);

  console.log("status : ", status.status);
  const handleAddDept = () => {
    // 이제까지 수정된 정보를 저장하고, 

    
  }
  const handleDelDept = () => {
    // 삭제 요청
    deleteDepartment(id.newDeptId);
    // 현재 수정 정보 저장
    deletedForm();
    setValue(initValue);
    isModified.current = false;
    // setStatus({...status, id});
    // 수정 중이던 (일괄변경 : form 에서 detail에서 모두 삭제)
  }

  // 선택한 부서가 바뀔 때, 변경사항이 있다면 변경 시키고, 폼에 맞는 데이터를 넣어줌.
  useEffect(() => {
    let itemFound = false;

    const addFormData = () => {   
      getBasicDetailById(id.newDeptId).then(res => {
        if (res !== null){
          setForm((prev) => [...prev, res.data]);
          setValue({...value, ...res.data});
          setStatus({...status, status:""});
        }
      });    
    }

    console.log('in useEffect/ newDeptId : ',id.newDeptId);
    console.log('switch deptId : ', id.deptId , "->", id.newDeptId);
    // 변경사항이 있다면 저장시킴.
    if (isModified.current === true) {
      const updateForm = form.map(item => {
        if(item !== null && item !== undefined) {
        if (item.id === id.deptId) {
          console.log('in form : ', id.deptId);
          // 수정된 적 있으면 실행
          
          // const detail = {...value, status: props.status === "add" ? "add" : "modify" };
          // console.log('detail : ', detail);
          // 바뀐 정보 가져오기
          return {...value, status: status.status === "add" ? "add" : "modify" };
        } 
        return item;
        }
      });
      console.log("updateForm ", id.newDeptId, "=> ", updateForm)
      setForm(updateForm);
    };

/////////////////// 위로는 변경 내용 저장 아래는 폼에 맞는 내용 추가 /////////////////
    // 새로운 부서 추가
    if (id.newDeptId === "-3" || id.newDeptId === -3) {
      setValue(initValue);
      setStatus({...status, status: "add"});
    } 
    if (id.newDeptId > 0) {
    // 눌렀던 내용 다시 가져오기
    form.forEach(item => {
      if (item !== null && item !== undefined){
        if (item.id === id.newDeptId) {
          setValue({...value, ...item});
          itemFound = true;
        }
      }
    });
      console.log('in useEffect/ newDeptId : ',id.newDeptId);
      // 누른 적 없던 내용 가져오기 
      if (!itemFound && id.newDeptId < 1){
        console.log('여기 들어오면 안됨')
        addFormData();
        setId({...id, deptId: id.newDeptId});
      }
    }
    // deptId 다른 부서 상세 페이지로 이동할 때, 이전까지 작성한 내용을 저장하기 위해서

    // 저장
    if (id.newDeptId === -2){
      if (id.deptId === -2){
        console.log("이미 저장된 내용입니다.");
      } else {
        // 현재 수정 정보 저장
        const dept = new FormData();
        dept.set(value);
        addDepartment(dept).then();
      }
    }
  }, [id.newDeptId]);

  useEffect(() => {
    console.log('for empList : ');
    if (status.detailType === 'emp' && id.newDeptId > 0){
      console.log('여기 들어왔음 : ', id.newDeptId);
      getEmpListByDeptId(id.newDeptId).then(res => {
        console.log("이겨 결과 : ", res);
        setDetailEmp(res.data)});
    }
  }, [status, id, setDetailEmp]);
console.log(status);
console.log(id);
  const deletedForm = () => {
    let newform = form.filter(item => item.id !== id.deptId);
    setForm(newform);
  }

  return (
    <>
      {
        status.detailType &&
        <Content>
        <DetailTitle>
        <div>상세정보</div>
        <div>
          <button onClick={() => setId({...value, newDeptId:-2})}>저장</button> 
          <button onClick={handleDelDept}>삭제</button> 
          <div>|</div>
          <div onClick={() => setStatus({...status, detailType:false})}>X</div>
        </div> 
      </DetailTitle>
      <DetailType>
        <div className={status.detailType === 'basic' ? 'on' : 'off'} onClick={() => setStatus({...value, detailType:'basic'})}>기본 정보</div>
        <span>|</span>
        <div className={status.detailType === 'emp'  ? 'on' : 'off'} onClick={() => setStatus({...value, detailType:'emp'})}>부서원 정보</div>
      </DetailType>

      {status.detailType === 'basic' ? 
      <DeptDetailBasic value={value} setValue={setValue}isModified={isModified} handleAddDept={handleAddDept}/> : null}
      {status.detailType === 'emp' ? 
      <DeptDetailEmp empList={empList}/> : null}
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