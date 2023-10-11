import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getDepartemnt, getDepartmentById } from '../../api/department';

export default function DeptModal({ form, setModalOn, setForm, pageId }){
  const [item, setItem] = useState(JSON.parse('[{"":""}]'));

  useEffect(() => {
    try {
      if(pageId) {
        getDepartemnt(pageId).then(res => {
          setItem(res.data.data);
        });    
      } else {
        console.log('pageId is undefined');
      }
    } catch (error) {
      console.log(error);
    }
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
          <div onClick={() => {setForm({...form, parId: '0', parName: '없음'});}}>
            <img style={{width: '15px', height: '15px', marginRight: '5px'}} src='/img/comp/dept_50.png' alt='icon' />'선택없음'
          </div>
          {
            item.map((a, i) => (
              <Item form={form} data={a} setModalOn={setModalOn} setForm={setForm} pageId={pageId} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </MenuArea>
      </ModalView>
    </ModalBackdrop>

  );
}

function Item({ form, data, setModalOn, setForm, pageId }) {
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
      console.log(data);
      getDepartmentById(data['compId'], data['id'], pageId).then(res => setSubItem(res.data.data));
    }
    setOpen(!open);
    setForm({...form, parId: data['id'], parName: data['name']});
  }

  return (
    <Menu>
      <div onClick={handleMenuItem}>
      <img style={{width: '15px', height: '15px', marginRight: '5px'}} src='/img/comp/dept_50.png' alt='icon' />{data['name']}
      </div>
      { subItem.length > 1 && open &&
        subItem.map((a, i) => (
          data['id'] === a['id'] ? null : (
            <Item form={form} data={a} setModalOn={setModalOn} setForm={setForm} pageId={pageId} key={a['name']+'lnb'}/>
          )
        ))
      }
    </Menu>
  );    
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
top: 100px;
right: 50px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 300px;
height: 480px;
color: black;
background-color: #f2f3f6;
z-index: 2;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
          3px 3px 3px 0px rgba(0,0,0,.1),
          -3px -3px 3px 0px rgba(0,0,0,.1);
          outline: none;
> #menuTitle {
  margin: 20px 15px 10px 15px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  font-size: large;
  font-weight: bold;
}
`;
export const MenuArea = styled.div`
margin: 5px 15px 5px 15px;
width: 90%;
height: 100%;
> div {
  padding: 10px;
  background-color: white;
  width: 100%;
  height: 400px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px; 
    height: 5px;
    background-color: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7dafdc;
    border-radius: 5px; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #318dfc;
  }
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
}
`;
export const Menu = styled.div`
margin: 10px;
margin-left: 20px;
> div:hover {
  color: #1b75ce;
  cursor: pointer;
}

> div > div.item.disable {
  display: none;
}

`;