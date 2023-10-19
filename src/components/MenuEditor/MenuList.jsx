import { useState } from 'react';
import styled from 'styled-components';

export default function MenuList(props) {
  const [clicked, setClicked] = useState('');
  return (
    <ListArea>
      <div>
      {
        props.value.map((a, i) => (
          <MenuItem key={'gnbInMenuEditor'+i} className={(clicked === a['id']) ? 'true' : 'false'}
          onClick={()=>{
            props.api('gnbDetail', a);
            setClicked(a['id']);
          }}>
          <img src={a['iconUrl']} alt='i'/><div id='menuitemname'>{a['name']}</div>
          </MenuItem>
        ))
      }
      </div>
    </ListArea>
  );
}

export const ListArea = styled.div`
display: flex;
justify-content: center;
background-color: #f2f3f6;
border: 1px solid #1d2437;
border-top: 3px solid #1d2437;
margin: 10px;
padding: 10px;
width: 250px;
height: calc(100% - 150px);
> div {
  display: block;
  
  width: 220px;
  overflow: scroll;
  &::-webkit-scrollbar{
      display:none;
  }  
  > div > img {
    margin: 7px;
    width: 40px;
    height: 40px;
  }
}
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;
export const MenuItem = styled.div`
margin-top: 5px;
display: flex;
justify-content: flex-start;
height: 60px;
background-color: white;
border: 1px solid rgb(171,172,178);
color: black;
text-align: center;
font-size: medium;
padding: 3px 3px 3px 5px;
cursor: pointer;
&:hover {
  background-color: #effaff;
}
> #menuitemname {
  padding: 18px 0 0 10px;
  transition: all 0.3s ease;
}

> img {
  padding: 5px;
  border-radius: 10px;
  background-color: #1d2437;
  border-radius: 10px;
}

&.true {
  background-color: #dceef6;
  border: 1px solid #7dafdc ;
  transition: all 0.3s ease;
}
`;