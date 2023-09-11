import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { iconListAPI } from '../../utils/API';


export default function IconImageList(props){
  const [icon, setIcon] = useState([""]);

  const path = 'https://dz-test-image.s3.ap-northeast-2.amazonaws.com/';

  useEffect(() => {
    iconListAPI().then(res => {
      setIcon(res);
    })
  }, []);

  return(
    <IconDiv>
      { props.newIcon.length !== 0 &&
        <div onClick={() => {props.setIconUrl(props.newIcon)}} style={{width: '50px', height:'50px'}}>
          {props.newIcon === props.iconUrl ? <img src={props.newIconFile} alt='i' key='new' id='clicked'/> : <img src={props.newIconFile} alt='i' key='new'/>}
        </div>
      }
      {
      icon.map((a, i) => (
        <div onClick={() => {props.setIconUrl(a['key'])}}>
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
  }
}
`;