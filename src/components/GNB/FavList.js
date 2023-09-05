import { useDispatch } from 'react-redux';
import { Link as defaultLink } from 'react-router-dom';

import styled from 'styled-components';

import {favor, recent} from '../../utils/Slice';


export default function FavList(props) {
  const dispatch = useDispatch();
  return (
    <ListBox>
      {
        props.value.map((a, i) => (
          <Link to={a['name']} key={a['name']+a['name']+i+'fav'} onClick={() => {dispatch(recent())}}>
              <p value={a["name"]}>{a["name"]}</p><span onClick={() => {props.deleteApi(a['empId'], a['menuId']).then(props.favorApi(a['empId']).then(res => dispatch(favor(res.data.data))))}}>X</span>
          </Link>
        ))
      }
    </ListBox>
  );
}

export const ListBox = styled.div`
background-color: rgb(45,49,62);
height: 100%;
`;
const Link = styled(defaultLink)`
color: inherit;
text-decoration: none;
display: flex;

> p {
  margin-top: 20px;
  margin-bottom: 32px;
}

> span {
  margin-top: 20px;
  position: absolute;
  right: 10px;
}
`;