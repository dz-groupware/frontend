import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { iconListAPI } from '../../api/menu';


export default function IconImageList({ pageId, newIconFile, newIconUrl, iconUrl, detail, setDetail }){
  const [iconList, setIconList] = useState([""]);

  const path = 'https://dz-test-image.s3.ap-northeast-2.amazonaws.com/';
  const prefix = 'icon/';
  
  useEffect(() => {
    iconListAPI(pageId).then(res => {
      const [, ...list] = res.data;
      setIconList(list);
    })
  }, []);
  
  return(
    <IconDiv>
      { newIconUrl !== "" && newIconUrl !== undefined &&
        <div onClick={() => {setDetail({ ...detail, iconUrl: path+prefix+newIconFile['name'] })}} >
          {path+prefix+newIconFile['name'] === iconUrl ? <img src={newIconUrl} alt='i' key='new' id='clicked'/> : <img src={newIconUrl} alt='i' key='new'/>}
        </div>
      }
      {
      iconList.map((a, i) => (
        <div onClick={() => {setDetail({ ...detail, iconUrl: path+a['key'] })}} key={a['key']+'iconList'}>
          { path+a['key'] === iconUrl ? <img src={path+a['key']} alt='i' key={i} id='clicked'/> : <img src={path+a['key']} alt='i' key={i}/>}
        </div>
      ))
      }      
    </IconDiv>
  );
}

export const IconDiv = styled.div`
overflow: scroll;
&::-webkit-scrollbar {
  display: none;
}
width: 100%;
max-height: 300px;
> div  {
  width: 50px;
  height: 50px;
  margin: 5px;
  
  > #clicked {
    opacity: 0.5;
  }
  
  > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
`;