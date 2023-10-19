import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { searchMenuListAPI } from "../../api/layout";
import Retry from "../../pages/Error/Retry";

export default function MenuItem({ menu, param, gnb, clicked, setClicked, setData }){
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    if(gnb.id !== undefined){
      setSubItem([]);
      setOpen(false);
    }
  }, [gnb.id]);

  const handleMenuItem = () => {
    try{
      if(subItem.length === 0) {
        searchMenuListAPI(menu["id"])
        .then(res => {
          if(Array.isArray(res.data.data)) {
            setSubItem(res.data.data);
          };
        }).catch(() => {
          setData(<Retry />);
        });
      }
      setOpen(!open);
      navigate(`/${menu["nameTree"]}`);  
    } catch(error) {
    }
    setClicked(menu["id"]);
  }

  return (
    <Content>
      <Menu className={clicked === menu["id"] ? "true" : "false"}>
        {menu["childNodeYn"] ? (
          <img src="/img/page.png" alt="1" />
        ) : (
          open ? (
          <img src="/img/comp/dept_open_32.png" alt="1" />
          ) : (
            <img src="/img/comp/dept_50.png" alt="1" />
          )
        )}
        <div onClick={handleMenuItem}>{menu["name"]}</div>
      </Menu>
      <ItemChild>
        {open && subItem.map((a, i) => {
          if (a["id"] !== a["parId"]) {
            return (
              <MenuItem 
                menu={a} 
                param={`${param}/${menu["name"]}`} 
                gnb={gnb} 
                clicked={clicked} 
                setClicked={setClicked} 
                setData={setData}
                key={"lnbList/"+a["name"]}
              />              
            );}
          return null;
        })}
      </ItemChild>
    </Content>
  )
}

const Content = styled.ul`
margin: 2px;
background-color: #fefffe;
cursor: pointer;
`;
const ItemChild = styled.div`
background-color: #e3e8ed;
padding-left: 15px;
`;
const Menu = styled.li`
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
> div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}
`;