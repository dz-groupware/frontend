import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import styled from 'styled-components';
import { AiFillFolder, AiFillFolderOpen, AiOutlineProfile, AiFillProfile, AiOutlineMenu } from "react-icons/ai";

import { searchMenuListAPI } from '../api/gnb';

import Module from './Module';

export default function LnbLayout({ routeList }) {
  const location = useLocation();
  const [gnb, setGnb] = useState({ id: 0, name: '' });
  const [lnbOpen, setLnbOpen] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    try{
      const res = searchMenuListAPI(gnb.id);
      if (res !== undefined) {
        res.then(res => {
          if (Array.isArray(res.data.data)) {
            console.log(res.data.data);
            setData(res.data.data)
          }
        });
      }
    } catch(error) {
      console.log('searchMenuListAPI error : ', error);
    }
  }, [gnb.id]);

  return (
    <Content>
      <LnbTitle className={`${location.pathname === '/' ? 'main' : 'lnb' }`}>
        <AiOutlineMenu onClick={() => {setLnbOpen(!lnbOpen)}}/>
        <p>{gnb.name}</p>
      </LnbTitle>
      <LnbArea>
        <LNBList className={`${lnbOpen ? 'true' : 'false'}`}>
          {
            data.map((a, i) => {
              if (a['id'] !== a['parId']) {
                return (
                  <MenuTree menu={a} gnb={gnb} key={a['name']+a['id']}/>                                    
                )
              }
              return null;
            })
          }
        </LNBList>
        <OutletArea id='route' className={`${location.pathname === '/' ? 'main' : 'lnb'} ${lnbOpen ? 'true' : 'false'}`} >
          <Routes>
            <Route path='/*' element={<Module gnb={gnb} setGnb={setGnb} routeList={routeList}/>} />
          </Routes>
        </OutletArea>
      </LnbArea>
    </Content>
  );
}

export function MenuTree({ menu, param, gnb }){
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);
  const navigate = useNavigate();
    
  useEffect(() => {
    if(gnb.id !== undefined){
      setSubItem([]);
      setOpen(false);
    }
  }, [gnb.id]);

  function handleMenuItem() {
    try{
      if(subItem.length === 0) {
        searchMenuListAPI(menu['id'])
        .then(res => {
          if(Array.isArray(res.data.data)) {
            setSubItem(res.data.data);
          }
        });
      }
      setOpen(!open);
      navigate(`/${menu['nameTree']}`);  
    } catch(error) {
      console.log('searchMenuListAPI error : ',error);
    }
  }

  return (
    <Menu>
      <MenuItem>
        { open ? < AiFillFolderOpen/> : <AiFillFolder /> }
        <div onClick={handleMenuItem}>{menu['name']}</div>
      </MenuItem>
      <ItemChild>
      {
        open && subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <MenuTree menu={a} param={`${param}/${menu['name']}`} gnb={gnb} key={'lnbList/'+a['name']}/>              )
          }
          return null;
        })
      }
      </ItemChild>
    </Menu>
  )
}

const Content = styled.div`
width: 100%;
height: 100%;
background-color: white;
`;
const OutletArea = styled.div`
position: fixed;
top: 130px;
left: 250px;
width: calc(100% - 250px);
height: calc(100% - 50px);
overflow-y: auto;  

&.true {
  left: 250px;
  width: calc(100% - 250px);
}
&.false {
  left: 50px;
  width: calc(100% - 50px);
}
&.main {
top: 80px;
left: 50px;
width: calc(100% - 50px);
height: 100%;
}

overflow-y:auto;
`;
const LNBList = styled.div`
width: 200px;
height: 100%;
color: black;
position: absolute;

overflow: scroll;
height: calc(100% - 150px);
background-color: #d9dde1;
&::-webkit-scrollbar {
    width: 5px; 
    height: 5px;
    background-color: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(214,236,248);
    border-radius: 5px; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgb(18, 172, 226);
  }


  &.true {
  left:0px;
  opacity:1;
}
&.false {
  left: -300px;
  top: 0;
  opacity: 0;

  transition: left 4s;
}
`;
const LnbTitle = styled.div`
width: 100%;
height: 50px;
background-color: rgb(18,172,226);
color: white;
font-size: x-large;
font-weight: bold;
padding-left: 10px;
display:flex;
> svg {
  margin: 15px;
}
> p {
  margin-top:15px;
}

&.main {
  display: none;
}
`
const LnbArea = styled.div`
display: flex;
width: 100%;
height: 100%;
padding-top: 2px;
`;
const Menu = styled.div`
margin: 2px;
background-color: white;
padding: 3px;
`;
const ItemChild = styled.div`
margin-top: 15px;
padding-left: 15px;
`;
const MenuItem = styled.div`
display: flex;
font-size: large;
height: 20px;
padding: 3px;
padding-top: 7px;
> svg {
  margin: 3px;
}
`;