import { Link as defaultLink } from 'react-router-dom';

import styled from 'styled-components';

export default function MenuList(props) {
  return (
    <ListArea>
      {
        props.value.map((a, i) => (
          <Link to={{pathname: a['name']}} state= {{ menuId: a['id'] }} key={'name'+i}>
              <p value={a["name"]}>{a["name"]}</p>
          </Link>
        ))
      }
    </ListArea>
  );
}

export const ListArea = styled.div`
height: 100%;
`;
const Link = styled(defaultLink)`
color:rgb(181,194,200);
list-style: none;
text-decoration: none;
font-size: x-large;

> p {
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 39px;
}
`;