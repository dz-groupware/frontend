// import { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// import { getDepartemnt, getOptionCompList, findDeptNameAndCode } from '../api/department';
// import { FavorApi } from '../api/menu';
// import {  AiOutlineInfoCircle, AiOutlineSearch, AiFillStar, AiOutlineStar } from 'react-icons/ai';

// import DeptDetail from '../components/Department/DeptDetail';
// import DeptItem from '../components/Department/DeptItem';
// import DetailSaveAll from '../components/Department/DetailSaveAll';
// import { useLocation } from 'react-router';


// export default function Department() {
//   const [id, setId] = useState({
//     deptId: 0,
//     newDeptId: 0,
//   });

//   const [status, setStatus] = useState({
//     status: '',
//     detailType: false,
//     re: false,
//   });

//   const [modalSaveAll, setModalSaveAll] = useState(false);
//   const [favor, setFavor] = useState(false);
//   const isModified = useRef(false);

//   const [form, setForm] = useState(JSON.parse('[]'));

//   const [result, setResult] = useState(JSON.parse('[{"code":"KQ1D9A8", "name":"시스템 개발팀"}, {"code":"8S22K9X", "name":"데이터 분석팀"}]'));
//   const [detailEmp, setDetailEmp] = useState(JSON.parse('[{"":""}]'));
//   const [compList, setCompList] = useState(JSON.parse('[]'));

//   // 나중에 수정될 부분
//   // const menuId = 6;
//   const location = useLocation();
//   const menuId = location.state?.menuId || "x";

//   console.log("===========================");
//   console.log("newDeptId : ", id.newDeptId, " || deptId : ", id.deptId);
//   console.log("status, ", status);
//   console.log("form : ", form);
//   // console.log("empList : ", detailEmp);

//   // re로 바뀌도록 했는데 안되고 있는 상태
//   useEffect(() => {
//     // 부서 리스트를 받아옴 -> result로 저장하고 사용
//     const loadDeptList = async () => {
//       try {
//         const res = await getDepartemnt(menuId);
//         setResult(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     console.log('before req (menuId) : ', menuId);
//     loadDeptList();
//     // 즐겨찾기 조회
//     FavorApi('load', menuId).then(res => {setFavor(res.data)});
//     // 검색 옵션 /회사리스트 조회
//     getOptionCompList(menuId).then(res => setCompList(res.data));
//   }, [menuId]);

//   // 일괄 등록 
//   // const hadleSaveAll = () => {
//   //   saveAll(form);
//   // }

  
//   const handleAddForm = () => {
//     // 추가 // 추가 상태 : 빈 form, 수정상태 "add" (-2)
//     setId({...id, newDeptId:-3});
//     setStatus({...status, detailType: 'basic'});
//   }

//     // 즐겨찾기 추가/삭제 요청
//   function FavorHandler(){
//     FavorApi('off', menuId).then(() => {
//       setFavor(!favor);
//     });
//   }

//   // 검색 결과 result에 저장
//   const hadleSearch = () => {
//     const fd = new FormData(document.getElementById('deptSearchForm'));
//     findDeptNameAndCode(fd.get('searchOption'), fd.get('searchText')).then(res => setResult(res.data));
//   }

//   return (
//     <ContentDept>
//       <DeptTitle>
//         <div id="deptTitle">부서관리</div>
//         <div id = "deptBtn">
//           <button onClick={() => {setModalSaveAll(true); setId({...id, newDeptId: -1});}}>일괄등록</button>
//           <button onClick={handleAddForm}>추가</button>
//           <button onClick={() => {}}>변경이력</button>
//           <div onClick={FavorHandler}>{favor ? <AiFillStar /> : <AiOutlineStar/>}</div>
//         </div>
//       </DeptTitle>
//       <Info>
//           <div>
//             <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
//           </div>
//       </Info>
//       <DetailArea>
//         <SearchArea>
//           <SearchForm id="deptSearchForm">
//           </SearchForm>
//           <SearchTree>
//             <div id='SearchSortOrder'>
//               <span>조직도</span>
//               <select name="filter" sytle={{zIndex: -2}}>
//                 <option value="all">필터</option>
//                 <option value='admin'>관리자 부서</option>
//                 <option value='general'>사용자 사용자</option>
//               </select>
//             </div>
//             <div id='SearchResult'>
//               {
//                 result.map((a, i) => (
//                   <DeptItem key={a['name']+a['id']} dept={a} id={id} setId={setId} status={status} setStatus={setStatus} setDetailEmp={setDetailEmp} menuId={menuId}/>
//                 ))
//               } 
//             </div>
//           </SearchTree>
//         </SearchArea>
//         <DeptDetail 
//         id={id} setId={setId} status={status} setStatus={setStatus}
//         form={form} setForm={setForm} isModified={isModified}
//         empList={detailEmp} setDetailEmp={setDetailEmp} menuId={menuId}/>
//       </DetailArea>
//       {modalSaveAll && 
//       <DetailSaveAll form={form} setModalSaveAll={setModalSaveAll}/>}
//     </ContentDept>
//   );
// }

// const ContentDept = styled.div`
// background-color: white;
// border: 1px solid rgb(171,172,178);
// width: 100%;
// height: calc(100% - 90px);
// `;
// const DetailArea = styled.div`
// display: flex;
// width: 100%;
// height: calc(100% - 120px);
// `;
// const SearchArea = styled.div`
// margin:10px;
// height: calc(100% - 10px);
// background-color: white;
// width: 330px;
// border: 1px solid rgb(171,172,178);
// color: black;
// `;
// const SearchForm = styled.form`
// width: 100%;
// padding: 5px;
// height: 100px;
// background-color: rgb(240,245,248);
// border-bottom: 1px solid rgb(171,172,178);
// color: black;
// > select {
//   width: calc(100% - 20px);
//   height:25px;
//   margin: 10px;
// }
// > input {
//   width: calc(100% - 50px);
//   height: 20px;
//   margin: 5px;
//   margin-left: 10px;
// }
// > svg {
//   width: 20px;
//   height: 20px;
//   position: relative;
//   top: 7px;
// }
// `;
// const SearchTree = styled.div`
// width: 300px;
// height: calc(100% - 100px);
// border: 1px solid gray;
// > #SearchSortOrder{
//   display: flex;
//   justify-content: space-between;
//   font-weight: bold;
//   margin: 5px;
//   height: 20px;
//   > span {
//     font-size: small;
//   }
//   > select {
//     font-weight: bold;
//     position: relative;
//     border: none;
//     text-align: right;
//     > option {
//       background-color: white;
//     }
//   }
// }
// > #SearchResult {
//   overflow: scroll;
//   height: calc(100% - 30px);
//   &::-webkit-scrollbar {
//     display: none;
//   }
// }
// `;
// const Info = styled.div`
// display: flex;
// justify-content: center;

// > div {
//   margin: 10px;
//   padding: 10px;
//   padding-left:15px;
//   width: 100%;
//   height: 40px;
//   background-color: rgb(214,236,248);
//   border: 1px solid rgb(146,183,214);
//   border-radius: 5px;

//   color: black;
//   font-weight: bold;
// }
// `;
// const DeptTitle = styled.div`
// display: flex;
// justify-content: space-between;

// width: 100%;

// border-top: 5px solid rgb(20,136,247);
// border-bottom: 1px solid grey;
// color: black;

// > #deptTitle {
//   margin: 10px;
//   margin-left: 20px;
//   font-size: large;
//   font-weight: bold;
//   color: rgb(32,35,44);
// }
// > #deptBtn {
//   display: flex;
//   margin-top: 5px;
//   > * {
//     height: 30px;
//     margin: 5px;
//   }
//   > svg {
//     margin-top: 10px;
//     width: 20px;
//     height: 20px;
//     color: gray;
//   }
// }
// `;