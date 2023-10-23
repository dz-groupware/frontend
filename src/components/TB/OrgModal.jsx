import { useEffect, useState } from "react";

import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

import {orgTreeApi, orgEmpListApi, searchOrg} from "../../api/modal";

import EmpList from "./OrgModal/EmpList";
import EmpDetail from "./OrgModal/EmpDetail";

export default function OrgModal({ setOrgModal, empId }){
  const [Loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [empList, setEmpList] = useState([]);

  const [searchOption, setSearchOption] = useState("all", "");
  const [searchText, setSearchText] = useState("");
  const [detail, setDetail] = useState();
  const [detailOpen, setDetailOpen] = useState();

  const [clicked, setClicked] = useState("");
  const [clickedEmp, setClickedEmp] = useState("");

  const loadEmpList = async(type, compId, deptId) => {
    const res = await orgEmpListApi(type, compId, deptId);
    if (Array.isArray(res.data.data)) {
      setEmpList(res.data.data);
    }
  };

  const EmpDetailHandler = (detailData) => {
    if(detail === detailData){
      setDetailOpen(false);
    } else {
      setDetail(detailData);
      setDetailOpen(true);
    }
    setClickedEmp(detailData["deptName"]+detailData["empName"]);
  };

  const searchHandler = () => {
    setEmpList([]);
    searchOrg(0, searchOption, searchText)
    .then((res) => {
      setEmpList(res.data.data);
    });
  };

  const modalOff = () => {
    setOrgModal(false);
  };

  // 부서트리 하위 부서 찾기
  const findItem = (items, itemId, newSubItem) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items[i].subItem = newSubItem;
        return true;
      };
      if (items[i].subItem) {
        const subItemFound = findItem(items[i].subItem, itemId, newSubItem);
        if (subItemFound) return true; 
      };
    };

    return false; 
  };
  // 트리 하위 추가
  const updateSubItem = (itemId, newSubItem) => {
    setData((prevRes) => {
      const updateRes = [...prevRes];
      findItem(updateRes, itemId, newSubItem);
      return updateRes;
    });
  };
  const LoadItem = async() => {
    try {
      await orgTreeApi(clicked["type"], clicked["compId"], clicked["id"])
      .then((res) => {
        if (res.data.data.length > 0) {
          updateSubItem(clicked["id"], res.data.data);
        };
      }).catch((error) => {
        throw Promise.reject(error);
      });
    } catch (error) {
      console.log("error");
    };
  };
  
  useEffect(() => {
    setLoading(true);
    const LoadData = async() => {
      try {
        await orgTreeApi("basic", "","")
        .then((res) => {
          let items = res.data.data.find(item => item["parId"] === item["id"] && item["type"] === "comp");
          const subItems = res.data.data.filter(item => item["parId"] !== item["id"] || item["type"] === "dept");
          items.subItem = subItems;
          setData([items]);
          setLoading(false);
        }).catch((error) => {
          throw Promise.reject(error);
        });
      } catch (error) {
        console.log("error");
      };
    };
    LoadData();
  }, []);  

  useEffect(() => {
    loadEmpList(clicked["type"], clicked["compId"], clicked["id"]);
    if(!clicked.subItem){
      LoadItem();
    }
  }, [clicked]);

  return (
    <ModalBackdrop onClick={modalOff}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
        <div id="nav">
          <h3>조직도</h3>
          <div onClick={modalOff}>X</div>
        </div>
      <div>
        <SearchBar>
          <div>
            <select value={searchOption} onChange={(e)=>{setSearchOption(e.target.value)}} >
              <option value="all">전체</option>
              <option value="dept">부서명</option>
              <option value="emp">사원명</option>
            </select>
            <input 
              type="text" 
              placeholder="검색" 
              value={searchText} 
              onChange={(e)=>setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                };
              }
            }/>
          </div>
          <AiOutlineSearch onClick={() => {searchHandler()}}/>
        </SearchBar>
        <div id="content" className="flex">
          <DeptList>
          {!Loading && (
            <ItemList 
              data={data[0]} 
              clicked={clicked} 
              setClicked={setClicked} 
              key={data["type"]+data["id"]}
            />
          )} 
          </DeptList>
          <EmpList 
            value={empList} 
            handler={EmpDetailHandler} 
            clickedEmp={clickedEmp} 
            setClickedEmp={setClickedEmp}
          />
          {detailOpen ? 
            <EmpDetail list={detail}/> 
            : <Empty/>
          }
      </div>
      </div>
    </OrgModalView>
  </ModalBackdrop>
  );
}

function ItemList({ data, clicked, setClicked }) {
  const [open, setOpen] = useState(false);

  const handleItem = () => {
    setClicked(data);
    setOpen(!open);
  };
  console.log('data', data);
  console.log('clicked', clicked);
  return (
    <Item key={data["name"]+data["id"]}>
      <div 
        className={`title ${(data["type"]+data["id"] === clicked["type"]+clicked["id"]) ? "true" : "false"}`} 
        onClick={() => {
          handleItem()
        }}>
        {data["type"] === "comp" ? 
          <img src="/img/comp/branch_48.png" alt="icon"/> 
          : <img src="/img/dept.png" alt="icon"/> 
        }
        <p>{ data["name"] }</p>
      </div>
      {open && data.subItem && data.subItem.length > 0 && 
        data.subItem.map((a, i) => (
          <ItemList data={a} clicked={clicked} setClicked={setClicked} key={a["type"]+a["id"]}/>
        ))
      }
    </Item>
  );
}

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;
const OrgModalView = styled.div`  
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:0px;
  right:0px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 1000px;
  height: 550px;
  color: black;
  background-color: #ffffff;
  padding: 20px;
  > #nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > h3 {
      font-size: x-large;
      font-weight: bold;
    }
    > div {
      font-size: x-large;
      font-weight: bold;
    }
  }
  > div > span {
    position : right;
  }
  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;
  }
`;
const DeptList = styled.ul`
margin-top : 5px;
width: 250px;
height: 100%;
border : 1px gray solid;
overflow: scroll;
&::-webkit-scrollbar{
  display: none;
}
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;
const Item = styled.li`
margin-left: 10px;
list-style: none;
> .title {
  display: flex;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(214,236,248);
    border-radius: 5px;
  }
  > img {
    margin: 5px;
    width: 20px;
    height: 20px;
  }
  &.true {
    background-color: rgb(214,236,248);
    border: 1px solid rgb(146,183,214);
    border-radius: 5px;
  }
  > p {
    padding-top: 10px;
  }
}
`;
const Empty = styled.div`
margin-top : 5px;
width: 250px;
height: 100%;
`;
const SearchBar = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
border: 1px solid gray;  
margin-top: 20px;
margin-bottom: 10px;
height: 50px;
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
> div {
  > select {
    width: 200px;
    height: 25px;
    margin: 10px;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  }

  > input {
    height: 25px;
    width: 600px;
    margin: 10px;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  }
}
> svg {
  width: 35px;
  height: 35px;
  margin: 5px;
  padding: 5px;
  font-weight: bold;
}
`;