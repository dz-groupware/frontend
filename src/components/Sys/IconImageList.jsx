import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { iconListAPI } from '../../api/menu';


export default function IconImageList(props){
  const [iconList, setIconList] = useState([""]);

  const path = 'https://dz-test-image.s3.ap-northeast-2.amazonaws.com/';
  const prefix = 'icon/';
  
  useEffect(() => {
    iconListAPI().then(res => {
      const [, ...list] = res;
      setIconList(list);
    })
  }, []);

  return(
    <IconDiv>
      { props.newIconFile.length !== 0 &&
        <div onClick={() => {props.setIconUrl(props.newIconFile['name'])}} >
          {props.newIconFile['name'] === props.iconUrl ? <img src={props.newIconFile['name']} alt='i' key='new' id='clicked'/> : <img src={props.newIconFile['name']} alt='i' key='new'/>}
        </div>
      }
      {
      iconList.map((a, i) => (
        <div onClick={() => {props.setIconUrl(a['key'])}} key={a['key']+'iconList'}>
          { a['key'] === props.iconUrl ? <img src={path+a['key']} alt='i' key={i} id='clicked'/> :<img src={path+a['key']} alt='i' key={i}/>}
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