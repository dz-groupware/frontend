import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {  AiOutlineInfoCircle } from "react-icons/ai";
import {  MdArrowLeft, MdArrowRight } from "react-icons/md";
import {  IoIosArrowDown } from "react-icons/io";

import styled from "styled-components";
import Swal from "sweetalert2";

import { getDepartemnt, getOptionCompList, getBasicDetailById, getEmpListByDeptId, 
  getDepartmentById, deleteDepartment, addDepartment, 
  findDeptNameAndCode } from "../api/department";
import { FavorApi } from "../api/menu";
import { favor } from "../utils/Slice";

import DetailBasic from "../components/DepartmentManager/DetailBasic";
import DetailEmp from "../components/DepartmentManager/DetailEmp";
import TitleBtn from "../components/DepartmentManager/TitleBtn";
import SearchForm from "../components/DepartmentManager/SearchForm";
import SearchResult from "../components/DepartmentManager/SearchResult";
import DetailTitle from "../components/DepartmentManager/DetailTitle";
import Loading from "../common/styles/Loading";


export default function DepartmentManager({ pageId }) {
  // initialState
  const initSearch = {
    option: "",
    text: "",
    on: false,
    count: false,
    idx: false,
  }
  const initDetail = {
    type: false,
    id: "",
    state: false,
    save: false,
    isChanging: false,
  }
  const initValue = {
    parId: 0,
    parName: "없음",
    id: 0,
    name: "",
    abbr: "",
    code: "",
    sortOrder: 0,
    enabledYn: true,
    managementYn: false,
    includedYn: true,
  }
  // 컴포넌트에서 보내는 상태
  const [search, setSearch] = useState(initSearch);
  const [detail, setDetail] = useState(initDetail);
  const [value, setValue] = useState(initValue);
  const [item, setItem] = useState("");

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [filter, setFilter] = useState("all");

  const [pageLoading, setPageLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [favorOn, setFavorOn] = useState(false);
  const [error, setError] = useState({ tree: false, detail: false});
  const dispatch = useDispatch();

  // 즐겨찾기 추가/삭제 요청
  const handleFavor = () => {
    FavorApi(pageId, favorOn).then(res => {
      if(res.data.data === 1) {
        setFavorOn(!favorOn);
      } else {
        setFavorOn(false);
      };
    });
  };

  // 상세정보 열람
  const getDeptDetail = () => {
    if(detail.id === 0){
      // 추가 시
      setValue(initValue);
      setDetail({ ...detail, id: 0, type: "basic"});
    } else if (detail.type === "basic" && detail.id > 0) {
      try {
        getBasicDetailById(detail.id, pageId)
        .then(res => {
          setValue(res.data.data);
              // 자신의 회사가 아닌 다른 회사의 부서 정보 열람 시도
          const compId = localStorage.getItem("compId");
          const myForm = document.getElementById("basic");

          if (myForm) {
          if(compId+"" !== res.data.data["compId"]+"") {
            myForm.querySelectorAll("input, textarea, button, div").forEach(element => {
              element.disabled = true;
            });
            setDisabled(true);
          } else {
            myForm.querySelectorAll("input, textarea, button, div").forEach(element => {
              element.disabled = false;
            });
            setDisabled(false);
          }}
        }).catch((error) => {
          throw Promise.reject(error);
        });
      } catch (error) {
        console.log(error);
        setValue(initValue);
      };
    } else if (detail.type === "emp" && detail.id > 0){
      try {
        getEmpListByDeptId(detail.id, pageId).then(res => {
          setEmpList(res.data.data);
        });
      } catch (error) {
        console.log(error);
      };
    };
  };
  // 삭제
  const deleteAlert = () => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteDepartment(value['id'], pageId).then(() => {
            getDepartemnt(pageId).then(res => {
              setResult(res.data.data)}).then(() => {
                setDetail({initDetail});
                renderOrgTree();
              });
            Swal.fire({
              text: "완료되었습니다.",
              icon: "success",
            });  
          });
        } catch (error) {
          Swal.fire({
            text: "삭제에 실패하였습니다.",
            icon: "error",
          });  
        };
      };
    });
  };
  // 저장/수정/삭제 시 조직도 트리 리렌더링 
  const renderOrgTree = () => {
    try {
      getDepartemnt(pageId).then(res => {
        setResult(res.data.data);
        setSearch({ option: "basic", text: "", on: false, count: 0 });
      });  
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (direction) => {
    if (search.idx) {
      if (direction === "left") {
        if (search.idx-1 === 0) {
          setSearch({ ...search, idx: search.count});
        } else {
          setSearch({ ...search, idx: search.idx-1});
        }
      } else if (direction === "right") {
        if (search.idx+1 > search.count) {
          setSearch({ ...search, idx: 1});
        } else {
          setSearch({ ...search, idx: search.idx+1});
        }
      } else {
        console.log("handleSearch Direction Error");
      }
    } else {
      if (direction === "left") {
        setSearch({ ...search, idx: search.count});
      } else if (direction === "right") {
        setSearch({ ...search, idx: 1});
      } else {
        console.log("handleSearch Direction Error");
      }
    }
  };
  // 부서트리 하위 부서 찾기
  const findItemAndSetSubItem = (items, itemId, newSubItem) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items[i].subItem = newSubItem;
        return true;
      }
      if (items[i].subItem) {
        const subItemFound = findItemAndSetSubItem(items[i].subItem, itemId, newSubItem);
        if (subItemFound) return true; 
      }
    }

    return false; 
  };
  // 부서트리 하위 부서 추가
  const updateSubItem = (itemId, newSubItem) => {
    setResult((prevRes) => {
      const updateRes = [...prevRes];
      findItemAndSetSubItem(updateRes, itemId, newSubItem);
      return updateRes;
    });
  };
  const getDeptItem = async (compId, deptId, pageId) => {
    const res = await getDepartmentById(compId, deptId, pageId)
    return res.data.data;
  };
  const findItemAndSetSearchResult = async (items, ids, depth) => {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === ids[depth]) {
          if (depth < ids.length -1) {
            const r = await findItemAndSetSearchResult(items[i].subItem, ids, depth+1);
            items[i].subItem = r;
            return items;
          } else {
            return items;
          }
        }
      }  
    } else {  
      const result = await getDeptItem(search.option, ids[depth-1], pageId);
      items = result.find(item => item.id === ids[depth-1]);
      items.subItem = result.filter(item => item.id !== ids[depth-1]);
      for (let i = 0; i < items.subItem.length; i++) {
        if (items.subItem[i].id === ids[depth]) {
          if (depth < ids.length -1) {
            const r = await findItemAndSetSearchResult(items.subItem[i].subItem, ids, depth+1);
            items[i].subItem = r;
            return items;
          } else {
            return items.subItem;
          }
        }
      }  
    }
  };
  const updateTree = async() => {
    let updateResult = result;
    for (let i = 0; i < searchResult.length; i++) {
      const numbers = (searchResult[i].idTree).split(">").map(Number);
      updateResult = await findItemAndSetSearchResult(updateResult, numbers, 0);
    };
    setResult(updateResult);
  };

  // useEffect
  useEffect(()=>{
    const loadDeptList = async () => {
      try {
        setPageLoading(true);
        const menu = await getDepartemnt(pageId)
        .catch((error) => {
          throw Promise.reject(error);
        });
        setResult(menu.data.data);
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
        const opt = await getOptionCompList(pageId)
        .catch((error) => {
          throw Promise.reject(error);
        });
        if (Array.isArray(opt.data.data)){
          setOption(opt.data.data);
        } else {
          setOption([]);
        }
        setPageLoading(false);
      } catch (error) {
        console.log(error);
        window.location.href="/SERVICE_UNAVAILABLE"
      }
    }
    loadDeptList();
  }, []);

  useEffect(() => {
    if (favorOn) {
      dispatch(favor(pageId+"true"));
    } else {
      dispatch(favor(pageId+"false"));
    };
  }, [favorOn]);

  useEffect(()=>{ 
    try{
      getDeptDetail();      
    } catch (err) {
      console.log(err);
    }
  },[detail.id, detail.type]);

  useEffect(() => {
    if (item["id"] > 0 ){
      getDepartmentById(item["compId"], item["id"], pageId).then(res => { 
        updateSubItem(item["id"], res.data.data);
      });      
    }
  }, [item]);

  useEffect(() => {
    if (search.on){
      try {
        findDeptNameAndCode(search.option, search.text, pageId)
        .then((res) => {
          setSearch({ ...search, count: res.data.data.count, idx: 0, on: false });
          setSearchResult(res.data.data.searchList); 
        }).catch(() => {
          setError({ ...error, tree: true });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [search.on]);

  useEffect(() => {
    updateTree(); 
  }, [searchResult]);

  useEffect(() => {
    if (detail.isChanging === "save") {
      try {
        addDepartment(value, pageId).then(() => {
          renderOrgTree();
        }).then(() => {
          Swal.fire({
            text: "완료되었습니다.",
            icon: "success",
          });  
        });
        setDetail({ ...initDetail});
      } catch (error) {
        Swal.fire({
          text: "저장에 실패하였습니다.",
          icon: "cancle",
        });  
        setDetail({ ...detail, state: false, isChanging: false });
      }
    }
  }, [value]);

  useEffect(() => {
    if(detail.isChanging === "delete") {
      deleteAlert();
    }
    if(detail.isChanging === "new") {
      setValue(initValue);
      setDetail({ ...detail, id: 0, type: "basic", isChanging: false});
    }
  }, [detail.isChanging]);

  useEffect(() => {
    if(search.idx) {
      const numbers = (searchResult[search.idx -1].idTree).split(">").map(Number);
      numbers.unshift(-1);
      const moveToItem = async () => {
        for (let i =0 ; i < numbers.length; i++) {
          await new Promise((resolve) => {
            setDetail((prev) => ({
              ...prev, 
              id: numbers[i],
              isMoving: true,
            }));
            setTimeout(resolve, 100);
          });
        }  
      };
      moveToItem();
      
    }
  }, [search.idx]);
  console.log(favorOn);
  return(
    <>  
      {pageLoading && 
        <Loading />
      }
      {!pageLoading && 
        <ContentDept>
          <DeptTitle>
            <div id="deptTitle">부서관리</div>
            <TitleBtn 
              favorOn={favorOn} 
              handleFavor={handleFavor} 
              detail={detail} 
              setDetail={setDetail} 
              disabled={disabled}
            />
          </DeptTitle>
          <Line />
          <Info>
              <div onClick={() => {setInfo(!info)}}  className={`${info ? "on" : "off"}`} >
                <div><AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, "부서/팀/입사" 유형을 선택하여 등록할 수 있습니다.<IoIosArrowDown className={`toggle ${info ? "up" : "down"}`} /></div>
                <div className="content">자신의 회사는 수정이 가능하지만, 다른 회사는 조회만 가능합니다.</div>
              </div>
          </Info>
          <DetailArea>
            <SearchResultArea>
              <Suspense fallback={<Loading />}>
                <SearchForm option={option} search={search} setSearch={setSearch} />
                <div>
                  <span>조직도</span>
                  {search.count > 0 && 
                    <>
                      <MdArrowLeft onClick={() => {handleSearch("left")}} />              
                      <p>검색결과 : {search.idx}/{search.count}</p>
                      <MdArrowRight onClick={() => {handleSearch("right")}} />
                    </>
                  }
                  <select name="filter" onChange={(e) => {setFilter(e.target.value)}}>
                    <option value="all">전체</option>
                    <option value="enableY">사용중 부서</option>
                    <option value="enableN">미사용중 부서</option>
                    <option value="manageY">관리 부서</option>
                    <option value="manageN">사용자 부서</option>
                    <option value="includY">조직도 표시</option>
                    <option value="includN">조직도 미표시</option>
                  </select>
                </div>
                <SearchResult 
                  result={result} 
                  setItem={setItem} 
                  detail={detail} 
                  setDetail={setDetail} 
                  filter={filter} 
                />
              </Suspense>
            </SearchResultArea>
            <Detail>
              <DetailTitle 
                detail={detail} 
                setDetail={setDetail} 
                disabled={disabled} 
              />
              {detail.type === "basic" ? 
                <DetailBasic 
                  data={value} 
                  setData={setValue} 
                  detail={detail} 
                  setDetail={setDetail} 
                  pageId={pageId} 
                  disabled={disabled} 
                  setDisabled={setDisabled}
                />
                : null
              }
              {detail.type === "emp" ? 
                <DetailEmp empList={empList} /> 
                : null
              }
            </Detail>
          </DetailArea>
        </ContentDept>
    }
  </>
  );
};

const ContentDept = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: 100%;
`;
const DeptTitle = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
color: #1d2437;
> #deptTitle {
  margin: 15px 0 5px 20px;
  font-size: large;
  font-weight: bold;
}
`;
const Info = styled.div`
display: block;
justify-content: center;
> div {
  top: 55px;
  left: 10px;
  position: absolute;
  width: calc(100% - 20px);
  padding: 10px 10px 10px 15px;
  width: calc(100% - 20px);
  height: 40px;
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;
  color: #1d2437;
  display: block;
  overflow: hidden;
  > div {
    margin: 3px 0 15px 5px;
    &.content {
      padding-left: 40px;
    }
    > svg {
    margin-top : 0;
    &.toggle {
      position: absolute;
      right: 10px;
      transition: transform 0.3s;
    }
    &.up {
      transform: rotate(180deg);
    }
    &.down {
      transform: rotate(0deg);
    }

  }
  }

  &.on {
    height: 70px;
    transition: all 0.3s ease;
  }

  &.off {
    height: 40px;
    transition: all 0.3s ease;
  }
}
`;
const DetailArea = styled.div`
display: flex;
width: 100%;
height: calc(100% - 130px);
`;
const SearchResultArea = styled.div`
margin:10px;
height: calc(100% - 20px);
border-top: 3px solid #1d2437;
border: 1px solid #1d2437;
background-color: white;
color: black;
width: 330px;
min-width: 330px;
> div {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 5px;
  height: 20px;
  > span {
    font-size: small;
  }
  > svg {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  > select {
    font-weight: bold;
    position: relative;
    border: none;
    text-align: right;
    > option {
      background-color: white;
    }
  }
}

`;
const Detail = styled.div`
display: block;
width: 100%;
height: 100%;
min-width: 600px;
color: black;
margin: 10px;
margin-right: 20px;
`;
const Line = styled.div`
width: calc(100% - 20px);
height: 2px;
background-color: #1d2437;
margin: 5px 10px 55px 10px;
`;