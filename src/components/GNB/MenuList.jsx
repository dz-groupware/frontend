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
background-color: rgb(45,49,62);
height: 100%;
`;
const Link = styled(defaultLink)`
color: inherit;
text-decoration: none;
> p {
  margin-top: 20px;
  margin-bottom: 32px;
}
`;