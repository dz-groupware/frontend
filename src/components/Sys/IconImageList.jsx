import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { iconListAPI } from '../../utils/API';


export default function IconImageList(props){
  const [icon, setIcon] = useState([]);

  console.log(props.newIcon, " : ", props.iconUrl);
  useEffect(() => {
    iconListAPI().then(res => {
      setIcon(res.data);
    })
  }, []);
  
  return(
    <IconDiv>
      { props.newIcon !== "" &&
        <div onClick={() => {props.setIconUrl(props.newIcon)}} style={{width: '50px', height:'50px'}}>
          {props.newIcon === props.iconUrl ? <img src={props.newIconFile} alt='i' key='new' id='clicked'/> : <img src={props.newIconFile} alt='i' key='new'/>}
        </div>
      }
      {
      icon.map((a, i) => (
        <div onClick={() => {props.setIconUrl(a)}}>
          {a === props.iconUrl ? <img src={a} alt='i' key={i} id='clicked'/> : <img src={a} alt='i' key={i}/>}
        </div>
      ))
      }      
    </IconDiv>
  );
}

export const IconDiv = styled.div`
overflow: scroll;
::-webkit-scrollbar {
  display: none;
}
height: 100%;
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