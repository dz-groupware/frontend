import { useDispatch } from 'react-redux';
import { Link as defaultLink } from 'react-router-dom';

import styled from 'styled-components';

import {favor} from '../../utils/Slice';

export default function FavList(props) {
  const dispatch = useDispatch();
  const param = '즐겨찾기'
  return (
    <ListBox>
      {
        props.value.map((a, i) => (
          <Link to={{pathname: param+'/'+a['name']}} state= {{ menuId: a['id'] }} key={a['name']+a['name']+i+'fav'}>
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