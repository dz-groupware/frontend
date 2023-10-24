import { Link } from 'react-router-dom';

import { GnbFavorDeleteApi, GnbFavorApi, } from '../../api/layout';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { favor } from "../../utils/Slice";

export function MenuList({ gnb, idx, setIdx }) {
  return (
    <>
      {
        gnb.map((a, i) => (
          <StyledLink key={'gnb'+i}
          className={`${idx.hover === i || idx.click === i ? 'hoverOn' : 'hoverOff'}`}
          onClick={() => {
            setIdx({ ...idx, click: i});
          }}
          >
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
  const dispatch = useDispatch();

  useEffect(()=> {
    try {
      GnbFavorApi()
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          console.log(res.data);
          setFavorList(res.data.data) ;
        }}).catch(() => {
          setFavorList([]);
        });
    } catch (error) {
      setFavorList([]);
    };
  }, [loadFavor]);

  const handleFavor = (menuId) => {
      GnbFavorDeleteApi(menuId)
      .then(GnbFavorApi()
      .then(res => {
        if (Array.isArray(res.data.data)) {
          setFavorList(res.data.data)  
        }
      })).catch(() => {
        setFavorList([]);
        // 일시적인 오류 입니다 띄우기
      });

  };

  return (
    <>
      { favorList.length > 0 &&
        favorList.map((a, i) => (
          <StyledLink key={a['id']+i+'fav'}>
            <Link to={a['nameTree']}>
              {a["name"]}
            </Link>
            <div onClick={() => {handleFavor(a['id'])}}>X</div>
          </StyledLink>
        ))
      }
    </>
  );
}

export function IconList({ gnb, idx, setIdx }) {
  return (
    <>
      {
        gnb.map((a, i) => (
          <StyledLink 
          key={'icon'+i} 
          className={`${idx.hover === i || idx.click === i ? 'hoverOn' : 'hoverOff'}`}
          onClick={() => {
            setIdx({ ...idx, click: i});
          }}
          >
          <Link to={a['name']}>
            <img src={a['iconUrl']} alt={a['name']} /> 
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
cursor: pointer;
&:hover {
  > a {
    color: #e5ebfe;
  }
}
&.hoverOn {
  background-color: #030624;
}
> a {
  list-style: none;
  text-decoration: none;
  color:rgb(181,194,200);
  width: calc(100% - 32px);
}
> div {
  margin: 3px;
}
`;