import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiFillStar } from 'react-icons/ai';

import {GnbApi, FavorApi, searchAPI, PageListApi} from '../api/menu';

import MenuList from '../components/MenuEditor/MenuList';
import { GnbDetail, MenuDetail } from '../components/MenuEditor/Detail';
import Retry from '../common/Error/Retry';

export default function MenuEditor({ pageId }){
  const [gnbList, setGnbList] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState([]);

  const [favor, setFavor] = useState(false);
  const [reRender, setReRender] = useState(true);

  const [detail, setDetail] = useState([false, false]);
  const [menuDetail, setMenuDetail] = useState("");

  const [error, setError] = useState({
    gnb: false,
  });

  console.log(pageId, 'faovr: ', favor);

  useEffect(() => {
    console.log('reRender');
    if(reRender){
      // gnb 리스트 가져오기
      GnbApi(pageId).then(res => {
        if (Array.isArray(res.data.data)) {
          setGnbList(res.data.data);
        } else {
          setError({ ...detail, gnb: true });
        };
      });
      // 즐겨찾기 가져오기
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
      PageListApi(pageId).then(res => {setPage(res.data.data)});
      searchHandler();
    }
    setReRender(false);
  // }, [pageId, reRender]);
}, [reRender]);

  // 대메뉴/메뉴 디테일 on/off
  function menuDetailHandler(type, detail){
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
  }

  // X 버튼
  const detailOff = () =>{
    setDetail([false, false]);
  }

  // 메뉴 검색 결과
  function searchHandler(event){
    if(event !== undefined){
      event.preventDefault();
    }
    const formData = new FormData(document.getElementById('searchForm'));
    console.log(formData.get("gnbName"))
    searchAPI(pageId, formData).then(res => {
      
      setResult(res.data.data);
    });
  }

  // 즐겨찾기 추가/삭제 요청
  function FavorHandler(){
    FavorApi(pageId, favor).then(res => {
      console.log("favor", favor, " -> ", res.data.data);
      if(res.data.data === 1) {
        setFavor(!favor);
      }else {
        console.log('즐겨찾기 오류 : 강제 off')
        setFavor(false);
      }
    });
  }

  return (
    <Module>
      <Nav>
        <div id ='menuTitle'>메뉴설정</div>
        <div id ='menuBtn'>
          <button>변경이력</button>
          <button onClick={() => {menuDetailHandler('newGnb', '')}}>대메뉴추가</button>
          <button onClick={() => {menuDetailHandler('newMenu', '')}}>메뉴추가</button>
          <hr />
          <div onClick={FavorHandler}>{favor ? <AiFillStar /> : <AiOutlineStar/>}</div>
        </div>
      </Nav>
      <Info>
          <div>
          <AiOutlineInfoCircle />&nbsp; info
          </div>
      </Info>
      <FormArea>
        <MenuList value={gnbList} api={menuDetailHandler}/>
        <MenuTree>
          <SearchForm id="searchForm">
            <select name="gnbName">
              { error.gnb ? <Retry /> : 
                gnbList.map((a, i) => (
                  <option key={a['name']+a['id']} id='gnbName' value={a['name']}>{a['name']}</option>
                  ))
              }
            </select><select><option>전체</option></select>
            <input id='name' placeholder=' 메뉴명 검색' name='name'/>
            <AiOutlineSearch onClick={(e) => {searchHandler(e)}}/>
            <br />
            <div>
              <span>메뉴목록</span>
              <select name="filter" sytle={{zIndex: -2}}>
                <option value="all">필터</option>
                <option value='admin'>관리자 메뉴</option>
                <option value='general'>사용자메뉴</option>
              </select>
            </div>
          </SearchForm>
          <div>
            <SearchResult>
              {
              result.map((a, i) => (
                <div onClick={() => {menuDetailHandler('menuDetail', a)}} key={a['name']+a['id']}>{a['name']}</div>
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
border-top: 5px solid rgb(20,136,247);
border-bottom: 1px solid grey;
display: flex;
color: black;
width: 100%;
justify-content: space-between;

> #menuTitle {
  margin: 10px;
  margin-left: 20px;
  font-size: large;
  font-weight: bold;
  color: rgb(32,35,44);
}
> #menuBtn {
  display: flex;
  margin-top: 5px;
  > * {
    
    height: 30px;
    margin: 5px;
  }
  > svg {
    margin-top: 10px;
    width: 20px;
    height: 20px;
    color: gray;
  }
}
`;
export const Info = styled.div`
display: flex;
justify-content: center;

> div {
  margin: 10px;
  padding: 10px;
  padding-left:15px;
  width: 100%;
  height: 40px;
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;

  color: black;
  font-weight: bold;
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
width: 400px;
border: 1px solid rgb(171,172,178);
color: black;

`;
export const SearchForm = styled.form`
padding: 5px;
height: 100px;
background-color: rgb(240,245,248);
border-bottom: 1px solid rgb(171,172,178);
color: black;
min-width: 400px;
> select {
  width:170px;
  height:25px;
  margin: 5px;
  margin-left: 10px;
}
> input {
  width: 320px;
  height: 20px;
  margin: 5px;
  margin-left: 10px;
}
> svg {
  width: 20px;
  height: 20px;
}

> div {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 5px;

  > span {
    font-size: small;
  }
  > select {
    font-weight: bold;
    position: relative;
    border: none;
    background-color: rgb(240,245,248);
    text-align: right;
    > option {
      background-color: white;
    }
  }
}
`;
export const SearchResult = styled.form`
overflow: scroll;
height: 300px;
&::-webkit-scrollbar {
  display: none;
}
> div {
  margin: 10px;
  padding: 10px;
  background-color: rgb(214,236,248);

}
`;