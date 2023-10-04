import { Suspense, useEffect, useState } from "react";
import {  AiOutlineInfoCircle } from 'react-icons/ai';

import styled from 'styled-components';
import Swal from 'sweetalert2';

import { getDepartemnt, getOptionCompList, getBasicDetailById, getEmpListByDeptId, modifyDepartment, getDepartmentById, deleteDepartment} from '../api/department';
import { FavorApi } from '../api/menu';

import DetailBasic from '../components/DepartmentManager/DetailBasic';
import DetailEmp from '../components/DepartmentManager/DetailEmp';
import TitleBtn from '../components/DepartmentManager/TitleBtn';
import SearchForm from '../components/DepartmentManager/SearchForm';
import SearchResult from '../components/DepartmentManager/SearchResult';
import DetailTitle from '../components/DepartmentManager/DetailTitle';
import TmpSaveModal from '../components/DepartmentManager/TmpSaveModal';
import { Loading } from './VIEW';
import Retry from '../components/Error/Retry';


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
  const [form, setForm] = useState([]);

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);

  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState({loading: false, response: false});
  const [modalOn, setModalOn] = useState(false);

  const [error, setError] = useState({
    value: false,
    empList: false,
    option: false,
    result: false,
  });

  console.log(detail)
  // console.log(search)
  // console.log(value)
  console.log(form);
  // console.log("error:", error);
  // console.log("result : ", result);

  const handleModifyNoti = () => {
    console.log(detail);
    if(detail.id === 0){
      // 추가 시
      setValue(initValue);
      setDetail({ ...initDetail, type: 'basic'});
    } else if (detail.type === 'basic' && detail.id > 0) {
      // 기본 정보 열람 중 다른 부서 선택
      // form에 있다면 수정했던 정보를 보여 줌
      const foundValue = form.find(item => item.id === 1);
      if(foundValue) {
        setValue(foundValue);
      } else {
        // 수정 한 적 없는 정보라면 새로 요청해서 보여 줌
        getBasicDetailById(detail.id, pageId).then(res => {
          if(Object.keys(initValue).every((property) => res.data.data.hasOwnProperty(property))){
            setValue(res.data.data);
          } else {
            console.log("!error");
            setError({ ...error, value: true });
            setValue(initValue);
          }
        });
      }
    } else if (detail.type === 'emp' && detail.id > 0){
      console.log('reqeust emp list');
      getEmpListByDeptId(detail.id, pageId).then(res => {
        if(Array.isArray(res.data.data)) {
          setEmpList(res.data.data);
        } else {
          setError({ ...error, empList: true });
          setEmpList([]);
        }
      });
    }
  }

  const modalOff = () => {
    Swal.fire({
      title: '일괄등록에서 나가시겠습니까?',
      text: "모든 임시저장이 삭제됩니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "완료되었습니다.",
          icon: 'success',
        });
        setModalOn(false);
        setForm([]);
      }
    })
  }

  const handleTmpSave = () => {
    console.log('임시 저장');
    setModalOn(true);
    // 모달 창에 form 전달...? 
    // setNoti(false);
  }

  // 즐겨찾기 추가/삭제 요청
  const handleFavor = () => {
    FavorApi(pageId, !favor).then(() => {
      setFavor(!favor);
    });
  };

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

  const handleDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDepartment(detail.id, pageId);
        Swal.fire({
          title: '완료되었습니다.',
          icon: 'success',
        });
        getDepartemnt(pageId).then(res => setResult(res.data.data));
      } else {
        Swal.fire({
          title: '취소되었습니다.',
          icon: 'error',
        })    
      }
    })
  }

  // update subItem
  const updateSubItem = (itemId, newSubItem) => {
    // setResult((prevRes) => prevRes.map((item) => item.id === itemId ? { ...item, subItem: newSubItem } : item));
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
        setResult(menu.data.data);
        const fav = await FavorApi(pageId, 'load');
        setFavor(fav === 'undefined' || fav === "false" ? false : fav.data.data );
        const opt = await getOptionCompList(pageId);
        if (Array.isArray(opt.data.data)){
          setOption(opt.data.data);
        } else {
          setError({ ...error, option: true });
          setOption([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadDeptList();
  }, []);

  useEffect(() => {
    // console.log('저장 삭제 버튼 시작 : ', detail);
    if (detail.save) {
      try {
        if(detail.state === 'delete'){
          handleDelete();
          console.log('삭제 요청');
        } else {
          if(detail.state === 'tmp'){
            // 일괄등록
            console.log('tmpSave : ', value);
            setForm([ ...form, value ]);
            handleTmpSave();
            setDetail(initDetail);
          } 
          if(detail.state === 'save'){
            if(detail.id === 0){
              // 추가 요청 : 추가 api
              console.log('추가 요청');
            }
            if(detail.id > 0) {
              console.log('수정 요청');            
              modifyDepartment(value, pageId).then(res => {
                console.log(res);
                // 결과 확인 알림창에 결과 전달
                setLoading({ loading: true, response: (res.data.data === '1' || res.data.data === 1)});
                setDetail({...detail, state: false, save: false });
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

  // 부서 상세 정보 요청
  useEffect(()=>{ 
    handleModifyNoti();
  },[detail.id, detail.type]);

  useEffect(() => {
    if (search.on){
      // 검색 요청
      //검색 결과 result에 반영
    }

  }, [search.on]);

  useEffect(() => {
    if (loading.loading) {
      if (loading.response){
        Swal.fire({
          icon: 'success',
          title: '완료되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '다시 시도해 주세요.',
          showConfirmButton: false,
          timer: 1500
        });
      }
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    console.log("noti : ", noti );
    if (noti) {
      Swal.fire({
        title: "페이지 이동",
        text: "수정 중인 내용은 모두 삭제 됩니다.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '임시저장',
        denyButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log(result)
        if (result.isConfirmed) {
          console.log('임시저장');
          Swal.fire('임시저장 되었습니다', '', 'success');
          // setForm([ ...form, value ]);
          setDetail({ ...detail, isChanging: detail.state, state: 'tmpSave', save:false }); // state는 남기고 save는 false 특수하게 DetailBasic에서 isModified를 false 해줘야 하기 때문에
        } else if (result.isDenied) {
          console.log('수정 삭제 후 이동');
          setDetail({ ...detail, id: detail.state, state: false });
        } else if (result.isDismissed) {
          console.log('취소');
          setDetail({ ...detail, state: false });
        }
      })
      setNoti(false);
    }
  }, [noti])

  useEffect(() => {
    if (item > 0 ){
      getDepartmentById(item, pageId).then(res => { 
        updateSubItem(item, res.data.data);
      });      
    }
  }, [item]);

  useEffect(() => {
    // 임시저장일 시에 데이터 임시 저장
    if (detail.state === 'tmp'){
      setForm([ ...form, value ]);
      setDetail({ ...detail, id: detail.isChanging, state: false, isChanging: false });
    }
  }, [detail.state]);
  
  return(
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <TitleBtn favor={favor} handleFavor={handleFavor} detail={detail} setDetail={setDetail} handleTmpSave={handleTmpSave} />
      </DeptTitle>
      <Info>
          <div>
            <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
          </div>
      </Info>
      <DetailArea>
        <SearchResultArea>
          {
            !error.option && !error.result ? 
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
            : <Retry />
          }
        </SearchResultArea>
        <Detail>
          <DetailTitle detail={detail} setDetail={setDetail} />
          {
            detail.type === 'basic' ? 
            ( !error.value ? 
              <DetailBasic data={value} setData={setValue} detail={detail} setDetail={setDetail} setNoti={setNoti} pageId={pageId} />
              :  <Retry /> )
            : null
          }
          {
            detail.type === 'emp' ?
            ( !error.empList ? 
              <DetailEmp empList={empList} />
              : <Retry /> )
            : null
          }
        </Detail>
        { modalOn && <TmpSaveModal modalOff={modalOff} form={form} pageId={pageId} setNoti={setNoti} />}
      </DetailArea>
    </ContentDept>
  );
};

// function Notification ({ message, onTmpSave, setNoti }){
//   return (
//     <div>
//       <p>{ message }</p>
//       <button onClick={onTmpSave}>임시저장</button>
//       <button onClick={() => setNoti(false)}>확인</button>
//       <button onClick={() => setNoti(false)}>취소</button>
//     </div>
//   );
// }
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