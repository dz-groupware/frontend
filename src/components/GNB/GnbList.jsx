import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import {favor} from '../../utils/Slice';

import { GnbFavorDeleteApi, GnbFavorApi, } from '../../api/gnb';

export function MenuList(props) {
  return (
    <ListArea>
      {
        props.value.map((a, i) => (
          <StyledLink key={a['id']+i+'gnb'}>
            <Link to={{pathname: a['name']}} state= {{ menuId: a['id'] }}>
              {a["name"]}
            </Link>
          </StyledLink>
        ))
      }
    </ListArea>
  );
}


export function FavList(props) {
  const dispatch = useDispatch();
  const param = '즐겨찾기'

  const handleFavor = (menuId) => {
    GnbFavorDeleteApi(props.empId, menuId)
    .then(GnbFavorApi(props.empId)
    .then(res => dispatch(favor(res.data))));
  }

  return (
    <ListArea>
      {
        props.value.map((a, i) => (
          <StyledLink key={a['id']+i+'fav'}>
            <Link to={{pathname: param+'/'+a['name']}} state= {{ menuId: a['id'] }}>
              {a["name"]}
            </Link>
            <span onClick={() => {handleFavor(a['id'])}}>X</span>
          </StyledLink>
        ))
      }
    </ListArea>
  );
}

export function IconList(props) {
  return (
    <>
      {
        props.value.map((a, i) => (
          <Link to={{pathname: a['name']}} state= {{ menuId: a['id'] }} key={a['id']+i+'icon'}>
            <img src={a['iconUrl']} alt={a['name']}/> 
          </Link>
        ))
      }
    </>
  );
}  

const ListArea = styled.div`
height: 100%;
`;
const StyledLink = styled.div`
color:rgb(181,194,200);
font-size: x-large;
display: flex;

> a {
  list-style: none;
  text-decoration: none;
  color:rgb(181,194,200);
  margin: 10px;
  margin-top: 22px;
  margin-bottom: 15px;
  width: calc(100% - 32px);
}

> span {
  margin: 10px;
  margin-top: 22px;
  margin-bottom: 37px;
}
`;