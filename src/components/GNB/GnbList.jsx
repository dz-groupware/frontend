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

  useEffect(()=> {
    setFavorList(favor);
  }, []);

  const handleFavor = (menuId) => {
    try {
      GnbFavorDeleteApi(menuId)
      .then(GnbFavorApi()
      .then(res => {
        if (Array.isArray(res.data.data)) {
          setFavorList(res.data)  
        }
      }));
    } catch (error){
      console.log('error in handleFavor : ',error);
    };
  };

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
&.clicked {
  background-color: black;
}
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