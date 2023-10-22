import { useEffect, useState } from "react";

import styled from "styled-components";

import { iconListAPI } from "../../api/menu";


export default function IconImageList({ pageId, newIconFile, newIconUrl, iconUrl, detail, setDetail, iconRender, setIconRender }){
  const [iconList, setIconList] = useState([""]);
  
  const path = "https://dz-test-image.s3.ap-northeast-2.amazonaws.com/";
  const prefix = localStorage.getItem("compId")+"/";
  
  useEffect(() => {
    if (iconRender === true) {
      iconListAPI(pageId).then(res => {
        const [, ...list] = res.data;
        setIconList(list);
      })
      setIconRender(false);  
    }
  }, [iconRender]);
  
  return(
    <IconDiv>
      { newIconUrl !== "" && newIconUrl !== undefined &&
        <div onClick={() => {setDetail({ ...detail, iconUrl: path+prefix+newIconFile["name"] })}} >
          {path+prefix+newIconFile["name"] === iconUrl ? <img src={newIconUrl} alt="i" key="new" id="clicked"/> : <img src={newIconUrl} alt="i" key="new"/>}
        </div>
      }
      {
      iconList.map((a, i) => (
        <div onClick={() => {setDetail({ ...detail, iconUrl: path+a["key"] })}} key={a["key"]+"iconList"}>
          { path+a["key"] === iconUrl ? <img src={path+a["key"]} alt="i" key={i} id="clicked"/> : <img src={path+a["key"]} alt="i" key={i}/>}
        </div>
      ))
      }      
    </IconDiv>
  );
}

export const IconDiv = styled.div`
width: 100%;
height: calc(100% - 40px);
overflow: scroll;
&::-webkit-scrollbar {
  display: none;
}
border: 1px solid #e3e8ed;
border-radius: 5px;
padding: 5px;
display: flex; /* flex 레이아웃 사용 */
  flex-wrap: wrap; /* 요소들이 가로로 나열되고 공간이 부족하면 아래로 내려감 */
  justify-content: flex-start; /* 가로 정렬을 시작 지점으로 설정 (왼쪽 정렬) */
  align-content: flex-start; 
> div {
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: #1d2437;
  border-radius: 10px;
  cursor: pointer;
  > #clicked {
    & img{
      border-radius: 5px;
    }
    padding: 5px;
    border: 2px solid #318dfc;
    opacity: 0.5;

  }
  
  > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
}
`;