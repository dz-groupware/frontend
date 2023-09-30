import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiFillStar } from 'react-icons/ai';

import {GnbApi, FavorApi, searchAPI} from '../api/menu';

import MenuList from '../components/Sys/MenuList';
import { GnbDetail, MenuDetail } from '../components/Sys/Detail';

export default function Sys({ pageId }){
  const [gnbList, setGnbList] = useState([]);
  const [result, setResult] = useState([]);
  const [favor, setFavor] = useState(false);

  const [detail, setDetail] = useState([false, false]);
  const [menuDetail, setMenuDetail] = useState("");

  const empId = useSelector(state => state.loginInfo.empId);
  const compId = useSelector(state => state.loginInfo.compId);
  const menuId = 8;  // 현재 페이지 id 가져오기 (나중에)

    useEffect(() => {
      // gnb 리스트 가져오기
      GnbApi(pageId).then(res => {setGnbList(res.data.data)});
      // 즐겨찾기 가져오기
      FavorApi(pageId, 'load', menuId).then(res => {setFavor(res.data.data)});
    }, [empId, menuId]);

    // 대메뉴/메뉴 디테일 on/off
    function menuDetailHandler(type, detail){
      if (detail === ""){
        detail = JSON.parse('{ "enabledYN": "", "iconUrl": "", "id": "", "name": "", "parId": "", "sortOrder": "" }');
      }
      if (type === 'newGnb') {
        setDetail([1, false]);
      }
      if (type === 'newMenu') {
        setDetail([false, 1]);
      }
      if (type === 'gnbDetail') {
        setDetail([2, false]);
      }
      if (type === 'menuDetail') {
        setDetail([false, 2]);
      }
      setMenuDetail(detail);
    }

    // X 버튼
    const detailOff = () =>{
      setDetail([false, false]);
    }

    // 메뉴 검색 결과
    function searchHandler(event){
      event.preventDefault();
      const formData = new FormData(document.getElementById('searchForm'));
      
      searchAPI(pageId, formData).then(res => {
        setResult(res.data.data);
      });
    }

    // 즐겨찾기 추가/삭제 요청
    function FavorHandler(){
      if (favor) {
        // 즐겨찾기가 되어 있으면 삭제 요청
        FavorApi('off', empId, menuId).then(() => {
        setFavor(!favor);
      });
    } else {
      // 즐겨찾기가 안되어 있으면 즐겨찾기 추가 요청
      FavorApi('on', empId, menuId).then(() => {
        setFavor(!favor);
      });
    }
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
              {
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
        { detail[0] && <GnbDetail value={menuDetail} detailOff={detailOff} on={detail[0]} compId={compId}/>}
        { detail[1] && <MenuDetail value={menuDetail} detailOff={detailOff} on={detail[1]} compId={compId}/>}
      </FormArea>
    </Module>
  );
}

export const Module = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: calc(100% - 90px);
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