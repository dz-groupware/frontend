import { useEffect, useState } from "react";
import styled from "styled-components";

import DeptModal from "./DeptModal";
import Swal from "sweetalert2";

import { checkDeptCode } from "../../api/department";

export default function DetailBasic({ data, setData, detail, setDetail, pageId, disabled, setDisabled }){
  const [modalOn, setModalOn] = useState(false);
  const [form, setForm] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [useableCode, setUseableCode] = useState(false);
  const [isValid, setIsValid] = useState({code: false, abbr: false, name: false});
  const [validText, setValidText] = useState({code: "", abbr: "", name: ""});

  // 수정
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]:value });
    setIsModified(true);
  }
  const handleParChange = (parId, parName) => {
    setIsModified(true);
    setForm({ ...form, parId: parId, parName: parName });
  }
  // 유효성 검사
  const handleCheckCode = () => {
    const { validText, isValid } = validate(form);
    setValidText(validText);
    setIsValid(isValid);
    if(isValid.code) {
      console.log("중복검사 : 코드 유효성 충족 : ", isValid.code, form.code);
      try {
        // api 요청
        checkDeptCode(form.id, form.code, pageId).then(res => {
          if(res.data.data === "true" || res.data.data === true){
            let timerInterval
            Swal.fire({
              title: "사용 가능한 코드 입니다.",
              timer: 1500,
              timerProgressBar: false,
              showCancelButton: false,
              showConfirmButton: false,
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
            setUseableCode(true);
          } else {
            let timerInterval
            Swal.fire({
              title: "사용할 수 없는 코드 입니다",
              timer: 1500,
              timerProgressBar: false,
              showCancelButton: false,
              showConfirmButton: false,
              willClose: () => {
                clearInterval(timerInterval)
              }
            })
          }
        });
      } catch (error) {
        console.log("중복 검사 요청 에러 : ", error);
      }  
    } else {
      console.log("중복검사 : 코드 유효성 불충족 : ", isValid.code, form.code);
      setDetail({ ...detail, state: false, isChanging: false });
    }
  };
  // 저장 알림
  const saveAlert = () => {
    Swal.fire({
      title: "저장하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (detail.id === 0 || detail.id === "0") {
          // 저장 : 추가
          setData({ ...form, status: "add" });    
          setIsModified(false);  
        } else if (detail.id > 0) {
          setData({ ...form, status: "modify" });    
          setIsModified(false);    
        } else {
          Swal.fire({
            text: "저장에 실패하였습니다.",
            icon: "error",
            showCancelButton: false,
            showConfirmButton: false,
          });
          // 저장 이전 상태로 되돌리기
          setDetail({ ...detail, state: false, isChanging: false });
        };
      };
      if (result.isDismissed) {
        setDetail({ ...detail, state: false, isChanging: false });
      };
    });
  }
  // 수정 중 이동 알림
  const confirmAlert = () => {
    Swal.fire({
      title: "페이지 이동",
      text: "수정 중인 내용은 모두 삭제 됩니다.",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setDetail({ ...detail, id: detail.isChanging, state: false, save: false, isChanging: false });
        setIsModified(false);
        setValidText({code: "", abbr: "", name: ""});
      } else if (result.isDismissed) {
        setDetail({ ...detail, isChanging: false });
      };
    });
  };
  // 수정 없음
  const noChangesAlert = () => {
    let timerInterval
    Swal.fire({
      title: "수정 사항이 없습니다",
      html: "저장되지 않음",
      timer: 1500,
      timerProgressBar: false,
      showCancelButton: false,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  };

  //useEffect
  useEffect(()=>{
    setUseableCode(false);
    if (data !== undefined){
      setForm(data);
      setIsModified(false);
      if(data.id !== 0) {
        setUseableCode(true);
      }
    }
  },[data]);
  
  useEffect(() => {
    if (modalOn === true && data.parId !== form.parId) {
      setIsModified(true);
    }
  }, [modalOn]);

  // 페이지 동작 감지
  useEffect(() => {
    // 다른 부서를 눌렀을 때
    if (typeof detail.isChanging === "number" && detail.type === "emp") {
      setDetail({ ...detail, id: detail.isChanging, isChanging: false });
    };
    if (typeof detail.isChanging === "number" && detail.type === "basic") {
      if(isModified){
        confirmAlert();
      } else {
        setDetail({ ...detail, id: detail.isChanging, state: false, save: false, isChanging: false });
        setValidText({code: "", abbr: "", name: ""});
      };
    };
    if (detail.isChanging === "save" && detail.type === "basic") {
      if(isModified){
        const { validText, isValid } = validate(form);
        setValidText(validText);
        setIsValid(isValid);  
        if (isValid.code && isValid.abbr && isValid.name) {
          saveAlert();
        } else {
          Swal.fire({
            title: "입력한 값을 확인해주세요",
            icon: "warning",
            showCancelButton: false,
            showConfirmButton: false
          });
          // 저장버튼을 누르기 전의 값으로 바꿈
          setDetail({ ...detail, state: detail.isChanging, isChanging: false });
        };
      } else {
        noChangesAlert();
        setDetail({ ...detail, state: detail.isChanging, isChanging: false });
      };
    };
  }, [detail.isChanging]);

  return (
    <Detail>
      <BasicForm>
        <form id="basic">
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
              <input 
                name="code" 
                placeholder="부서코드를 입력하세요"
                value={form.code} 
                onChange={handleInputChange}
                data-valid={!isValid.code} 
                disabled={useableCode} 
                className={`input ${useableCode}`}
                maxLength="15"
              /> 
              {useableCode ? 
              <CheckBtn className={`${disabled ? "disabled" : "abled"}`} onClick={() => setUseableCode(false)} >다른 부서 코드 사용</CheckBtn> 
              : <CancelBtn className={`${disabled ? "disabled" : "abled"}`} onClick={handleCheckCode}>중복 검사</CancelBtn>}<div>{validText.code}</div>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input 
              className="input" 
              name="name" 
              placeholder="부서명을 입력하세요"
              value={form.name}  
              onChange={handleInputChange} 
              maxLength="50"
              data-valid={!isValid.name}
              /> <div>{validText.name}</div>
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input 
              className="input" 
              name="abbr" 
              placeholder="부서약칭을 입력하세요"
              value={form.abbr}  
              onChange={handleInputChange}
              maxLength="15"
              data-valid={!isValid.abbr} 
              /> <div>{validText.abbr}</div>
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name="enabledYn" value="true" type="radio" 
              checked={form.enabledYn === true } 
              onChange={e => setForm({...form, enabledYn: true})}/><p>사용</p>
              <input name="enabledYn" value="false" type="radio" 
              checked={form.enabledYn === false} 
              onChange={e => setForm({...form, enabledYn: false})}/><p>미사용</p>
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name="managementYn" value="true" type="radio" 
              checked={form.managementYn === true} 
              onChange={e => setForm({...form, managementYn: true})}/><p>설정</p>
              <input name="managementYn" value="false" type="radio" 
              checked={form.managementYn === false} 
              onChange={e => setForm({...form, managementYn: false})}/><p>미설정</p>
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name="includedYn" value="true" type="radio" 
              checked={form.includedYn === true} 
              onChange={e => setForm({...form, includedYn: true})}/><p>표시</p>
              <input name="includedYn" value="false" type="radio" 
              checked={form.includedYn === false} 
              onChange={e => setForm({...form, includedYn: false})}/><p>미표시</p>
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input 
              name="sortOrder" 
              type="number" 
              value={form.sortOrder} 
              className="input"
              maxLength="5"
              min="0"
              step="1"
              onInput={(e) => {
                if (e.target.value.length > 5) {
                  e.target.value = e.target.value.slice(0, 5);
                }
              }}
              onChange={e => setForm({...form, sortOrder: parseInt(e.target.value, 10)})}  
              />
            </td>
          </tr>
          </tbody>
        </table>
        </form>
      </BasicForm>
      {
        modalOn && <DeptModal itemId={form.id} setModalOn={setModalOn} handleParChange={handleParChange} pageId={pageId}/>
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
    code : codeIsValid ? "" : "8자리 이하 :: 영어 대/소문자",
    name : nameIsValid ? "" : "10잘자리 이하 :: / 제외 특수문자 불가",
    abbr : abbrIsValid ? "" : "6자리 이하 :: 영어 대/소문자",
  };

  return { validText, isValid };
};

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
          background-color: #f2f3f6;
          width: 16.5%;
          min-width: 100px;
          height: 40px;
          font-size: medium;
          font-weight: bold;
          padding: 10px;
          text-align: right;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          &.field{
          display: flex;
          background-color: #f2f3f6;
          width: 32%;
          min-width: 100px;
          font-size: medium;
          font-weight: bold;
          padding: 10px;
          text-align: right;
          border-bottom: 1px solid gray;
          height: 40px;
        }
        }
        > td:nth-child(2) {
          display: flex;
          background-color:  white;
          color: #151414;
          width: 83.5%;
          min-width: 250px;
          height: 40px;
          font-size: medium;
          font-weight: bold;
          padding: 5px;
          text-align: left;
          border-top: 1px solid gray;
          border-bottom: 1px solid gray;
          &.data {
          display: flex;
          background-color:  white;
          color: #151414;
          width: 68%;
          min-width: 250px;
          font-size: medium;
          font-weight: 200;
          padding: 5px;
          text-align: left;
          border-bottom: 1px solid gray;
          height: 40px;
          > p {
            padding-top: 5px;
            margin: 0 5px 0 5px;
          }
        }
          > .true{
            background-color: rgb(188,237,196);
          }
          > .input {
            padding-left: 5px;
            width: 300px;
            height: 25px;
          }
          > textarea {
            padding: 5px 0 0 5px;
            width: 300px;
            height: 25px;
            resize: none;
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
          background-color: #f2f3f6;
          width: 32%;
          min-width: 100px;
          font-size: medium;
          font-weight: bold;
          padding: 10px;
          text-align: right;
          border-bottom: 1px solid gray;
          height: 40px;
        }
        > .data {
          display: flex;
          background-color:  white;
          color: #151414;
          width: 68%;
          min-width: 250px;
          font-size: medium;
          font-weight: 200;
          padding: 5px;
          text-align: left;
          border-bottom: 1px solid gray;
          height: 40px;
          > .input {
            width: 200px;
            padding-left: 5px;
            height: 25px;
          }
          > p {
            padding-top: 5px;
            margin: 0 5px 0 5px;
          }
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
    height: 40px;
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
&.disabled{
  pointer-events: none;
  opacity: 0.5;
}
`;
const CancelBtn = styled.div`
background-color: rgb(214,236,248);
color: black;
border: 1px solid rgb(146,183,214);
border-radius: 5px;
margin-left: 20px;
font-weight: 100;
padding: 5px;
&.disabled{
  pointer-events: none;
  opacity: 0.5;
}
`;