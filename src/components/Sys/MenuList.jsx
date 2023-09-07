import styled from 'styled-components';

export default function MenuList(props) {
  return (
    <ListArea>
      <div>
      {
        props.value.map((a, i) => (
          <MenuItem key={i} onClick={()=>{props.api('gnbDetail', a)}}>
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
background-color: rgb(240,245,248);
border: 1px solid rgb(171,172,178);
border-top: 3px solid gray;
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
`;
export const MenuItem = styled.div`
margin-top:5px;

display: flex;
justify-content: flex-start;

height: 80px;

background-color: white;
border: 1px solid rgb(171,172,178);
color: black;

padding: 10px;

text-align: center;
font-size: medium;
> #menuitemname {
  padding-top: 5%;
}
`;