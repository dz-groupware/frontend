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
            <Link to={a['name']}>
              {a["name"]}
            </Link>
          </StyledLink>
        ))
      }
    </ListArea>
  );
}

export function FavList({ favor }) {
  const [favorList, setFavorList] = useState(JSON.parse(`[{}]`));
  const empId = localStorage.getItem("empId");

  //?
  useEffect(()=> {
    setFavorList(favor);
  }, [favor]);

  const handleFavor = (menuId) => {
    try {
      GnbFavorDeleteApi(empId, menuId)
      .then(GnbFavorApi(empId)
      .then(res => setFavorList(res.data)));  
    } catch (error){
      if (error.status === 401) {
        console.log('로그인 정보 없음 (in FavList)');
        localStorage.setItem("empId", 0);
        localStorage.setItem("compId", 0);
        window.location.href="/login";
      }
    }
  }

  return (
    <ListArea>
      {
        favorList.map((a, i) => (
          <StyledLink key={a['id']+i+'fav'}>
            <Link to={a['nameTree']}>
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
          <Link to={a['name']} key={a['name']+i+'icon'}>
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