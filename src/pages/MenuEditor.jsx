import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiFillStar } from "react-icons/ai";

import { favor } from "../utils/Slice";
import { GnbApi, FavorApi, searchAPI, PageListApi } from "../api/menu";

import MenuList from "../components/MenuEditor/MenuList";
import GnbDetail from "../components/MenuEditor/GnbDetail";
import MenuDetail from "../components/MenuEditor/MenuDetail";
import Retry from "../pages/Error/Retry";
import { ButtonTitle } from "../common/styles/Button";

export default function MenuEditor({ pageId }){
  const [clicked, setClicked] = useState("");
  const [menuDetail, setMenuDetail] = useState("");
  const [favorOn, setFavorOn] = useState(false);
  const [reRender, setReRender] = useState(true);
  const [detail, setDetail] = useState([false, false]);
  const [gnbList, setGnbList] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState([]);
  const [error, setError] = useState({
    HM: false,
    SM: false,
    pageOption: false,
  });
  const dispatch = useDispatch();
  
  // HM(Head Menu), SM(Sub Menu)

  // 대메뉴/메뉴 디테일 on/off
  const menuDetailHandler = (type, detail) => {
    switch (type) {
      case "":
        detail = JSON.parse("{ }");
        break;
      case "newGnb":
        setDetail([1, false]);
        setMenuDetail({ id: 0, name: "", enabledYn: true, sortOrder: 0, iconUrl: "default.png" });
        break;
      case "newMenu":
        setDetail([false, 1]);
        setMenuDetail({ enabledYn: true, id: 0, name: "", parId: 0, sortOrder: 0 });        
        break;
      case "gnbDetail":
        setDetail([2, false]);
        setMenuDetail(detail);
        break;
      case "menuDetail":
        setDetail([false, 2]);
        setMenuDetail(detail);
        break;
      default:
        setDetail([false, false]);
        break;
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
    const formData = new FormData(document.getElementById("searchForm"));
    searchAPI(pageId, formData)
    .then(res => {
      setResult(res.data.data);
    }).catch(() => {
      setError({ ...detail, SM: true });
    });
  };

  // 즐겨찾기 추가/삭제 요청
  const FavorHandler = () => {
    FavorApi(pageId, favorOn).then((res) => {
      if (res.data.data === 1) {
        setFavorOn(!favorOn);
      } else {
        setFavorOn(false);
      }
    }).catch(() => {
      setFavorOn(false);
    });
  };

  useEffect(() => {
    if(favorOn){
      dispatch(favor(pageId+"ture"));
    } else {
      dispatch(favor(pageId+"false"));
    }
  }, [favorOn]);

  useEffect(() => {
    if (reRender) {
      GnbApi(pageId)
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setGnbList(res.data.data);
        } else {
          setError({ ...detail, HM: true });
        };
      }).catch(() => {
        setError({ ...detail, HM: true });
      });

      PageListApi(pageId)
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setPage(res.data.data);
        } else {
          setError({ ...detail, pageOption: true });
        }}
      ).catch(() => {
        setError({ ...detail, pageOption: true });
      });

      FavorApi(pageId, "load").then(res => {
        if (res.data.data === 1) {
          setFavorOn(true);
        } else if (res.data.data === 0) {
          setFavorOn(false);
        } else {
          console.log("즐겨찾기 에러");
        }  
      }).catch((error) => {
        throw Promise.reject(error);
      });
    };
    setReRender(false);
  }, [reRender]);

  return (
    <Content>
      <Nav>
        <Title>메뉴설정</Title>
        <Btn>
          <ButtonTitle onClick={() => { menuDetailHandler("newGnb", "") }}>대메뉴추가</ButtonTitle>
          <ButtonTitle onClick={() => { menuDetailHandler("newMenu", "") }}>메뉴추가</ButtonTitle>
          <div><Pipe /></div>
          <div onClick={FavorHandler}>{favorOn ? <AiFillStar /> : <AiOutlineStar />}</div>
        </Btn>
      </Nav>
      <Line />
      <Info>
        <div>
          <AiOutlineInfoCircle /><div> Amaranth 2023 메뉴를 고객사에 맞게 설정할 수 있습니다.</div>
        </div>
      </Info>
      <FormArea>
        <MenuList 
          value={ gnbList } 
          api={ menuDetailHandler }
        />
        <MenuTree>
          <SearchForm id="searchForm">
            <div>
            <select name="gnbName">
              {error.HM ? 
              <Retry /> : 
                gnbList.map((a, i) => (
                  <option key={a["name"]+a["id"]} value={a["name"]}>{a["name"]}</option>
                ))
              }
            </select>
            <select name="pageOption">
              <option value="0">전체</option>
              {error.pageOption ? <Retry /> : 
                page.map((a, i) => (
                  <option 
                    key={a["name"]+a["id"]} 
                    value={a["id"]}
                  >{a["name"]}
                  </option>
                ))
              }
            </select>
            </div>
            <div>
              <input 
                id="name" 
                placeholder="메뉴명 검색" 
                name="name" 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchHandler(e);
                  }
                }}
              />
              <AiOutlineSearch onClick={(e) => { searchHandler(e) }} />
            </div>
            <span>메뉴목록</span>
          </SearchForm>
          <div>
            <SearchResult>
              {error.SM ? <Retry /> : 
                result.map((a, i) => (
                  <SearchItem 
                    onClick={() => {
                      menuDetailHandler("menuDetail", a);
                      setClicked(a["id"]);
                    }}  
                    className={clicked === a["id"] ? "true" : "false"}
                    key={a["name"]+a["id"]}
                  >
                    <div title={`${a['nameTree']}`}>{a["name"]}</div>
                  </SearchItem>
                ))  
              }           
            </SearchResult>
          </div>
        </MenuTree>
        {detail[0] && 
          <GnbDetail 
            pageId={pageId} 
            value={menuDetail} 
            detailOff={detailOff} 
            gnbList={gnbList}
            on={detail[0]} 
            setReRender={setReRender} 
          />
        }
        {detail[1] && 
          <MenuDetail 
            pageId={pageId} 
            value={menuDetail} 
            detailOff={detailOff} 
            on={detail[1]} 
            setReRender={setReRender} 
            page={page} 
          />
        }
      </FormArea>
    </Content>
  );
}

const Content = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: 100%;
`;
const Nav = styled.div`
display: flex;
color: #1d2437; 
width: 100%;
justify-content: space-between;
`;
const Title = styled.div`
  margin: 15px 0 5px 20px;
  font-size: large;
  font-weight: bold;
`;
const Btn = styled.div`
  display: flex;

  > * {
    margin: 10px 5px 5px 5px;
  }

  > div > svg {
    margin: 0 5px 0 0;
    padding: 0 5px 0 0;
    height: 25px;
    width: 25px;
    color: rgb(252,214,80);
  }
`;
const Info = styled.div`
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
const FormArea = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
height: 100%;
margin-bottom: 10px;
`;
const MenuTree = styled.div`
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
const SearchForm = styled.form`
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
const SearchResult = styled.div`
position: relative;
width: 100%;
height: 100%;
overflow: scroll;
&::-webkit-scrollbar {
  display: none;
}
> div:hover {
  cursor: pointer;
  white-space: normal;
  overflow: visible;
  max-width: none;
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
display: flex;
justify-content: space-between;
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