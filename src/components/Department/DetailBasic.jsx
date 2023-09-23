import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getDepartemnt, getDepartmentList } from '../../api/department';

export default function DetailBasic({ data, setData, detail }){
  const [modalOn, setModalOn] = useState(false);
  const [value, setValue] = useState('');

  useEffect(()=>{
    setValue(data);
  },[]);

  useEffect(()=>{
    setData(value);
  },[detail]);

  return (
    <Detail>
      <BasicForm>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea defaultValue={value.parName} onClick={()=>setModalOn(true)} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input 
              placeholder='부서코드를 입력하세요'
              value={value.code}
              valutType={'code'}
              onChange={e => setValue({...value, code: e.target.value})}/>
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input 
              placeholder='부서명을 입력하세요'
              value={value.name} 
              onChange={e => setValue({...value, name: e.target.value})} />
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input 
              placeholder='부서약칭을 입력하세요'
              value={value.abbr} 
              onChange={e => setValue({...value, abbr: e.target.value})} />
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' 
              checked={value.enabledYn === true } 
              onChange={e => setValue({...value, enabledYn: true})}/>사용
              <input name='enabledYn' value="false" type='radio' 
              checked={value.enabledYn === false} 
              onChange={e => setValue({...value, enabledYn: false})}/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' 
              checked={value.managementYn === true} 
              onChange={e => setValue({...value, managementYn: true})}/>설정
              <input name='managementYn' value="false" type='radio' 
              checked={value.managementYn === false} 
              onChange={e => setValue({...value, managementYn: false})}/>미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' 
              checked={value.includedYn === true} 
              onChange={e => setValue({...value, includedYn: true})}/>표시
              <input name='includedYn' value="false" type='radio' 
              checked={value.includedYn === false} 
              onChange={e => setValue({...value, includedYn: false})}/>미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={value.sortOrder}  
              onChange={e => setValue({...value, sortOrder: parseInt(e.target.value, 10)})}  />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
      {
        modalOn && <DeptModal value={value} setModalOn={setModalOn} setValue={setValue}/>
      }
    </Detail>
  )
}

function DeptModal({ value, setModalOn, setValue }){
  const [item, setItem] = useState(JSON.parse('[{"":""}]'));

  useEffect(() => {
    getDepartemnt().then(res => {
      setItem(res.data);
    });
  }, []);

  return (
    <ModalBackdrop onClick={() => setModalOn(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='menuTitle'>
          <div>상위부서</div>
          <span onClick={() => setModalOn(false)}>x</span>
        </div>
        <MenuArea>
          <div>
          {
            item.map((a, i) => (
              <Item value={value} data={a} setModalOn={setModalOn} setValue={setValue} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </MenuArea>
      </ModalView>
    </ModalBackdrop>

  );
}

function Item({ value, data, setModalOn, setValue }) {
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  useEffect(() => {
    if(data !== undefined){
      setSubItem([]);
      setOpen(false);
    }
  }, [data]);

  const handleMenuItem = (a) => {
    if(subItem.length === 0) {
      getDepartmentList(data['id'])
      .then(res => setSubItem(res.data));
    }
    setOpen(!open);
    setValue({...value, parId: data['id'], parName: data['name']});
  }

  return (
    <Menu>
      <div onClick={handleMenuItem}>
        └{data['name']}
      </div>
      { subItem.length > 1 && open &&
        subItem.map((a, i) => (
          <Item value={value} data={a} setModalOn={setModalOn} setValue={setValue} key={a['name']+'lnb'}/>
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