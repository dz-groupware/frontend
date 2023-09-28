import styled from 'styled-components';

export default function DetailEmp({ empList }){
  return (
    <BasicForm>
      <div>
        <table>
          <tbody>
          <tr className="detailEmpTitle">
            <td>부서</td>
            <td>직책</td>
            <td>사용자명</td>
            <td>정렬순서</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="detailEmpBody">
        <table>
        <tbody>
          {
            empList.map((a, i) => (
              <tr>
                <td>{a['deptName']}</td>
                <td>{a['position']}</td>
                <td>{a['empName']}</td>
                <td>{a['sortOrder']}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </BasicForm>
  );
};

const BasicForm = styled.div`
width: 100%;
height: calc(100% - 100px);
> form {
> table {
  min-width: 700px;
  border-collapse: collapse;
  > tbody > tr {
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
    }
    > tbody > tr {
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

  > tbody > tr > td {
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
  > tbody > .detailEmpTitle { 
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