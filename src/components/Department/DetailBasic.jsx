import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DeptModal from './DeptModal';

export default function DetailBasic({ data, setData, detail, setDetail }){
  const [modalOn, setModalOn] = useState(false);
  const [value, setValue] = useState('');
  const { validText, isValid } = useValid(value);
  const [noti, setNoti] = useState(false);


  useEffect(()=>{
    if (data !== undefined){
      setValue(data);
    } else {
    }
  },[data]);

  const handleNotiClose = () => {
    setNoti(false);
  }

  useEffect(()=>{
    if (detail.state === "add" || detail.state === "modify") {
      
      setNoti(true);
    }

  },[detail.state]);

  useEffect(() => {

  },[value]);

  return (
    <Detail>
      <BasicForm>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea defaultValue={value.parName} onClick={()=>setModalOn(true)} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input 
              placeholder='부서코드를 입력하세요'
              value={value.code}
              valuetType={'code'}
              onChange={e => setValue({...value, code: e.target.value})}
              valid={!isValid.code}/> <div>{validText.code}</div>
              <button >중복 검사</button>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input 
              placeholder='부서명을 입력하세요'
              value={value.name} 
              onChange={e => setValue({...value, name: e.target.value})} 
              valid={!isValid.name}/> <div>{validText.name}</div>
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input 
              placeholder='부서약칭을 입력하세요'
              value={value.abbr} 
              onChange={e => setValue({...value, abbr: e.target.value})}
              valid={!isValid.abbr} /> <div>{validText.abbr}</div>
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' 
              checked={value.enabledYn === true } 
              onChange={e => setValue({...value, enabledYn: true})}/>사용
              <input name='enabledYn' value="false" type='radio' 
              checked={value.enabledYn === false} 
              onChange={e => setValue({...value, enabledYn: false})}/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' 
              checked={value.managementYn === true} 
              onChange={e => setValue({...value, managementYn: true})}/>설정
              <input name='managementYn' value="false" type='radio' 
              checked={value.managementYn === false} 
              onChange={e => setValue({...value, managementYn: false})}/>미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' 
              checked={value.includedYn === true} 
              onChange={e => setValue({...value, includedYn: true})}/>표시
              <input name='includedYn' value="false" type='radio' 
              checked={value.includedYn === false} 
              onChange={e => setValue({...value, includedYn: false})}/>미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={value.sortOrder}  
              onChange={e => setValue({...value, sortOrder: parseInt(e.target.value, 10)})}  />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
      {
        modalOn && <DeptModal value={value} setModalOn={setModalOn} setValue={setValue}/>
      }
      { noti && <Notification 
      message="변경 내용이 삭제됩니다. 일괄등록 시 임시저장을 눌러주세요"
      onClose={handleNotiClose} />}
    </Detail>
  )
}

function Notification ({ message, onClose }){
  return (
    <div>
      <p>{ message }</p>
      <button onClick={onClose}>임시저장</button>
      <button onClick={onClose}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
}

function useValid(changeValue){
  const initValid = {
    code: false,
    name: false,
    abbr: false,
  }
  const [validText, setText] = useState(initValid);
  const [isValid, setValid] = useState(initValid);

  useEffect(() => {
    const exp = /^[A-Za-z0-9]{8}$/;
    if (!exp.test(changeValue.code)) {
      setText({...validText, code: '8자리 :: 영어 대/소문자'})
      setValid({ ...isValid, code: false });
    } else {
      setText({...validText, code: ''});
      setValid({ ...isValid, code: true });
    }
  }, [changeValue.code]);

  useEffect(() => {
    const exp = /^[A-Za-z0-9]+$/;
    if (!exp.test(changeValue.name)) {
      setText({...validText, name: '/ 제외 특수문자 불가'})
      setValid({ ...isValid, name: false });
    } else {
      setText({...validText, name: ''});
      setValid({ ...isValid, name: true });
    }
  }, [changeValue.name]);

  useEffect(() => {
    const exp = /^[A-Za-z0-9]{6}$/;
    if (!exp.test(changeValue.abbr)) {
      setText({...validText, abbr:'6자리 :: 영어 대문자 :: 숫자'})
      setValid({ ...isValid, abbr: false });
    } else {
      setText({...validText, abbr:'8자리 :: 영어 대/소문자 :: 숫자'});
      setValid({ ...isValid, abbr: true });
    }
  }, [changeValue.abbr]);

  return { validText, isValid };
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