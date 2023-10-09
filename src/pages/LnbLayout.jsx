import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import styled from 'styled-components';
import { AiOutlineMenu } from "react-icons/ai";
import { MdMenuOpen } from "react-icons/md";

import { searchMenuListAPI } from '../api/gnb';

import Module from './Module';

export default function LnbLayout({ routeList }) {
  const location = useLocation();
  const [gnb, setGnb] = useState({ id: 0, name: '' });
  const [lnbOpen, setLnbOpen] = useState(true);

  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState('');
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
        {
          lnbOpen ? <MdMenuOpen className={`on ${!lnbOpen ? 'open' : 'close'}`} onClick={() => {setLnbOpen(false)}}/>
          : <AiOutlineMenu className={`off ${lnbOpen ? 'open' : 'close'}`} onClick={() => {setLnbOpen(true)}}/>
        }
        
        <p>{gnb.name}</p>
      </LnbTitle>
      <LnbArea>
        <LNBList className={`${lnbOpen ? 'true' : 'false'}`}>
          {
            data.map((a, i) => {
              if (a['id'] !== a['parId']) {
                return (
                  <MenuTree menu={a} gnb={gnb} key={a['name']+a['id']} clicked={clicked} setClicked={setClicked}/>                                    
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

export function MenuTree({ menu, param, gnb, clicked, setClicked }){
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
    setClicked(menu['id']);
  }

  return (
    <Menu>
      <MenuItem className={(clicked === menu['id']) ? 'true' : 'false'}>
        {
          menu['childNodeYn'] ? <img src='/img/page2.png' alt='1' />
          : (open ? <img src="/img/comp/dept_open_32.png" alt='1' />
          : <img src="/img/comp/dept_50.png" alt='1' />)
        }
        <div onClick={handleMenuItem}>{menu['name']}</div>
      </MenuItem>
      <ItemChild>
      {
        open && subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <MenuTree menu={a} param={`${param}/${menu['name']}`} gnb={gnb} clicked={clicked} setClicked={setClicked} key={'lnbList/'+a['name']}/>              )
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
height: calc(100% - 130px);
/* height: calc(100% - 50px); */
/* overflow-y: auto;   */

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

`;
const LNBList = styled.div`
width: 200px;
height: 100%;
color: black;
position: absolute;
overflow: auto;
height: calc(100% - 120px);
background-color: #e3e8ed;

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
background-color: #308EFC;
color: white;
font-size: x-large;
font-weight: bold;
padding-left: 10px;
display:flex;
> svg {
  width: 30px;
  height: 30px;
  margin: 10px 10px 15px 5px;
  transition: all 0.3s ease; 
  .on.open {
    transform: scale(1.2);
  }
  .off.open {
    transform: scale(1.2);
  }
  .on.close {
    opacity: 0; 
    transform: scale(0.8);
  }
  .off.close {
    opacity: 0; 
    transform: scale(0.8);
  }
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
`;
const Menu = styled.ul`
margin: 2px;
background-color: #fefffe;
`;
const ItemChild = styled.div`
background-color: #cbd0d5;
padding-left: 15px;
`;
const MenuItem = styled.li`
display: flex;
font-size: large;
height: auto;
padding-top: 3px;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;

&.true{
  background-color: rgb(214,236,248);
  border: 1px solid #7dafdc;
  transition: all 0.3s ease;
}
> img {
  width: 20px;
  height: 20px;
  margin: 3px;
}

`;