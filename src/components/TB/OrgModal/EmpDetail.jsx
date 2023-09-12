import styled from 'styled-components';

export default function EmpDetail(props) {
  return (
    <DetailEmp>
      <div>
        <img src={props.list['imageUrl']} alt='p_img'/>
        <p>{props.list['empName']} / {props.list['position']}</p>
      </div>
      <table>
        <tbody>
          <tr>
            <td>소속부서</td><td>{props.list['compName']} &#62; {props.list['deptName']}</td>
          </tr>
          <tr>
            <td>전화번호</td><td>{props.list['number']}</td>
          </tr>
          <tr>
            <td>개인메일</td><td>{props.list['email']}</td>
          </tr>
        </tbody>
      </table>
    </DetailEmp>
  );
}

const DetailEmp = styled.div`
margin-top : 5px;
width: 250px;
height: 100%;
border : 1px gray solid;

> div {
  margin: 10px;
  text-align: center;
  background-color:rgb(240, 245, 248);
  border: 1px solid rgb(192, 185, 237);
  border-radius: 5px;

  > img {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    border-radius: 100%;
  }

  > p {
    margin: 10px;
    font-weight: bold;
    font-size: large;
  }
}

> table {
  margin: 10px;
  height: 10;  

  > tbody {
  margin: 10px;
  border-collapse: collapse;
  border-top: 3px solid black;
  
    > tr :nth-child(1) {
      margin: 5px;
      background-color: rgb(240, 245, 248);
      border-bottom: 1px solid rgb(192, 185, 237);
      width: 75px;
      padding: 5px;
    }

    > tr :nth-child(2) {
      border-bottom: 1px solid rgb(192, 185, 237);
      width: calc(100% - 65px);
      padding: 5px;
    }
  }
}
`;