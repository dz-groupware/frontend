import { useState } from 'react';

import styled from 'styled-components';

import { changeEmpApi } from '../../api/login';
import { ButtonBright, ButtonDarkBlue } from '../../common/styles/Button';
export default function PosiList({ empId, modalOff, profile }) {
  const [radioEmpId, setRadioEmpId] = useState(empId);

  const handleRadio = (e) => {
    setRadioEmpId(e.target.value);
  }

  const handleAnotherEmp = () => {
    try {
      changeEmpApi(empId).then(() => {
        localStorage.setItem('empId', radioEmpId);
        window.location.href = '/';
      });  
    } catch (error) {
      console.log('error switch emp');
    }
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
              <tr key={a['empId']+"/"+i}>
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
          {
            profile.length < 3 && 
            new Array(3-profile.length).fill(null).map ((a, i) => (
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div id='modal_btn'>
        <ButtonBright onClick={modalOff}>취소</ButtonBright>
        <ButtonDarkBlue onClick={handleAnotherEmp}>확인</ButtonDarkBlue>
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

const ModalArea = styled.div`
width: 100%;
height: 100%;
padding: 5px 30px 5px 30px;
font-size: medium;
> table > tbody {
  height: 120px;
  > tr > td {
    height: 30px;
  }

  > #tHeader {
    background-color: #318dfc;
    color: white;
    text-align : center;
    font-weight: bold;
  }
  > tr {
    > td:nth-child(1) {
      width: 140px;
      padding: 10px;
      border: 1px solid #e3e8ed;
    }
    > td:nth-child(2) {
      width: 200px;
      border: 1px solid #e3e8ed;
    }
    > td:nth-child(3) {
      width: 85px;
      border: 1px solid #e3e8ed;
    }
  }
}

> #modal_btn {
  display: flex;
  justify-content: center;
  width: 100%;
  > * {
    margin: 5px;
    padding: 10px 15px 10px 15px;
  }
}
`;

