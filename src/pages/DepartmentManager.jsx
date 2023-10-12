import { Suspense, useEffect, useState } from "react";
import {  AiOutlineInfoCircle } from 'react-icons/ai';
import {  IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import styled from 'styled-components';
import Swal from 'sweetalert2';

import { getDepartemnt, getOptionCompList, getBasicDetailById, getEmpListByDeptId, 
  modifyDepartment, getDepartmentById, deleteDepartment, addDepartment, 
  findDeptNameAndCode } from '../api/department';
import { FavorApi } from '../api/menu';

import DetailBasic from '../components/DepartmentManager/DetailBasic';
import DetailEmp from '../components/DepartmentManager/DetailEmp';
import TitleBtn from '../components/DepartmentManager/TitleBtn';
import SearchForm from '../components/DepartmentManager/SearchForm';
import SearchResult from '../components/DepartmentManager/SearchResult';
import DetailTitle from '../components/DepartmentManager/DetailTitle';
import Loading from '../common/styles/Loading';

export default function DepartmentManager({ pageId }) {
  // initialState
  const initSearch = {
    option: '',
    text: '',
    on: false,
  }
  const initDetail = {
    type: false,
    id: '',
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
  const [item, setItem] = useState('');
  const [info, setInfo] = useState(false);

  const [favor, setFavor] = useState(false);

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [filter, setFilter] = useState('all');
  const [pageLoading, setPageLoading] = useState(false);
  // console.log(detail);
  // console.log(search)
  // console.log(value)
  // console.log(form);
  // console.log("error:", error);
  console.log("result : ", result);

  // 즐겨찾기 추가/삭제 요청
  const handleFavor = () => {
    FavorApi(pageId, favor).then(res => {
      if(res.data.data === 1) {
        setFavor(!favor);
      }else {
        console.log('즐겨찾기 오류 : 강제 off')
        setFavor(false);
      }
    });
  };
  // 삭제
  const deleteAlert = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteDepartment(value, pageId).then(() => {
            getDepartemnt(pageId).then(res => {
              setResult(res.data.data)}).then(() => {
                setDetail({initDetail});
                renderOrgTree();
              });
            Swal.fire({
              text: "완료되었습니다.",
              icon: 'success',
            });  
          });
        } catch (error) {
          console.log('삭제에 실패하였습니다.');
          Swal.fire({
            text: "삭제에 실패하였습니다.",
            icon: 'error',
          });  
        }
      }
    });
  }
  // 상세정보 열람
  const handleModifyNoti = () => {
    console.log('in hmn', detail);
    if(detail.id === 0){
      // 추가 시
      setValue(initValue);
      setDetail({ ...detail, type: 'basic'});
    } else if (detail.type === 'basic' && detail.id > 0) {
      try {
        console.log('부서 상세 요청 : ', detail.id)
        getBasicDetailById(detail.id, pageId).then(res => {
          setValue(res.data.data);
          console.log('try disabled');
              // 자신의 회사가 아닌 다른 회사의 부서 정보 열람 시도
          const compId = localStorage.getItem("compId");
          const myForm = document.getElementById('basic');

          if (myForm) {
          if(compId+"" !== res.data.data['compId']+"") {
            myForm.querySelectorAll('input, textarea, button, div').forEach(element => {
              element.disabled = true;
            });
            setDisabled(true);
          } else {
            myForm.querySelectorAll('input, textarea, button, div').forEach(element => {
              element.disabled = false;
            });
            setDisabled(false);
          }}
        });
      } catch (error) {
        console.log(error);
        setValue(initValue);
      };
    } else if (detail.type === 'emp' && detail.id > 0){
      try {
        getEmpListByDeptId(detail.id, pageId).then(res => {
          setEmpList(res.data.data);
          // setDetail({ ...detail, id: detail.isChanging, isChanging: false});
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  // 부서트리 하위 부서 찾기
  const findItemAndSetSubItem = (items, itemId, newSubItem) => {
    console.log('여기도 옴')
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
    return false; // 아무것도 찾지 못한 경우
  }
  // 부서트리 하위 부서 추가
  const updateSubItem = (itemId, newSubItem) => {
    console.log('여기도')
    setResult((prevRes) => {
      const updateRes = [...prevRes];
      findItemAndSetSubItem(updateRes, itemId, newSubItem);
      return updateRes;
    });
  }
  // 저장/수정/삭제 시 조직도 트리 리렌더링 
  const renderOrgTree = () => {
    try {
      getDepartemnt(pageId).then(res => {
        console.log(' new res : ', res.data.data);
        setResult(res.data.data);
        setSearch({ option: 'basic', text: '', on: false });
      });  
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    const loadDeptList = async () => {
      try {
        setPageLoading(true);
        const menu = await getDepartemnt(pageId);
        console.log(menu);
        setResult(menu.data.data);
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
        const opt = await getOptionCompList(pageId);
        if (Array.isArray(opt.data.data)){
          setOption(opt.data.data);
        } else {
          setOption([]);
        }
        setPageLoading(false);
      } catch (error) {
        console.log(error);
        window.location.href='/SERVICE_UNAVAILABLE'
      }
    }
    loadDeptList();
  }, []);
  
  // 부서 상세 정보 요청
  useEffect(()=>{ 
    console.log('상세 요청', detail);
    handleModifyNoti();
  },[detail.id, detail.type]);
  useEffect(() => {
    // console.log('updated value : ', value, detail);
    // 데이터 업데이트 (저장 시)
    if (detail.state === 'save') {
      try {
        console.log('save request', value);
        addDepartment(value, pageId).then(() => {
          console.log('저장 후 조직도 리렌더링');
          renderOrgTree();
        }).then(() => {
          Swal.fire({
            text: "완료되었습니다.",
            icon: 'success',
          });  
        });
        setDetail({ ...initDetail});
      } catch (error) {
        console.log('저장에 실패하였습니다.');
        Swal.fire({
          text: "저장에 실패하였습니다.",
          icon: 'cancle',
        });  
        setDetail({ ...detail, state: false, isChanging: false });
      }
    }
  }, [value]);

  useEffect(() => {
    if (detail.save) {
      try {
        if(detail.state === 'save'){
            if(detail.id === 0){
              console.log('추가 요청');
              try {

              } catch (error) {

              }
            }
            if(detail.id > 0) {
              console.log('수정 요청');            
              try {
                modifyDepartment(value, pageId).then(res => {
                  Swal.fire({
                    icon: 'success',
                    title: '완료되었습니다.',
                    showConfirmButton: false,
                    timer: 1500
                  });              
                });
                setDetail({...detail, state: false, save: false, isChanging: false });
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  title: '다시 시도해 주세요.',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }    
          }
      } catch (error) {
        console.log('save error : ', error);
      }
    }
    setDetail({ ...detail, state: false, save: false });
    // console.log('저장 삭제 버튼 마무리 : ', detail);
  }, [detail.save]);

  useEffect(() => {
    if (detail.save === 'save' && detail.isChanging === 'save') {
      setDetail({ ...detail, isChanging: false});
      getDepartemnt(pageId).then(res => setResult(res.data.data));
    }
    if(detail.type === 'emp') {
      setDetail({ ...detail, id: detail.isChanging, isChanging: false });
    }
    if(detail.state === 'delete') {
      // 삭제하시겠습니까?
      deleteAlert();
    }
  }, [detail.isChanging]);

  useEffect(() => {
    console.log("item : ", typeof item['id']);
    if (item['id'] > 0 ){
      console.log('item id : ', item)
      console.log('pageId : ', pageId)
      getDepartmentById(item['compId'], item['id'], pageId).then(res => { 
        updateSubItem(item['id'], res.data.data);
      });      
    }
  }, [item]);

  useEffect(() => {
    if (search.on){
      try {
        findDeptNameAndCode(search.option, search.text, pageId).then(res => {
          console.log('res : ', res.data.data);
          setResult(res.data.data);
          setSearch({ ...search, on: false });
        });  
      } catch (error) {
        console.log(error);
      }
    }
  }, [search.on]);

  return(
    <>{
      pageLoading && <Loading />
    }
    { !pageLoading && 
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <TitleBtn favor={favor} handleFavor={handleFavor} detail={detail} setDetail={setDetail} disabled={disabled}/>
      </DeptTitle>
      <Line />
      <Info>
          <div onClick={() => {setInfo(!info)}}  className={`${info ? 'on' : 'off'}`} >
            <div><AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.<IoIosArrowDown className={`toggle ${info ? 'up' : 'down'}`} /></div>
            <div className='content'>자신의 회사는 수정이 가능하지만, 다른 회사는 조회만 가능합니다.</div>
          </div>
      </Info>
      <DetailArea>
        <SearchResultArea>
          <Suspense fallback={<Loading />}>
            <SearchForm option={option} search={search} setSearch={setSearch} />
            <div>
              <span>조직도</span>
              <select name="filter" onChange={(e) => {setFilter(e.target.value)}}>
                <option value="all">전체</option>
                <option value='enableY'>사용중 부서</option>
                <option value='enableN'>미사용중 부서</option>
                <option value='manageY'>관리 부서</option>
                <option value='manageN'>사용자 부서</option>
                <option value='includY'>조직도 표시</option>
                <option value='includN'>조직도 미표시</option>
              </select>
            </div>
            <SearchResult result={result} setItem={setItem} detail={detail} setDetail={setDetail} filter={filter}/>
          </Suspense>
        </SearchResultArea>
        <Detail>
          <DetailTitle detail={detail} setDetail={setDetail} disabled={disabled}/>
          {
            detail.type === 'basic' ? 
            <DetailBasic data={value} setData={setValue} detail={detail} setDetail={setDetail} pageId={pageId} disabled={disabled} setDisabled={setDisabled}/>
            : null
          }
          {
            detail.type === 'emp' ? <DetailEmp empList={empList} /> : null
          }
        </Detail>
      </DetailArea>
    </ContentDept>
  }</>);
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