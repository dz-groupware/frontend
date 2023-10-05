import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DeptModal from './DeptModal';
import Swal from 'sweetalert2';

import { checkDeptCode } from '../../api/department';

export default function DetailBasic({ data, setData, detail, setDetail, pageId }){
  const [modalOn, setModalOn] = useState(false);
  const [form, setForm] = useState('');
  const { validText, isValid, validate } = useValid(form);
  const [isModified, setIsModified] = useState(false);
  const [useableCode, setUseableCode] = useState(false);
  const [noti, setNoti] = useState(false);

  // console.log("modify : ", isModified);
  // console.log("useableCode : ", useableCode);

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

  const handleCheckCode = () => {
    // 유효성 검사
    validate(form);
    if(isValid.code) {
      console.log('중복검사 : 코드 유효성 충족');
      try {
        // api 요청
        checkDeptCode(form.id, form.code, pageId).then(res => {
          console.log("checkDeptCode : ", typeof res.data.data , res.data);
          if(res.data.data === "true" || res.data.data === true){
            let timerInterval
            Swal.fire({
              title: '사용 가능한 코드 입니다.',
              timer: 1500,
              timerProgressBar: false,
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
            setUseableCode(true);
          } else {
            let timerInterval
            Swal.fire({
              title: '사용할 수 없는 코드 입니다',
              timer: 1500,
              timerProgressBar: false,
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
          }
        });
      } catch (error) {
        console.log('중복 검사 요청 에러 : ', error);
      }  
    } else {
      console.log('중복검사 : 코드 유효성 불충족');
    }
  }

  const handleNotModified = () => {
    let timerInterval
    Swal.fire({
      title: '수정 사항이 없습니다',
      html: '저장되지 않음',
      timer: 1500,
      timerProgressBar: false,
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  };


  useEffect(()=>{
    setForm(data);
    setIsModified(false);
    if(data.id !== 0) {
      setUseableCode(true);
    }
  },[]);
  
  useEffect(()=>{
    setUseableCode(false);
    if (data !== undefined){
      setForm(data);
      if(data.id !== 0) {
        setUseableCode(true);
      }
    }
  },[data]);

  useEffect(() => {
    if (noti) {
      Swal.fire({
        title: "페이지 이동",
        text: "수정 중인 내용은 모두 삭제 됩니다.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '임시저장',
        denyButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log(result)
        if (result.isConfirmed) {
          console.log('임시저장');
          Swal.fire('임시저장 되었습니다', '', 'success');
          // setForm([ ...form, value ]);
          setDetail({ ...detail, isChanging: detail.state, state: 'tmpSave', save:false }); // state는 남기고 save는 false 특수하게 DetailBasic에서 isModified를 false 해줘야 하기 때문에
          setIsModified(false);
        } else if (result.isDenied) {
          console.log('수정 삭제 후 이동');
          setDetail({ ...detail, id: detail.state, state: false });
          setIsModified(false);
        } else if (result.isDismissed) {
          console.log('취소');
          setDetail({ ...detail, state: false });
        }
      })
      setNoti(false);
    }
  }, [noti]);

  useEffect(()=>{
    // 다른 부서를 눌렀을 때
    if (typeof detail.state === 'number'){
      if(isModified){
        console.log("수정 중 : ", isModified)
        setNoti(true);
      } else {
        setDetail({ ...detail, id: detail.state, state: false });
      }
    }
    // 저장 버튼을 눌렀을 때
    if (detail.state === 'save'){
      if (isModified) {
        validate(form);
        if (isValid.code && isValid.abbr && isValid.name && useableCode) {
          console.log('유효성 통과');
          setData(form); 
          setDetail({ ...detail, state: 'save', save: true }); // state: true? false?
          setIsModified(false);
        } else {
          console.log(isValid.code, isValid.abbr, isValid.name, useableCode);
          console.log('유효성 검사 불충족');
          setDetail({ ...detail, state: false, save: false });
        }  
      } else {
        handleNotModified();
        setDetail({ ...detail, state: false, save: false });
      }
    }
    // 임시저장 눌렀을 때
    if (detail.state === 'tmpSave') {
      setData(form); 
      setDetail({ ...detail, state:'tmp', save: false }); // state: true? false?
      setIsModified(false);
    }
    if (detail.state === 'tmpSaveButton') {
      console.log('tlqkf wlsWk wpqkf')
      setData(form); 
      setDetail({ ...detail, state:'tmp', save: true }); // state: true? false?
      setIsModified(false);
    }
  },[detail.state]);

  useEffect(() => {
  },[detail.id]);



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
              data-valid={!isValid.code} disabled={useableCode} className={useableCode}/> 
              {useableCode ? 
              <CheckBtn onClick={() => setUseableCode(false)} >다른 부서 코드 사용</CheckBtn> 
              : <CancelBtn onClick={handleCheckCode}>중복 검사</CancelBtn>}<div>{validText.code}</div>
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
        modalOn && <DeptModal form={form} setModalOn={setModalOn} setForm={setForm} pageId={pageId}/>
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
    const codeExp = /^[A-Za-z0-9]{1,8}$/;
    const nameExp = /^[A-Za-z0-9\d가-힣/]{1,10}$/;
    const abbrExp = /^[A-Z0-9]{1,6}$/;

    const codeIsValid = codeExp.test(form.code);
    const nameIsValid = nameExp.test(form.name);
    const abbrIsValid = abbrExp.test(form.abbr);

    setValid({
      code : codeIsValid,
      name : nameIsValid,
      abbr : abbrIsValid,
    });

    setText({
      code : codeIsValid ? '' : '8자리 이하 :: 영어 대/소문자',
      name : nameIsValid ? '' : '10잘자리 이하 :: / 제외 특수문자 불가',
      abbr : abbrIsValid ? '' : '6자리 이하 :: 영어 대/소문자',
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
> #basic {
  > table {
    width: 100%;
    > tbody {
      min-width: 700px;
      border-collapse: collapse;
      > tr {
        display: flex;
        > td:nth-child(1) {
          display: flex;
          background-color: rgb(240,245,248);
          width: 10%;
          min-width: 150px;
          font-size: medium;
          font-weight: bold;
          padding: 10px;
          text-align: right;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
        }
        > td:nth-child(2) {
          display: flex;
          background-color:  white;
          color: gray;
          width: 90%;
          min-width: 300px;
          font-size: small;
          padding: 10px;
          text-align: left;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          > .true{
            background-color: rgb(188,237,196);
          }
        }
        > td {
          display: flex;
          > .readOnly {
            display: none;
          }
        }
      }
      > tr {
        > .field{
          display: flex;
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
          display: flex;
          background-color:  white;
          color: gray;
          width: 80%;
          min-width: 300px;
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
    display: flex;
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
      display: flex;
      padding: 10px;
      width: 25%;
      min-width: 100px;
    }
  }
}
`;
const CheckBtn = styled.div`
background-color: rgb(214,236,248);
color: black;
border: 1px solid rgb(146,183,214);
border-radius: 5px;
margin-left: 20px;
font-weight: 100;
padding: 5px;
`;
const CancelBtn = styled.div`
background-color: rgb(214,236,248);
color: black;
border: 1px solid rgb(146,183,214);
border-radius: 5px;
margin-left: 20px;
font-weight: 100;
padding: 5px;
`;