import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const StyledModal = styled.div`
width:450px;
height:100px;
margin:0;

> table {
  width: 450px;
  > tbody {
    #tHeader {
      background-color: rgb(230,230,250);
      text-align : center;
      font-weight: bold;
    } 
    > tr {
      > nth:child(0) {
        {width: 150px;
      }
      > nth:child(1) {
        {width: 200px;
      }
      > nth:child(2) {
        {width: 100px;
      }
    }
  }
}
`
export default function PosiList() {
  const datas = useSelector(state => state.gnbMenu.profileList);
  const emp_id = useSelector(state => state.gnbMenu.key);

  return (
    <StyledModal>
      <table>
        <tbody>
        <tr id='tHeader'>
          <td>회사명</td><td>부서명(관리부서)</td><td>상태</td>
        </tr>
          {
            datas.map((a, i) => (
              <tr key={i}>
              <td><input type='radio' name='a' value={a['empId']}/>&nbsp;{a['compName']}</td><td>&nbsp;&nbsp;{a['deptName']}</td><td>{emp_id === a['empId'] && <Using />}</td>
            </tr>
            ))                   
          }
        </tbody>
      </table>
    </StyledModal>
  );
}

export function Using(){
  return (
      <div style={{color: 'rgb(40,175,20)', display:'flex', justifyContent:'center'}}>
          <img src={`${process.env.PUBLIC_URL}/img/use.PNG`} alt='useing' style={{width:'15px', height:'15px', marginTop:'5px'}}/>사용중
      </div>
  )
}