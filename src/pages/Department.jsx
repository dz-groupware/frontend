import { useEffect, useState } from "react";

import {  AiOutlineInfoCircle } from 'react-icons/ai';

import styled from 'styled-components';
import Swal from 'sweetalert2';

import { getDepartemnt, getOptionCompList, getBasicDetailById, getEmpListByDeptId, findDeptNameAndCode, modifyDepartment} from '../api/department';
import { FavorApi } from '../api/menu';

import DetailBasic from '../components/Department/DetailBasic';
import DetailEmp from '../components/Department/DetailEmp';
import TitleBtn from '../components/Department/TitleBtn';
import SearchForm from '../components/Department/SearchForm';
import SearchResult from '../components/Department/SearchResult';
import DetailTitle from '../components/Department/DetailTitle';

export default function Department({ menuId }) {
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

  const [favor, setFavor] = useState(false);
  const [form, setForm] = useState([]);

  const [option, setOption] = useState([]);
  const [result, setResult] = useState([]);
  const [empList, setEmpList] = useState([]);

  const [noti, setNoti] = useState(false);
  const [loading, setLoading] = useState({loading: false, response: false});

  // console.log(detail)
  // console.log(search)
  // console.log(value)
  console.log(form);

  // console.log("!!", loading, response);
  const handleModifyNoti = () => {
    if(detail.id === 0){
      setValue(initValue);
      setDetail({...detail, type: 'basic'});
    } else if (detail.type === 'basic') {
      getBasicDetailById(detail.id, menuId).then(res => setValue(res.data.data));
    } else if (detail.type === 'emp'){
      getEmpListByDeptId(detail.id, menuId).then(res => setEmpList(res.data.data));
    }
  }

  const handleTmpSave = () => {
    console.log('임시 저장');
    setNoti(false);
  }

  // 즐겨찾기 추가/삭제 요청
  const handleFavor = () => {
    console.log(menuId, favor);
    FavorApi(menuId, !favor).then(() => {
      setFavor(!favor);
    });
  };

  useEffect(()=>{
    const loadDeptList = async () => {
      try {
        const menu = await getDepartemnt(menuId);
        setResult(menu.data.data);
        const fav = await FavorApi(menuId, 'load');
        console.log(fav, typeof fav);
        setFavor(fav === 'undefined' ? false : fav.data.data );
        const opt = await getOptionCompList(menuId);
        setOption(opt.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeptList();
  }, []);

  useEffect(() => {
    console.log('저장 삭제 버튼 시작 : ', detail);
    if (detail.save) {
      try {
        if(detail.state === 'delete'){
          // 삭제 요청
          console.log('삭제 요청');
        } else {
          if(detail.state === 'tmpSave'){
            // 일괄등록
            // console.log('tmpSave : ', value);
            // setForm([ ...form, value ]);
            // setDetail({ id: detail.state, type: detail.type, state: false, save: false, isChanging: '' })
          } 
          if(detail.state === 'save'){
            if(detail.id === 0){
              // 추가 요청 : 추가 api
              console.log('추가 요청');
            }
            if(detail.id > 0) {
              console.log('수정 요청');            
              modifyDepartment(value, menuId).then(res => {
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
    console.log('저장 삭제 버튼 마무리 : ', detail);
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
          setDetail({...detail, state: 'tmpSave', isChanging: detail.state });
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
          <SearchForm option={option} search={search} setSearch={setSearch} />
          <div>
            <span>조직도</span>
            <select name="filter">
              <option value="all">필터</option>
              <option value='admin'>관리자 부서</option>
              <option value='general'>사용자 사용자</option>
            </select>
          </div>
          <SearchResult result={result} detail={detail} setDetail={setDetail} menuId={menuId} />
        </SearchResultArea>
        <Detail>
          <DetailTitle detail={detail} setDetail={setDetail} />
            {detail.type === 'basic' ? 
            <DetailBasic data={value} setData={setValue} detail={detail} setDetail={setDetail} setNoti={setNoti} menuId={menuId}/> : null}
            {detail.type === 'emp' ? 
            <DetailEmp empList={empList} /> : null}
        </Detail>
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
