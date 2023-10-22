import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { RiMenuUnfoldLine } from "react-icons/ri";

import { searchMenuListAPI } from "../api/layout";

import Module from "./Module";
import Retry from "./Error/Retry";
import MenuItem from "../components/MenuEditor/MenuItem";

export default function LnbLayout({ routeList }) {
  const [content, setContent] = useState(false);
  const location = useLocation();
  const [gnb, setGnb] = useState({ id: 0, name: "" });
  const [lnbOpen, setLnbOpen] = useState(true);
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState("");
  console.log(routeList);

  useEffect(() => {
    if ( gnb.id > 0 ) {
      setLnbOpen(true);
      searchMenuListAPI(gnb.id)
      .then((res) => {
        if (res.data.data) {
          setData(res.data.data);
          setContent(
            <Module gnb={gnb} setGnb={setGnb} routeList={routeList}/>
          );
        } else {
          setContent(<Retry />);
        }
      })
      .catch((error) => {
        setContent(<Retry />);
      });
    } else if (gnb.id === 0) {
      setLnbOpen(false);
      setContent(
        <Module gnb={gnb} setGnb={setGnb} routeList={routeList}/>
      );
    } else {
      setLnbOpen(false);
      setContent(<Retry />);
    }
  }, [gnb.id]);

  return (
    <Content>
      <LnbTitle className={`${location.pathname === "/home" ? "main" : "lnb" }`}>
        <IconContainer className={`icon-container ${lnbOpen ? "open" : "close"}`}>
          <AiOutlineMenu className="close-icon" onClick={() => {setLnbOpen(false)}}/>
          <RiMenuUnfoldLine className="open-icon" onClick={() => {setLnbOpen(true)}}/>
        </IconContainer>
        <p>{gnb.name}</p>
      </LnbTitle>
      <LnbArea>
        <LNBList className={`${lnbOpen ? "true" : "false"}`}>
          {
            data.map((a, i) => {
              if (a["id"] !== a["parId"]) {
                return (
                  <MenuItem 
                    menu={a} 
                    gnb={gnb} 
                    clicked={clicked} 
                    setClicked={setClicked}
                    setData={setData}
                    key={a["name"]+a["id"]} 
                  />                                    
                )
              }
              return null;
            })
          }
        </LNBList>
        <OutletArea id="route" className={`${location.pathname === "/home" ? "main" : "lnb"} ${lnbOpen ? "true" : "false"}`} >
          <Routes>
            <Route path="/*" element={content} />
          </Routes>
        </OutletArea>
      </LnbArea>
    </Content>
  );
};

const Content = styled.div`
width: 100%;
height: 100%;
background-color: white;
`;
const OutletArea = styled.div`
position: fixed;
top: 112px;
left: 245px;
width: calc(100% - 245px);
height: calc(100% - 112px);
&.true {
  left: 245px;
  width: calc(100% - 245px);
}
&.false {
  left: 45px;
  width: calc(100% - 45px);
}
&.main {
top: 80px;
left: 45px;
width: calc(100% - 45px);
height: 100%;
}

`;
const LNBList = styled.div`
width: 200px;
height: 100%;
color: black;
position: absolute;
overflow: auto;
height: calc(100% - 112px);
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
  width: 25px;
  height: 25px;
  margin: 12px 10px 15px 5px;
  cursor: pointer;
  opacity: 0;
  &.open {
    opacity: 1; 
    transition: all 0.3s ease; 
  }
  &.close {
    opacity: 0; 
    transition: all 0.3s ease; 
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
const IconContainer = styled.div`
  position: relative;
  width: 30px;
  height: 25px;
  cursor: pointer;

  .open-icon {
    position: absolute;
    top: 12px;
    left: 1px;
    transition: all 0.3s ease;
  }
  .close-icon {
    position: absolute;
    top: 12px;
    left: 1px;
    display: none;
    transition: all 0.3s ease;
  }

  &.open .open-icon {
    display: none;
    transition: all 0.3s ease;
  }

  &.open .close-icon {
    display: block;
    transition: all 0.3s ease;
  }
`;