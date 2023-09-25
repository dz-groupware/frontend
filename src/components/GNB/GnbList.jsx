import { Link } from 'react-router-dom';

import { GnbFavorDeleteApi, GnbFavorApi, } from '../../api/gnb';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

export function MenuList({ gnb }) {
  return (
    <ListArea>
      {
        gnb.map((a, i) => (
          <StyledLink key={a['id']+i+'gnb'}>
            <Link to={{pathname: a['name']}} state= {{ gnbId: a['id'] }}>
              {a["name"]}
            </Link>
          </StyledLink>
        ))
      }
    </ListArea>
  );
}

export function FavList({ favor, empId }) {
  const [favorList, setFavorList] = useState(JSON.parse(`[{}]`));
  const param = '즐겨찾기'

  useEffect(()=> {
    setFavorList(favor);
  }, [empId]);

  const handleFavor = (menuId) => {
    GnbFavorDeleteApi(empId, menuId)
    .then(GnbFavorApi(empId)
    .then(res => setFavorList(res.data)));
  }

  return (
    <ListArea>
      {
        favorList.map((a, i) => (
          <StyledLink key={a['id']+i+'fav'}>
            <Link to={{pathname: param+'/'+a['name']}} state= {{ gnbId: a['id'] }}>
              {a["name"]}
            </Link>
            <span onClick={() => {handleFavor(a['id'])}}>X</span>
          </StyledLink>
        ))
      }
    </ListArea>
  );
}

export function IconList({ gnb }) {
  return (
    <>
      {
        gnb.map((a, i) => (
          <Link to={{pathname: a['name']}} state= {{ gnbId: a['id'] }} key={a['id']+i+'icon'}>
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