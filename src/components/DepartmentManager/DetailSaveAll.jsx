import styled from 'styled-components';

export default function DetailSaveAll(props) {
  return (
    <ModalBackdrop onClick={() => props.setModalSaveAll(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='saveAllTitle'>
        <div>일괄저장</div>
        <button>확인</button>
          <span onClick={() => props.setModalSaveAll(false)}>x</span>
        </div>
        <FormArea>
          <div>
          {
            props.form.map((a, i) => (
              <FormList value={a} setModalSaveAll={props.setModalSaveAll} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </FormArea>
      </ModalView>
    </ModalBackdrop>
  );
}

function FormList(props) {
  return (
    <BasicForm>
      <div style={{display: 'flex'}}><div>*모든 필드를 채워주세요</div> ...<div>삭제</div></div>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea value={props.value['parName']} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input name="code" value={props.value['code']} />
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input name="name" value={props.value['name']} />
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input name="abbr" value={props.value['abbr']} />
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' checked={props.value['enabledYn'] === 'true' || props.value['enabledYn'] === true }  readOnly/>사용
              <input name='enabledYn' value="false" type='radio' checked={props.value['enabledYn'] === 'false' || props.value['enabledYn'] === false} readOnly/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' checked={props.value['managementYn'] === 'true' || props.value['managementYn'] === true}  readOnly/>설정
              <input name='managementYn' value="false" type='radio' checked={props.value['managementYn'] === 'false' || props.value['managementYn'] === false} readOnly />미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' checked={props.value['includedYn'] === 'true' || props.value['includedYn'] === true} readOnly />표시
              <input name='includedYn' value="false" type='radio' checked={props.value['includedYn'] === 'false' || props.value['includedYn'] === false} readOnly />미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={props.value['sortOrder']} />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
  )
}

export const ModalBackdrop = styled.div`
z-index: 1; 
position: fixed;
display : flex;
justify-content : center;
align-items : center;
border-radius: 10px;
top : 0;
left : 0;
right : 0;
bottom : 0;
width:100%;
height:100%;
`;
export const ModalView = styled.div`
position: absolute;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 1000px;
height: 550px;
color: black;
background-color: rgb(146,183,214);
z-index:2;
> #saveAllTitle {
  display: flex;
  justify-content: space-around;
  height: 30px;
  font-size: large;
  font-weight: bold;
  margin: 20px;
}
`;
export const FormArea = styled.div`
width: 100%;
height: 100%;
padding: 10px;

> div {
  background-color: white;
  width: 100%;
  height: 450px;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
`;
const BasicForm = styled.div`
width: 100%;
height: 100%;
> form {
> table {
  min-width: 500px;
  border-collapse: collapse;
  > tr {
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
      min-width: 350px;
      font-size: small;
      padding: 10px;
      text-align: left;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    > td {
      > .readOnly {
        display: none;
      }
    }
    }
  > tr {
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

  > tr > td {
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
      padding: 10px;
      width: 25%;
      min-width: 100px;
    }
  }
}
`;