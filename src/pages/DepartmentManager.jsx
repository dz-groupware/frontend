import { Suspense, useEffect, useState } from "react";
import {  AiOutlineInfoCircle } from 'react-icons/ai';

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
import { Loading } from './VIEW';


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

  const [favor, setFavor] = useState(false);

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);

  console.log(detail);
  // console.log(search)
  // console.log(value)
  // console.log(form);
  // console.log("error:", error);
  // console.log("result : ", result);

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
            getDepartemnt(pageId).then(res => setResult(res.data.data));
            Swal.fire({
              text: "완료되었습니다.",
              icon: 'success',
            });  
            setDetail({initDetail});
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
      setDetail({ ...initDetail, type: 'basic'});
    } else if (detail.type === 'basic' && detail.id > 0) {
      try {
        console.log('부서 상세 요청 : ', detail.id)
        getBasicDetailById(detail.id, pageId).then(res => {
          setValue(res.data.data);});
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
  function findItemAndSetSubItem(items, itemId, newSubItem) {
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
    setResult((prevRes) => {
      const updateRes = [...prevRes];
      findItemAndSetSubItem(updateRes, itemId, newSubItem);
      return updateRes;
    });
  }
  
  useEffect(()=>{
    const loadDeptList = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
    loadDeptList();
  }, []);
  
  // 부서 상세 정보 요청
  useEffect(()=>{ 
    console.log('상세 요청')
    handleModifyNoti();
  },[detail.id, detail.type]);
  useEffect(() => {
    console.log('updated value : ', value, detail);
    // 데이터 업데이트 (저장 시)
    if (detail.state === 'save') {
      try {
        console.log('save request', value);
        addDepartment(value, pageId).then(() => {
          Swal.fire({
            text: "완료되었습니다.",
            icon: 'success',
          });  
        });
      } catch (error) {
        console.log('저장에 실패하였습니다.');
        Swal.fire({
          text: "저장에 실패하였습니다.",
          icon: 'cancle',
        });  
      }
      setDetail({ ...detail, state: false, isChanging: false });
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
      //   if(detail.state === 'delete'){
      //     handleDelete();
      //     console.log('삭제 요청');
      //   } else {
      //     if(detail.state === 'tmp'){
      //       // 일괄등록
      //       console.log('tmpSave : ', value);
      //       setForm([ ...form, value ]);
      //       handleTmpSave();
      //       setDetail(initDetail);
      //     } 
          // if(detail.state === 'save'){
          //   if(detail.id === 0){
          //     // 추가 요청 : 추가 api
          //     console.log('추가 요청');
          //   }
          //   if(detail.id > 0) {
          //     console.log('수정 요청');            
          //     modifyDepartment(value, pageId).then(res => {
          //       console.log(res);
          //       // 결과 확인 알림창에 결과 전달
          //       setLoading({ loading: true, response: (res.data.data === '1' || res.data.data === 1)});
          //       setDetail({...detail, state: false, save: false });
          //     });
          //   }    
          // }
        // }
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
    if (item > 0 ){
      getDepartmentById(item, pageId).then(res => { 
        updateSubItem(item, res.data.data);
      });      
    }
  }, [item]);

  useEffect(() => {
    if (search.on){
      try {
        findDeptNameAndCode(search.option, search.text, pageId).then(res => {
          setResult(res.data.data);
          setSearch({ ...search, on: false });
        });  
      } catch (error) {
        console.log(error);
      }
    }
  }, [search.on]);


  return(
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <TitleBtn favor={favor} handleFavor={handleFavor} detail={detail} setDetail={setDetail}/>
      </DeptTitle>
      <Info>
          <div>
            <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
          </div>
      </Info>
      <DetailArea>
        <SearchResultArea>
          <Suspense fallback={<Loading />}>
            <SearchForm option={option} search={search} setSearch={setSearch} />
            <div>
              <span>조직도</span>
              <select name="filter">
                <option value="all">전체</option>
                <option value='admin'>사용중 부서</option>
                <option value='admin'>미사용중 부서</option>
                <option value='general'>관리 부서</option>
                <option value='general'>사용자 부서</option>
                <option value='general'>조직도 표시</option>
                <option value='general'>조직도 미표시</option>
              </select>
            </div>
            <SearchResult result={result} setItem={setItem} detail={detail} setDetail={setDetail}/>
          </Suspense>
        </SearchResultArea>
        <Detail>
          <DetailTitle detail={detail} setDetail={setDetail} />
          {
            detail.type === 'basic' ? 
            <DetailBasic data={value} setData={setValue} detail={detail} setDetail={setDetail} pageId={pageId} />
            : null
          }
          {
            detail.type === 'emp' ? <DetailEmp empList={empList} /> : null
          }
        </Detail>
      </DetailArea>
    </ContentDept>
  );
};

const ContentDept = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: calc(100% - 90px);
`;
const DeptTitle = styled.div`
display: flex;
justify-content: space-between;

width: 100%;

border-top: 5px solid rgb(20,136,247);
border-bottom: 1px solid grey;
color: black;

> #deptTitle {
  margin: 10px;
  margin-left: 20px;
  font-size: large;
  font-weight: bold;
  color: rgb(32,35,44);
}
`;
const Info = styled.div`
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
const DetailArea = styled.div`
display: flex;
width: 100%;
height: calc(100% - 120px);
`;
const SearchResultArea = styled.div`
margin:10px;
height: calc(100% - 10px);
background-color: white;
width: 330px;
min-width: 330px;
border: 1px solid rgb(171,172,178);
color: black;

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