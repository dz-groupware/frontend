import { Link } from 'react-router-dom';

import { GnbFavorDeleteApi, GnbFavorApi, } from '../../api/gnb';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

export function MenuList({ gnb }) {
  return (
    <>
      {
        gnb.map((a, i) => (
          <StyledLink key={a['id']+i+'gnb'}>
            <Link to={a['name']}>
              {a["name"]}
            </Link>
          </StyledLink>
        ))
      }
    </>
  );
}

export function FavList() {
  const loadFavor = useSelector(state => state.favor.favor);
  const [favorList, setFavorList] = useState([]);

  useEffect(()=> {
      try {
        GnbFavorApi().then((res) => {
          console.log(res);
          if (Array.isArray(res.data.data)) {
            setFavorList(res.data.data) ;
          }});
      } catch (error) {
        setFavorList([]);
      }
  }, [loadFavor]);

  const handleFavor = (menuId) => {
    try {
      GnbFavorDeleteApi(menuId)
      .then(GnbFavorApi()
      .then(res => {
        if (Array.isArray(res.data.data)) {
          setFavorList(res.data.data)  
        }
      }));
    } catch (error){
      console.log('error in handleFavor : ',error);
    };
  };

  return (
    <>
      { favorList.length > 0 &&
        favorList.map((a, i) => (
          <StyledLink key={a['id']+i+'fav'}>
            <Link to={a['nameTree']}>
              {a["name"]}
            </Link>
            <span onClick={() => {handleFavor(a['id'])}}>X</span>
          </StyledLink>
        ))
      }
    </>
  );
}

export function IconList({ gnb }) {
  return (
    <>
      {
        gnb.map((a, i) => (
          <StyledLink>
          <Link to={a['name']} key={a['name']+i+'icon'}>
            <img src={a['iconUrl']} alt={a['name']}/> 
          </Link>
          </StyledLink>
        ))
      }
    </>
  );
}  

const StyledLink = styled.div`
color:rgb(181,194,200);
font-size: x-large;
display: flex;
justify-content: center;
align-items: center;
height: 60px;
> a {
  list-style: none;
  text-decoration: none;
  color:rgb(181,194,200);
  width: calc(100% - 32px);
  &:hover {
    color: #9ec8f7;
  }
}

`;