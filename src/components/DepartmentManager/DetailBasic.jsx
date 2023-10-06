import { useEffect, useState } from 'react';
import styled from 'styled-components';

import DeptModal from './DeptModal';
import Swal from 'sweetalert2';

import { checkDeptCode } from '../../api/department';

export default function DetailBasic({ data, setData, detail, setDetail, pageId }){
  const [modalOn, setModalOn] = useState(false);
  const [form, setForm] = useState('');
  const [isModified, setIsModified] = useState(false);
  const [useableCode, setUseableCode] = useState(false);
  const [noti, setNoti] = useState(false);
  const [isValid, setIsValid] = useState({code: false, abbr: false, name: false});
  const [validText, setValidText] = useState({code: '', abbr: '', name: ''});

  // 수정
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("handleInputChange : ",value);
    setForm({ ...form, [name]:value });
    setIsModified(true);
  }
  // 수정 없음
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
  // 유효성 검사
  const handleCheckCode = () => {
    const { validText, isValid } = validate(form);
    setValidText(validText);
    setIsValid(isValid);
    if(isValid.code) {
      console.log('중복검사 : 코드 유효성 충족 : ', isValid.code, form.code);
      try {
        // api 요청
        checkDeptCode(form.id, form.code, pageId).then(res => {
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
      console.log('중복검사 : 코드 유효성 불충족 : ', isValid.code, form.code);
    }
  };
  // 저장 
  const saveAlert = () => {
    Swal.fire({
      title: '저장하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        if (detail.id === 0) {
          // 저장 : 추가
          setData({ ...form, status: 'add' });    
          setIsModified(false);  
        }
        if (detail.id > 0) {
          // 저장 : 수정
          setData({ ...form, status: 'modify' });    
          setIsModified(false);  
        } else {
          console.log('저장 요청 실패 : 알수없는 요청(id)');
        }
  
      }
      if (result.isDismissed) {
        console.log('취소 클릭');
        setDetail({ ...detail, state: false, isChanging: false });
      }
    });
  }
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
    // 다른 부서를 눌렀을 때
    console.log('useEffect 오나')
    if ( typeof detail.isChanging === 'number' ) {
      if(isModified){
        console.log("수정 중 : ", isModified)
        setNoti(true);
      } else {
        console.log("수정 중 아님 : ", detail.isChanging)
        setDetail({ ...detail, id: detail.isChanging, state: false, isChanging: false });
      }
    }
  }, [detail.isChanging]);

  useEffect(() => {    
    // 저장
    if (detail.state === 'save') {
      console.log('저장 클릭');
      if (isModified){
        const { validText, isValid } = validate(form);
        setValidText(validText);
        setIsValid(isValid);  
        if (isValid.code && isValid.abbr && isValid.name) {
          saveAlert();
        } else {
          console.log('valid : no');
        }
      } else {
        handleNotModified();
        setDetail({ ...detail, state: detail.isChanging, isChanging: false });
      }
    }
  }, [detail.state]);
  // 다른 아이템을 눌렀을 때
  useEffect(() => {
    if (noti) {
      Swal.fire({
        title: "페이지 이동",
        text: "수정 중인 내용은 모두 삭제 됩니다.",
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log(result)
        if (result.isConfirmed) {
          console.log('수정 삭제 후 이동');
          setDetail({ ...detail, id: detail.isChanging, state: false, isChanging: false });
          setIsModified(false);
        } else if (result.isDismissed) {
          console.log('취소');
          setDetail({ ...detail, isChanging: false });
        }
      })
      setNoti(false);
    }
  }, [noti]);

  useEffect(() => {
    console.log('모달 ', console.log(data.parId, form.parId));
    if (modalOn === true && data.parId !== form.parId) {
      console.log('상위부서 변경');
      setIsModified(true);
    }
  }, [modalOn]);

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

  // console.log(detail)
  // console.log(isValid);
  // console.log(validText);

  // useEffect(()=>{
    
  //   // 저장 버튼을 눌렀을 때
  //   if (detail.state === 'save'){
  //     if (isModified) {
  //       validate(form);
  //       if (isValid.code && isValid.abbr && isValid.name && useableCode) {
  //         console.log('유효성 통과');
  //         setData(form); 
  //         setDetail({ ...detail, state: 'save', save: true }); // state: true? false?
  //         setIsModified(false);
  //       } else {
  //         console.log(isValid.code, isValid.abbr, isValid.name, useableCode);
  //         console.log('유효성 검사 불충족');
  //         setDetail({ ...detail, state: false, save: false });
  //       }  
  //     } else {
  //       handleNotModified();
  //       setDetail({ ...detail, state: false, save: false });
  //     }
  //   }
  //   // 임시저장 눌렀을 때
  //   if (detail.state === 'tmpSave') {
  //     setData(form); 
  //     setDetail({ ...detail, state:'tmp', save: false }); // state: true? false?
  //     setIsModified(false);
  //   }
  //   if (detail.state === 'tmpSaveButton') {
  //     console.log('tlqkf wlsWk wpqkf')
  //     setData(form); 
  //     setDetail({ ...detail, state:'tmp', save: true }); // state: true? false?
  //     setIsModified(false);
  //   }
  // },[detail.state]);

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
              data-valid={!isValid.code} disabled={useableCode} className={`input ${useableCode}`}/> 
              {useableCode ? 
              <CheckBtn onClick={() => setUseableCode(false)} >다른 부서 코드 사용</CheckBtn> 
              : <CancelBtn onClick={handleCheckCode}>중복 검사</CancelBtn>}<div>{validText.code}</div>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input className='input' name='name' placeholder='부서명을 입력하세요'
              value={form.name}  onChange={handleInputChange} 
              data-valid={!isValid.name}/> <div>{validText.name}</div>
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input className='input' name='abbr' placeholder='부서약칭을 입력하세요'
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

function validate(form) {
  const codeExp = /^[A-Za-z0-9]{1,8}$/;
  const nameExp = /^[A-Za-z0-9\d가-힣/]{1,10}$/;
  const abbrExp = /^[A-Za-z0-9]{1,6}$/;

  const codeIsValid = codeExp.test(form.code);
  const nameIsValid = nameExp.test(form.name);
  const abbrIsValid = abbrExp.test(form.abbr);

  const isValid = {
    code : codeExp.test(form.code),
    name : nameExp.test(form.name),
    abbr : abbrExp.test(form.abbr),
  }

  const validText = {
    code : codeIsValid ? '' : '8자리 이하 :: 영어 대/소문자',
    name : nameIsValid ? '' : '10잘자리 이하 :: / 제외 특수문자 불가',
    abbr : abbrIsValid ? '' : '6자리 이하 :: 영어 대/소문자',
  };

  console.log('in validate : ', validText, isValid);
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
          height: 50px;
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
          color: #151414;
          width: 90%;
          min-width: 300px;
          height: 50px;
          font-size: medium;
          font-weight: bold;
          padding: 10px;
          text-align: left;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          > .true{
            background-color: rgb(188,237,196);
          }
          > .input {
            width: 300px;
            height: 30px;
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
        color: #151414;
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
          height: 50px;
        }
        > .data {
          display: flex;
          background-color:  white;
          color: #151414;
          width: 80%;
          min-width: 300px;
          font-size: medium;
          font-weight: 200;
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid gray;
          height: 50px;
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