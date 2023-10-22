import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";

export default function Recent({ routeList }){
  const maxVisibleChips = 4; 
  const [showChipButton, setShowChipButton] = useState(maxVisibleChips);
  const [showAddMoreButton, setShowAddMoreButton] = useState(false);
  const [chipData, setChipData] = useState([]);
  const [routeLink, setRouteLink] = useState([]);
  const contentRef = useRef(null);
  const currentURL = decodeURI(window.location.href);
  const navigate = useNavigate();
  const navigator = (path) => {
    navigate(`${path}`);
  };
  const handleDelete = (pathName) => () => {
    setChipData((chips) => {
      const newChips = chips.filter((chip) => chip.name !== pathName);
      return newChips;
    });
  };

  useEffect(() => {
    const splitURL =  currentURL.split("/");
    const pathName = splitURL[splitURL.length - 1];
    if(routeLink.includes("/"+currentURL.split("http://localhost:3000/")[1])){
      if (currentURL.split("http://localhost:3000/")[1].length !== 0) {
        setChipData((chips) => {
          const newChips = chips.filter((chip) => chip.name !== pathName);
          newChips.unshift({ name: pathName, path: "/"+currentURL.split("http://localhost:3000/")[1] })
          return newChips;
        });  
      }
    }
  }, [window.location.href]);

  useEffect(() => {
    setRouteLink(Array.from(routeList.keys()));
  }, [routeList]);

  useEffect(() => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.clientWidth;
      setShowAddMoreButton(contentWidth < chipData.length * 180);
      setShowChipButton(Math.floor(contentWidth/190));
    }

    // 이벤트 핸들러 함수
    const handleResize = () => {
      if (contentRef.current) {
        const contentWidth = contentRef.current.clientWidth;
        setShowAddMoreButton(contentWidth < chipData.length * 180);
        setShowChipButton(Math.floor(contentWidth / 190));
      }
    };

    // 초기 실행
    handleResize();

    // 창 크기 변경 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chipData, contentRef]);

  return(
    <Content ref={contentRef}>
      {chipData.slice(0, showChipButton).map((data) => {
        return (
          <ListItem key={"recent"+data.name}>
            <BiLinkExternal />
            <Chip
              name={data.name}
              path={data.path}
              onDelete={handleDelete(data.name)}
              navigator={navigator}
            />
          </ListItem>
        );
      })}
      {showAddMoreButton && (
        <ChipMore/>
      )}
    </Content>
  );
}

const Chip = ({ name, path, onDelete, navigator }) => {
  return (
    <ChipContainer onClick={() => navigator(path)}>
      {name.length < 5 ? name : `${name.slice(0, 4)}...`}
      {onDelete && (
        <span onClick={onDelete}>X</span>
      )}
    </ChipContainer>
  );
};

const ChipMore = () => {
  return (
    <ChipMoreContainer> ... </ChipMoreContainer>
  );
};

const ListItem = styled.div`
  width: 150px;
  height: 45px;
  display: flex;
  justify-content: center;
  border: 1px solid #1d2437; 
  border-radius: 5px;
  background-color: white;
  margin: 5px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
              3px 3px 3px 0px rgba(0,0,0,.1),
              1px 1px 3px 0px rgba(0,0,0,.1);
              outline: none;

  > svg {
    width: 25px;
    height: 25px;
    margin: 10px;
  }
  > span {
    margin: 0 5px 0 5px ;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
  margin: 5px 0 0 20px;
`;
const ChipContainer = styled.div`
  width: 140px;
  height: 45px;
  font-size: large;
  display: flex;
  justify-content: space-between;
  white-space: normal;
  padding-top: 12px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  > span {
    z-index: 1;
    margin: 0 5px 0 5px;
    cursor: pointer;
  }
`;
const ChipMoreContainer = styled.div`
  border: 1px solid #1d2437;
  border-radius: 5px;
  background-color: white;
  margin: 5px;
  width: 40px;
  height: 45px;
  font-size: large;
  display: flex;
  justify-content: space-between;
  white-space: normal;
  padding: 10px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
              3px 3px 3px 0px rgba(0,0,0,.1),
              1px 1px 3px 0px rgba(0,0,0,.1);
              outline: none;
`;