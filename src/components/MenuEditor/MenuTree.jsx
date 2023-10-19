import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GnbListApi, LnbListApi } from '../../api/menu';

export default function MenuTree({ itemId, pageId, setModalOn, handleParMenu }) {
  const [menuTree, setMenuTree] = useState(JSON.parse('[{"":""}]'));
  const [clicked, setClicked] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    GnbListApi(pageId)
    .then(res => {
      setMenuTree(res.data.data);
      setError(false);
    }).catch(() => {
      setError(true);
    });
  }, []);

  return (
    <ModalBackdrop onClick={() => setModalOn(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='menuTitle'>
          <div>상위메뉴</div>
          <span onClick={() => setModalOn(false)}>x</span>
        </div>
        <MenuArea>
          <div>
          {
            menuTree.map((a, i) => (itemId === a['id'] ? null :
              <MenuItem 
                itemId={itemId} 
                pageId={pageId} 
                data={a} 
                setModalOn={setModalOn} 
                handleParMenu={handleParMenu} 
                clicked={clicked}
                setClicked={setClicked}
                setError={setError}
                key={a['name']+'gnb'+i}
              />
            ))
          }
          </div>
        </MenuArea>
      </ModalView>
    </ModalBackdrop>
  );
};

export function MenuItem({ itemId, pageId, data, setModalOn, handleParMenu, clicked, setClicked, setError }) {
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
      LnbListApi(pageId, data['id'])
      .then((res) => {
        setSubItem(res.data.data);
        setError(false);
      }).catch(() => setError(true));
    }
    setOpen(!open);
    handleParMenu(data);
    setClicked(data['id']);
  }

  return (
    <Menu>
      <div onClick={handleMenuItem} className={clicked === data['id'] ? 'clicked' : ' '}>
        └{data['name']}
      </div>
      {subItem.length > 1 && open &&
        subItem.map((a, i) => ( itemId === a['id'] ? null : 
          <MenuItem 
            itemId={itemId} 
            pageId={pageId} 
            data={a} 
            setModalOn={setModalOn} 
            handleParMenu={handleParMenu}
            clicked={clicked}
            setClicked={setClicked}
            setError={setError}
            key={a['name']+'lnb'+i}
          />
        ))
      }
    </Menu>
  );
};

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
z-index:2;
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
cursor: pointer;

> div.clicked {
  background-color: rgb(214,236,248);
  border-radius: 5px;
}
`;