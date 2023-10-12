import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiFillStar } from 'react-icons/ai';

import {GnbApi, FavorApi, searchAPI, PageListApi} from '../api/menu';

import MenuList from '../components/MenuEditor/MenuList';
import GnbDetail from '../components/MenuEditor/GnbDetail';
import MenuDetail from '../components/MenuEditor/MenuDetail';
import Retry from '../common/Error/Retry';
import { ButtonTitle } from '../common/styles/Button';

export default function MenuEditor({ pageId }){
  const [gnbList, setGnbList] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState([]);
  const [favor, setFavor] = useState(false);
  const [reRender, setReRender] = useState(true);
  const [clicked, setClicked] = useState('');
  const [error, setError] = useState({
    gnb: false,
    pageOption: false,
  });

  const [detail, setDetail] = useState([false, false]);
  const [menuDetail, setMenuDetail] = useState("");

  // 대메뉴/메뉴 디테일 on/off
  const menuDetailHandler = (type, detail) => {
    if (detail === ""){
      detail = JSON.parse('{ }');
    }
    if (type === 'newGnb') {
      setDetail([1, false]);
      setMenuDetail({ id: 0, name: '', enabledYn: true, sortOrder: 0, iconUrl: 'default.png' });
    }
    if (type === 'newMenu') {
      setDetail([false, 1]);
      setMenuDetail({ enabledYn: true, id: 0, name: "", parId: 0, sortOrder: 0 });
    }
    if (type === 'gnbDetail') {
      setDetail([2, false]);
      setMenuDetail(detail);
    }
    if (type === 'menuDetail') {
      setDetail([false, 2]);
      setMenuDetail(detail);
    }
  };

  // X 버튼
  const detailOff = () => {
    setDetail([false, false]);
  };

  // 메뉴 검색 결과
  const searchHandler = (event) => {
    if(event !== undefined){
      event.preventDefault();
    }
    const formData = new FormData(document.getElementById('searchForm'));
    searchAPI(pageId, formData).then(res => {
      setResult(res.data.data);
    });
  };

  // 즐겨찾기 추가/삭제 요청
  const FavorHandler = () => {
    FavorApi(pageId, favor).then(res => {
      console.log("favor", favor, " -> ", res.data.data);
      if(res.data.data === 1) {
        setFavor(!favor);
      }else {
        console.log('즐겨찾기 오류 : 강제 off')
        setFavor(false);
      }
    });
  };

  useEffect(() => {
    if(reRender){
      GnbApi(pageId).then(res => {
        if (Array.isArray(res.data.data)) {
          setGnbList(res.data.data);
        } else {
          setError({ ...detail, gnb: true });
        };
      });
      FavorApi(pageId, 'load').then(res => {
        console.log(res.data.data);
        if (res.data.data === 1){
          console.log('즐겨찾기 on')
          setFavor(true);
        } 
        if (res.data.data === 0) {
          console.log('즐겨찾기 off')
          setFavor(false);
        } else {
          console.log('즐겨찾기 에러')
        }  
      });
      PageListApi(pageId).then(res => {
        if (Array.isArray(res.data.data)) {
          setPage(res.data.data);
        } else {
          setError({ ...detail, pageOption: true });
        }
      });
    }
  }, []);

  useEffect(() => {
    if(reRender){
      GnbApi(pageId).then(res => {
        if (Array.isArray(res.data.data)) {
          setGnbList(res.data.data);
        } else {
          setError({ ...detail, gnb: true });
        };
      });
      PageListApi(pageId).then(res => {
        if (Array.isArray(res.data.data)) {
          setPage(res.data.data);
        } else {
          setError({ ...detail, pageOption: true });
        }});
    }
    setReRender(false);
  }, [reRender])

  return (
    <Module>
      <Nav>
        <div id ='menuTitle'>메뉴설정</div>
        <div id ='menuBtn'>
          <ButtonTitle onClick={() => {menuDetailHandler('newGnb', '')}}>대메뉴추가</ButtonTitle>
          <ButtonTitle onClick={() => {menuDetailHandler('newMenu', '')}}>메뉴추가</ButtonTitle>
          <div><Pipe /></div>
          <div onClick={FavorHandler}>{favor ? <AiFillStar /> : <AiOutlineStar/>}</div>
        </div>
      </Nav>
      <Line />
      <Info>
          <div>
          <AiOutlineInfoCircle /><div> Amaranth 2023 메뉴를 고객사에 맞게 설정할 수 있습니다.</div>
          </div>
      </Info>
      <FormArea>
        <MenuList value={gnbList} api={menuDetailHandler}/>
        <MenuTree>
          <SearchForm id="searchForm">
            <div>
            <select name="gnbName">
              { error.gnb ? <Retry /> : 
                gnbList.map((a, i) => (
                  <option key={a['name']+a['id']} value={a['name']}>{a['name']}</option>
                  ))
              }
            </select>
            <select name="pageOption">
              <option value='0'>전체</option>
              { error.pageOption ? <Retry /> : 
                page.map((a, i) => (
                  <option key={a['name']+a['id']} value={a['id']}>{a['name']}</option>
                  ))
              }
            </select>
            </div>
            <div>
              <input id='name' placeholder=' 메뉴명 검색' name='name'/>
              <AiOutlineSearch onClick={(e) => {searchHandler(e)}}/>
            </div>
            <span>메뉴목록</span>
          </SearchForm>
          <div>
            <SearchResult>
              {
              result.map((a, i) => (
                <SearchItem onClick={() => {
                  menuDetailHandler('menuDetail', a);
                  setClicked(a['id']);
                }} className={(clicked === a['id']) ? 'true' : 'false'}
                key={a['name']+a['id']}>{a['name']}</SearchItem>
                ))
              }          
            </SearchResult>
          </div>
        </MenuTree>
        { detail[0] && <GnbDetail pageId={pageId} value={menuDetail} detailOff={detailOff} on={detail[0]} setReRender={setReRender}/>}
        { detail[1] && <MenuDetail pageId={pageId} value={menuDetail} detailOff={detailOff} on={detail[1]} setReRender={setReRender} page={page}/>}
      </FormArea>
    </Module>
  );
}

export const Module = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: 100%;
`;
export const Nav = styled.div`
display: flex;
color: #1d2437; 
width: 100%;
justify-content: space-between;
> #menuTitle {
  margin: 15px 0 5px 20px;
  font-size: large;
  font-weight: bold;
}
> #menuBtn {
  display: flex;
  > * {
    margin: 10px 5px 5px 5px;
  }
  > div {
    > svg {
      margin: 0 5px 0 0;
      padding: 0 5px 0 0;
    height: 25px;
    width: 25px;
    color: rgb(252,214,80);
  }
  }
}
`;
export const Info = styled.div`
display: flex;
justify-content: center;

> div {
  margin: 10px;
  padding: 10px 10px 10px 15px;
  width: 100%;
  height: 40px;
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;
  color: #1d2437;
  display: flex;
  > div {
    margin: 3px 0 0 5px;
  }
  > svg {
    margin-top : 4px;
  }
}
`;
export const FormArea = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
height: 100%;
margin-bottom: 10px;
`;
export const MenuTree = styled.div`
margin:10px;
height: calc(100% - 150px);
background-color: white;
width: 390px;
border: 1px solid #1d2437;
color: black;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
> div {
  height: calc(100% - 120px);
}
`;
export const SearchForm = styled.form`
padding: 5px;
height: 110px;
background-color: #f2f3f6;
border-top: 2px solid #1d2437;
border-bottom: 1px solid #1d2437;
color: #1d2437;
min-width: 370px;
> div > select {
  width: 170px;
  height: 25px;
  margin: 5px;
  margin-left: 10px;
}
> div {
  > input {
    width: 320px;
    height: 25px;
    margin: 5px;
    margin: 10px 0 10px 10px;
  }
  > svg {
    position: absolute;
    margin-left: 7px;
    margin-top: 7px;
    width: 30px;
    height: 30px;
  }
}
> span {
  font-weight: bold;
  margin: 0 0 15px 10px;
  font-size: small;
}
`;
export const SearchResult = styled.div`
position: relative;
height: 100%;
overflow: scroll;
&::-webkit-scrollbar {
  display: none;
}
`;
const Pipe = styled.div`
width: 1.5px;
height: 70%;
background-color: #414854;
margin: 5px 0 0 5px;
`;
const Line = styled.div`
width: calc(100% - 20px);
height: 2px;
background-color: #1d2437;
margin: 5px 10px 5px 10px;
`;
const SearchItem = styled.div`
margin: 10px;
padding: 10px;
background-color: #eff1f4;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
&.true{
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  transition: all 0.3s ease;
}
`;