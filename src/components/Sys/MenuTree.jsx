import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GnbListApi, LnbListApi } from '../../api/menu';
//import { useSelector } from 'react-redux';

export default function MenuTree(props) {
  const [menuTree, setMenuTree] = useState(JSON.parse('[{"":""}]'));

  useEffect(() => {
    GnbListApi().then(res => {
      console.log(res);
      setMenuTree(res.data);
    });
  }, []);

  return (
    <ModalBackdrop onClick={() => props.setModalOn(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='menuTitle'>
          <div>상위메뉴</div>
          <span onClick={() => props.setModalOn(false)}>x</span>
        </div>
        <MenuArea>
          {
            menuTree.map((a, i) => (
              <MenuItem data={a} setModalOn={props.setModalOn} setValue={props.setValue} key={a['name']+'gnb'}/>
            ))
          }
        </MenuArea>
      </ModalView>
    </ModalBackdrop>

  );
}

export function MenuItem(props) {
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
      console.log('lnb id : ', props.data['id'])
      LnbListApi(props.data['id'])
      .then(res => setSubItem(res.data));
    }
    setOpen(!open);
    props.setValue(props.data);
  }
  return (
    <Menu>
      <div onClick={handleMenuItem}>
        └{props.data['name']}
      </div>
      { subItem.length > 1 &&
        subItem.map((a, i) => (
          <MenuItem data={a} setModalOn={props.setModalOn} setValue={props.setValue} key={a['name']+'lnb'}/>
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
position: relative;
top:50px;
right:-600px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 300px;
height: 500px;
color: black;
background-color: #ffffff;
z-index:2;
> #menuTitle {
  display: flex;
  justify-content: space-around;
  > * {
    margin: 10px;
    font-size: large;
    font-weight: bold;
  }
}
`;
export const MenuArea = styled.div`
width: 100%;
height: 400px;
overflow: scroll;
`;
export const Menu = styled.div`
margin: 10px;
margin-left: 20px;

`;