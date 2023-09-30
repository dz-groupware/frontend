import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DeptModal from './DeptModal';

export default function DetailBasic({ data, setData, detail, setDetail, setNoti }){
  const [modalOn, setModalOn] = useState(false);
  const [form, setForm] = useState('');
  const { validText, isValid, validate } = useValid(form);
  const [isModified, setIsModified] = useState(false);
  console.log(isModified);
  useEffect(()=>{
    setForm(data);
    setIsModified(false);
  },[]);
  
  useEffect(()=>{
    if (data !== undefined){
      console.log('data in');
      console.log('data : ', data);
      setForm(data);
    }
  },[data]);

  useEffect(()=>{
    // 입력 중에 다른 변경이 감지되었다고 판단
    // 유효성 검사
    validate(form);
    if (typeof detail.state === 'number'){
      // 다른 상세로 변경되었다면 
      // 수정 중인지 확인 :: setNoti
      if(isModified){
        console.log("수정 중")
          // 변경되었으면, 변경된 데이터를 상위로 전달
        setNoti(true);
        setData(form); 
        // 저장하는 상태
        setDetail({...detail, save: true});
      } else {
        setData(form); 
      }
      setIsModified(false);
    }
    if (detail.state === true) {
      // 상위로 변경된 상태 저장
      setData(form);
      
    }
  },[detail.state]);

  useEffect(() => {
    
    
  },[detail.id]);

  // const handleCompareData = () => {
  //   if (data !== undefined) {
  //     const keys = Object.keys(data);
  //     for (let key of keys) {
  //       if (data[key] !== form[key]) {
  //         return false;
  //       }
  //       return true;
  //     }  
  //   }
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("handleInputChange : ",value);
    setForm({ ...form, [name]:value });
    setIsModified(true);
  }

  return (
    <Detail>
      <BasicForm>
        <form id='basic'>
        <table>
          <tbody>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea defaultValue={form.parName} onClick={()=>setModalOn(true)} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input name='code' placeholder='부서코드를 입력하세요'
              value={form.code} onChange={handleInputChange}
              data-valid={!isValid.code}/> <div>{validText.code}</div>
              <button >중복 검사</button>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input  name='name' placeholder='부서명을 입력하세요'
              value={form.name}  onChange={handleInputChange} 
              data-valid={!isValid.name}/> <div>{validText.name}</div>
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input name='abbr' placeholder='부서약칭을 입력하세요'
              value={form.abbr}  onChange={handleInputChange}
              data-valid={!isValid.abbr} /> <div>{validText.abbr}</div>
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' 
              checked={form.enabledYn === true } 
              onChange={e => setForm({...form, enabledYn: true})}/>사용
              <input name='enabledYn' value="false" type='radio' 
              checked={form.enabledYn === false} 
              onChange={e => setForm({...form, enabledYn: false})}/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' 
              checked={form.managementYn === true} 
              onChange={e => setForm({...form, managementYn: true})}/>설정
              <input name='managementYn' value="false" type='radio' 
              checked={form.managementYn === false} 
              onChange={e => setForm({...form, managementYn: false})}/>미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' 
              checked={form.includedYn === true} 
              onChange={e => setForm({...form, includedYn: true})}/>표시
              <input name='includedYn' value="false" type='radio' 
              checked={form.includedYn === false} 
              onChange={e => setForm({...form, includedYn: false})}/>미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={form.sortOrder}  
              onChange={e => setForm({...form, sortOrder: parseInt(e.target.value, 10)})}  />
            </td>
          </tr>
          </tbody>
        </table>
        </form>
      </BasicForm>
      {
        modalOn && <DeptModal form={form} setModalOn={setModalOn} setForm={setForm}/>
      }
    </Detail>
  )
}

function useValid(form){
  const initValid = {
    code: false,
    name: false,
    abbr: false,
  }
  const [validText, setText] = useState(initValid);
  const [isValid, setValid] = useState(initValid);

  const validate = () => {
    const codeExp = /^[A-Za-z0-9]{8}$/;
    const nameExp = /^[A-Za-z0-9]+$/;
    const abbrExp = /^[A-Za-z0-9]{6}$/;

    const codeIsValid = codeExp.test(form.code);
    const nameIsValid = nameExp.test(form.name);
    const abbrIsValid = abbrExp.test(form.abbr);

    setValid({
      code : codeIsValid,
      name : nameIsValid,
      abbr : abbrIsValid,
    });

    setText({
      code : codeIsValid ? '' : '8자리 :: 영어 대/소문자',
      name : nameIsValid ? '' : '/ 제외 특수문자 불가',
      abbr : abbrIsValid ? '' : '6자리 :: 영어 대/소문자',
    });

    return {isValid : codeIsValid && nameIsValid && abbrIsValid};
  }
  return { validText, isValid, validate };
}

const Detail = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
`;
const BasicForm = styled.div`
width: 100%;
height: calc(100% - 100px);
> form {
> table {
  > tbody {
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
    > td {
      > .readOnly {
        display: none;
      }
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
}

> .detailEmpBody {
  overflow: scroll;
height: calc(100% - 50px);
&::-webkit-scrollbar{
  display: none;
}
> table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  text-align: center;

  > tr > td {
    width: 25%;
    min-width: 100px;
    padding: 10px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }
}
}
> div > table {
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
    height: 30px;
    > td {
      padding: 10px;
      width: 25%;
      min-width: 100px;
    }
  }
}
`;