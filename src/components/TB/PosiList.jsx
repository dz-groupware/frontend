import { useState } from 'react';

import { changeEmpApi } from '../../api/login';

import { ModalArea, DoneBtn, ExitBtn } from '../../common/Modal/Modal';

export default function PosiList({ empId, modalOff, profile }) {
  const [radioEmpId, setRadioEmpId] = useState(empId);

  const handleRadio = (e) => {
    setRadioEmpId(e.target.value);
  }

  const handleAnotherEmp = () => {
    changeEmpApi().then(res => {
      localStorage.setItem('empId', radioEmpId);
      window.location.href = '/';
    });
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