import styled from 'styled-components';

export const StyledModal = styled.div`
width:450px;
height:100px;
margin:0;

> table {
  width: 450px;

  > .tHeader {
    background-color: rgb(230,230,250);
    text-align : center;
    font-weight: bold;
  }
}

`
export default function PosiList() {
  const dummyData = JSON.parse('[{"emp_id":"1", "comp_name":"회사A", "dept_name":"부서A"}, {"emp_id":"4", "comp_name":"회사A", "dept_name":"부서B"}]')
  const emp_id=1;

  return (
    <StyledModal>
      <table>
        <tbody>
        <tr className='tHeader'>
          <td style={{width:'150px'}}>회사명</td><td style={{width:'200px'}}>부서명(관리부서)</td><td style={{width:'100px'}}>상태</td>
        </tr>
          {
            dummyData.map((a, i) => (
              <tr key={i}>
              <td><input type='radio' name='a' value={a['emp_id']}/>&nbsp;{a['comp_name']}</td><td>&nbsp;&nbsp;{a['dept_name']}</td><td>{emp_id === a['emp_id'] && <Using />}</td>
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