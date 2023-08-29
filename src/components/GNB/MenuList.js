import { Link as defaultLink } from 'react-router-dom';
import styled from 'styled-components';

export const ListBox = styled.div`
background-color: rgb(45,49,62);
height: 100%;

> div {
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  magin-left:10px;
}

`
const Link = styled(defaultLink)`
color: inherit;
text-decoration: none;
> p {
  margin-top: 20px;
  margin-bottom: 32px;
}
`

export default function MenuList(props) {

  return (
    <ListBox>
      {
        props.value.map((a, i) => (
          <Link to={a['name']} key={'name'+i}>
          
              <p value={a["name"]}>{a["name"]}</p>
             
          </Link>
        ))
      }
    </ListBox>
  );
}

