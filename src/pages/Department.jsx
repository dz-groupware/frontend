import { useState } from 'react';
import styled from 'styled-components';
import { addDepartment } from '../api/department';

export default function Department() {

  return (
    <>
      <DeptTitle>
        <div>부서관리</div>
        <div id = "deptBtn">
          <div>
            일괄등록
          </div>
          <div>
            추가
          </div>
          <div>
            변경이력
          </div>
          <hr />
          <div>
            즐겨찾기
          </div>
        </div>
      </DeptTitle>
      <div id = "deptInfo" style={{margin: '15px', padding: '15px', backgroundColor: '#4099ff', color: 'white', borderRadius: '10px'}}>
          회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
      </div>
      <DetailArea>
        <SearchArea>
          <SearchForm>
            <div>
              <div>
                <select>
                  <option>회사코드.회사명</option>
                </select>
              </div>
              <div style={{display: 'flex'}}>
                <input />
                <div>Btn</div>
              </div>
            </div>
            <div style={{display: 'flex', backgroundColor: 'white'}}>
              <div>조직도</div>
              <select>
                <option>필터</option>
              </select>
            </div>
          </SearchForm>
          <SearchTree>
            <DeptItem />
          </SearchTree>
        </SearchArea>
        <DeptDetail />
      </DetailArea>
    </>
  )
}



function DeptItem(){
  return (
    <>
      <div>
        회사코드.회사명
      </div>
    </>
  );
}

function DeptDetail(){
  const [detail, setDetail] = useState('basic');

  const handleAddDept = () => {
    const dept = new FormData(document.getElementById('basic'));
    addDepartment(dept).then();

  }
  
  return (
    <Content>
      <DetailTitle>
        <div>상세정보</div>
        <div>
          <div onClick={handleAddDept}>저장</div>
          <div>삭제</div>
          <div>X</div>
        </div>
      </DetailTitle>
      {detail === 'basic' ? <DeptDetailBasic /> : <DeptDetailEmp />}
    </Content>
  )
}

function DeptDetailBasic(){
  
  return (
    <Content>
    <BasicTitle>
      <div>
        <div style={{color: 'blue'}}>기본 정보</div> <hr /> <div>부서원 정보</div>
      </div>
    </BasicTitle>
    <BasicForm>
      <form id='basic'>
      <table>
        <tr>
          <td>
            상위부서
          </td>
          <td colspan="3">
            <input name="parId"/>(모달)
          </td>
        </tr>
        <tr>
          <td>
            부서코드
          </td>
          <td colspan="3">
            <input name="code"/>
          </td>
        </tr>
        <tr>
          <td>
            부서명
          </td>
          <td colspan="3">
            <input name="name"/>
          </td>
        </tr>
        <tr>
          <td>
            부서약칭
          </td>
          <td colspan="3">
            <input name="abbr"/>
          </td>
        </tr>
        <tr>
        <td style={{width: '20%'}}>
            사용여부
          </td>
          <td style={{width: '30%'}}>
            <input name='enabledYn' value="true" type='radio'/>사용<input name='enabledYn' value="false" type='radio'/>미사용
          </td>
          <td style={{width: '20%', backgroundColor: 'gray'}}>
            관리부서
          </td>
          <td style={{width: '30%', backgroundColor: ' #afe6ff'}}>
            <input name='managementYn' value="true" type='radio'/>설정<input name='managementYn' value="false" type='radio'/>미설정
          </td>
        </tr>
        <tr>
        <td style={{width: '20%'}}>
            조직도 표시
          </td>
          <td style={{width: '30%'}}>
            <input name='includedYn' value="true" type='radio'/>표시<input name='includedYn' value="false" type='radio'/>미표시
          </td>
          <td style={{width: '20%', backgroundColor: 'gray'}}>
            정렬
          </td>
          <td style={{width: '30%', backgroundColor: ' #afe6ff'}}>
            <input name='sortOrder' />
          </td>
        </tr>
      </table>
      </form>
    </BasicForm>
      
    </Content>
  )
}

const DeptTitle = styled.div`
width: 100%;
height: 30px;
padding: 20px;
font-size: large;
font-weight: bold;

display: flex;
justify-content: space-between;

> #deptBtn {
  display: flex;
  background-color: #c4c4c4;
  > * {
    margin: 10px;
    font-size: medium;
    font-weight: normal;
    width: 100px;    
  }
  > hr {
    width: 10px;
  }
}
`;
const DetailArea = styled.div`
display: flex;
width: calc(100% - 40px);
height: calc(100% - 80px);
`;
const Content = styled.div`
display: block;
width: 100%;
height: 100%;

`;
const SearchArea = styled.div`
width: 330px;
margin: 10px;
`;
const SearchForm = styled.div`
width: 300px;
height: 70px;
> select {
  width: 260px;
}
> input {
  width: 220px;
}
> svg {
  width: 30px;
}
> div {
  background-color: gray;
}
`;
const SearchTree = styled.div`
width: 300px;
height: calc(100% - 220px);
border: 1px solid gray;
`;
const BasicTitle = styled.div`
> div{
  display: flex;
}
`;
const DetailTitle = styled.div`
font-size: large;
display: flex;
justify-content: space-between;
width: 100%;
> div {
  display: flex;
  width: 100px;
}
`;
const BasicForm = styled.div`
width: 100%;
height: calc(100% - 100px);
> form {
overflow: scroll;
height: calc(100% - 100px);
&::-webkit-scrollbar{
  display: none;
}
> table {
  min-width: 700px;
  border-collapse: collapse;
  border: 1px solid gray;
  > tr {
    > td:nth-child(1) {
      background-color: #d9d9d9;
      width: 200px;
      font-size: medium;
      font-weight: bold;
      padding: 10px;
      text-align: right;
    }
    > td:nth-child(2) {
      background-color: #afe6ff;
      color: gray;
      width: 700px;
      font-size: small;
      padding: 10px;
      text-align: left;
    }
  }  
}
}
`;

function DeptDetailEmp(){
  return (
    <>
      <div>
        부서원 정보 페이지
      </div>
    </>
  )
}