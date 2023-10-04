import { useState } from 'react';

import styled from 'styled-components';

import { changeEmpApi } from '../../api/login';

export default function PosiList({ empId, modalOff, profile }) {
  const [radioEmpId, setRadioEmpId] = useState(empId);

  const handleRadio = (e) => {
    setRadioEmpId(e.target.value);
  }

  const handleAnotherEmp = () => {
    changeEmpApi(0, radioEmpId).then(res => {
      localStorage.setItem('empId', radioEmpId);
      window.location.href = '/';
    })
  }

  return (
    <ModalArea>
      <table>
        <tbody>
        <tr id='tHeader'>
          <td>회사명</td><td>부서명(관리부서)</td><td>상태</td>
        </tr>
          {
            profile.map((a, i) => (
              <tr key={a['empId']}>
                <td>
                  <input type='radio' name='a' value={a['empId']} checked={String(radioEmpId) === String(a['empId'])} onChange={handleRadio}/>
                  &nbsp;{a['compName']}
                </td>
                <td>
                  &nbsp;&nbsp;{a['deptName']}
                </td>
                <td>
                  {empId === a['empId'] && <Using />}
                </td>
              </tr>
            ))                   
          }
        </tbody>
      </table>
      <div id='modal_btn'>
        <ExitBtn onClick={modalOff}>취소</ExitBtn>
        <DoneBtn onClick={handleAnotherEmp}>확인</DoneBtn>
      </div>
    </ModalArea>
  );
}

function Using(){
  return (
      <div style={{color: 'rgb(40,175,20)', display:'flex', justifyContent:'center'}}>
          <img src={`${process.env.PUBLIC_URL}/img/use.PNG`} alt='useing' style={{width:'15px', height:'15px', marginTop:'5px'}}/>사용중
      </div>
  );
}

export const ModalArea = styled.div`
width:100%;
height:230px;
margin:0;
display: flex;
flex-direction: column;

> table {
  width: 560px;
  font-size: medium;
  height: 200px;

  > tbody {
    > #tHeader {
      background-color: rgb(230,230,250);
      text-align : center;
      font-weight: bold;
    } 

    > tr {
      > td {
        height: 20px;
        padding: 5px;
      }
      > nth:child(0) {
        width: 150px;
      }
      > nth:child(1) {
        width: 200px;
      }
      > nth:child(2) {
        width: 100px;
      }
    }
  }
}

> #modal_btn {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(230,230,250);
}
`;
const ModalBtn = styled.button`
display : flex;
justify-content : center;
border: none;
padding: 20px;
border-radius: 10px;
cursor: grab;
width:100px;
margin: 10px;
padding: 5px 10px;
width: 100px;
height: 40px;
align-items : center;
`;
const DoneBtn = styled(ModalBtn) `
background-color : rgb(21,21,72);
color: white;
`;
const ExitBtn = styled(ModalBtn) `
background-color : white;
color: black;
`;