import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { iconListAPI } from '../../utils/API';


export default function IconImageList(){
  const [icon, setIcon] = useState([]);

  useEffect(() => {
    iconListAPI().then(res => {
      console.log(res.data);
      setIcon(res.data);
    })
  }, []);
  
  return(
    <IconDiv>
      {
      icon.map((a, i) => (
        <img src={a} alt='i' key={i}/>
      ))
      }      
    </IconDiv>
  );
}

export const IconDiv = styled.div`
overflow: scroll;
::-webkit-scroll: none;
height: 100%;
`;