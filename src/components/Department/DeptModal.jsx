import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getDepartemnt, getDepartmentList } from '../../api/department';

export default function DeptModal({ form, setModalOn, setForm, menuId }){
  const [item, setItem] = useState(JSON.parse('[{"":""}]'));

  useEffect(() => {
    getDepartemnt(menuId).then(res => {
      setItem(res.data.data);
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
              <Item form={form} data={a} setModalOn={setModalOn} setForm={setForm} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </MenuArea>
      </ModalView>
    </ModalBackdrop>

  );
}

function Item({ form, data, setModalOn, setForm }) {
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
      .then(res => setSubItem(res.data.data));
    }
    setOpen(!open);
    setForm({...form, parId: data['id'], parName: data['name']});
  }

  return (
    <Menu>
      <div onClick={handleMenuItem}>
        └{data['name']}
      </div>
      { subItem.length > 1 && open &&
        subItem.map((a, i) => (
          <Item form={form} data={a} setModalOn={setModalOn} setForm={setForm} key={a['name']+'lnb'}/>
        ))
      }
    </Menu>
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