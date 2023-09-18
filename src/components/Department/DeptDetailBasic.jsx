import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getDepartemnt, getDepartmentList } from '../../api/department';

export default function DeptDetailBasic(props){
  const [modalOn, setModalOn] = useState(false);
  const handleRadio = (e) => {
    if (e.target.name === "enabledYn"){
      props.setEnabledYn(e.target.value);
    }
    if (e.target.name === "managementYn"){
      props.setManagementYn(e.target.value);
    }
    if (e.target.name === "includedYn"){
      props.setIncludedYn(e.target.value);
    }
    props.isModified.current = true;
  };

  const handleChange = (e) => {
    if (e.target.name === 'parId') {
      props.setParId(e.target.value);
    }
    if (e.target.name === 'name') {
      props.setName(e.target.value);
    }
    if (e.target.name === 'abbr') {
      props.setAbbr(e.target.value);
    }
    if (e.target.name === 'code') {
      props.setCode(e.target.value);
    }
    if (e.target.name === 'sortOrder') {
      props.setSortOrder(e.target.value);
    }
    props.isModified.current = true;
  }

  const handleParDept = (value) => {
    props.setParId(value['id']);
    props.setParName(value['name']);
  }

  return (
    <Detail>
      <BasicForm>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea value={props.parName === undefined ? "" : props.parName} onClick={()=>setModalOn(true)} readOnly></textarea>
              <textarea name='parId' className='readOnly' value={props.parId === undefined ? "" : props.parId} readOnly></textarea>
              <textarea className='readOnly' value={props.Id === undefined ? "" : props.id} readOnly></textarea>

            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input name="code" value={props.code}  onChange={handleChange}/>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input name="name" value={props.name} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input name="abbr" value={props.abbr} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' checked={props.enabledYn === 'true' || props.enabledYn === true } onChange={handleRadio}/>사용
              <input name='enabledYn' value="false" type='radio' checked={props.enabledYn === 'false' || props.enabledYn === false} onChange={handleRadio}/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' checked={props.managementYn === 'true' || props.managementYn === true} onChange={handleRadio}/>설정
              <input name='managementYn' value="false" type='radio' checked={props.managementYn === 'false' || props.managementYn === false} onChange={handleRadio}/>미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' checked={props.includedYn === 'true' || props.includedYn === true} onChange={handleRadio}/>표시
              <input name='includedYn' value="false" type='radio' checked={props.includedYn === 'false' || props.includedYn === false} onChange={handleRadio}/>미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={props.sortOrder}  onChange={handleChange}  />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
      {
        modalOn && <DeptModal setModalOn={setModalOn} handleParDept={handleParDept}/>
      }
    </Detail>
  )
}

function DeptModal(props){
  const [item, setItem] = useState(JSON.parse('[{"":""}]'));

  useEffect(() => {
    getDepartemnt().then(res => {
      setItem(res.data);
    });
  }, []);

  return (
    <ModalBackdrop onClick={() => props.setModalOn(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='menuTitle'>
          <div>상위부서</div>
          <span onClick={() => props.setModalOn(false)}>x</span>
        </div>
        <MenuArea>
          <div>
          {
            item.map((a, i) => (
              <Item data={a} setModalOn={props.setModalOn} handleParDept={props.handleParDept} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </MenuArea>
      </ModalView>
    </ModalBackdrop>

  );
}

function Item(props) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  useEffect(() => {
    if(props.data !== undefined){
      setSubItem([]);
      setOpen(false);
    }
  }, [props.data]);

  const handleMenuItem = (a) => {
    if(subItem.length === 0) {
      getDepartmentList(props.data['id'])
      .then(res => setSubItem(res.data));
    }
    setOpen(!open);
    props.handleParDept(props.data);
  }

  return (
    <Menu>
      <div onClick={handleMenuItem}>
        └{props.data['name']}
      </div>
      { subItem.length > 1 && open &&
        subItem.map((a, i) => (
          <Item data={a} setModalOn={props.setModalOn} handleParDept={props.handleParDept} key={a['name']+'lnb'}/>
        ))
      }
    </Menu>
  )    
}


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
> form {
> table {
  min-width: 700px;
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
      min-width: 400px;
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
top: 100px;
right: 50px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 300px;
height: 500px;
color: black;
background-color: rgb(146,183,214);
z-index:2;
> #menuTitle {
  display: flex;
  justify-content: space-around;
  height: 30px;
  font-size: large;
  font-weight: bold;
}
`;
export const MenuArea = styled.div`
width: 90%;
height: 100%;

> div {
  background-color: white;
  width: 100%;
  height: 450px;
  overflow: scroll;
}
`;
export const Menu = styled.div`
margin: 10px;
margin-left: 20px;
`;