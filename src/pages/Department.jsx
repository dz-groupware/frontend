import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getDepartemnt, saveAll, getOptionCompList, findDeptNameAndCode } from '../api/department';
import { FavorApi } from '../api/menu';
import {  AiOutlineInfoCircle, AiOutlineSearch, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import DeptDetail from '../components/Department/DeptDetail';
import DeptItem from '../components/Department/DeptItem';


export default function Department() {
  const [deptId, setDeptId] = useState('');
  const [newDeptId, setNewDeptId] = useState('');
  const [detailType, setDetailType] = useState(false);
  const [detail, setDetail] = useState('');
  const [result, setResult] = useState(JSON.parse('[{"code":"KQ1D9A8", "name":"시스템 개발팀"}, {"code":"8S22K9X", "name":"데이터 분석팀"}]'));
  const [detailEmp, setDetailEmp] = useState(JSON.parse('[{"":""}]'));
  const [modalSaveAll, setModalSaveAll] = useState(false);

  
  const [form, setForm] = useState(JSON.parse('[]'));

  const isModified = useRef(false);

  const [re, setRe] = useState(false);
  const [favor, setFavor] = useState(false);
  const [compList, setCompList] = useState(JSON.parse('[]'));

  const [ status, setStatus ] = useState('');
  // 나중에 수정될 부분
  const menuId = 6;
  console.log("newDeptId, deptId : ", newDeptId, deptId);
  console.log("form : ", form);

  // 부서 리스트를 받아옴
  // re로 바뀌도록 했는데 안되고 있는 상태
  useEffect(() => {
    const loadDeptList = async () => {
      try {
        const res = await getDepartemnt();
        setResult(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadDeptList();
    FavorApi('load', menuId).then(res => {setFavor(res.data)});
    getOptionCompList().then(res => setCompList(res.data));
  }, [re]);

  // 일괄 등록 
  const hadleSaveAll = () => {
    
    saveAll(form);
  }

  // 추가
  const handleAddForm = () => {
    setNewDeptId(0);
    setDetailType('basic');
  }

    // 즐겨찾기 추가/삭제 요청
    function FavorHandler(){
      if (favor) {
        // 즐겨찾기가 되어 있으면 삭제 요청
        FavorApi('off', menuId).then(() => {
        setFavor(!favor);
      });
    } else {
      // 즐겨찾기가 안되어 있으면 즐겨찾기 추가 요청
      FavorApi('on', menuId).then(() => {
        setFavor(!favor);
      });
    }
  }

  const hadleSearch = () => {
    const fd = new FormData(document.getElementById('deptSearchForm'));
    findDeptNameAndCode(fd.get('searchOption'), fd.get('searchText')).then(res => setResult(res.data));
  }

  return (
    <ContentDept>
      <DeptTitle>
        <div id="deptTitle">부서관리</div>
        <div id = "deptBtn">
          <button onClick={() => {setModalSaveAll(true); setNewDeptId(-1);}}>일괄등록</button>
          <button onClick={handleAddForm}>추가</button>
          <button onClick={() => {}}>변경이력</button>
          <div onClick={FavorHandler}>{favor ? <AiFillStar /> : <AiOutlineStar/>}</div>
        </div>
      </DeptTitle>
      <Info>
          <div>
            <AiOutlineInfoCircle />&nbsp; 회사별 조직도(부서)를 등록할 수 있으며, '부서/팀/입사' 유형을 선택하여 등록할 수 있습니다.
          </div>
      </Info>
      <DetailArea>
        <SearchArea>
          <SearchForm id="deptSearchForm">
            <select name='searchOption'>
              {
                compList.map((a, i) => (
                  <option key={a['name']+a['compId']} value={a['compId']}>{a['name']}</option>
                ))
              }
            </select>
            <input name='searchText' placeholder='코드/사업장/부서명을 입력하세요'/>
            <AiOutlineSearch onClick={hadleSearch}/>
          </SearchForm>
          <SearchTree>
            <div id='SearchSortOrder'>
              <span>조직도</span>
              <select name="filter" sytle={{zIndex: -2}}>
                <option value="all">필터</option>
                <option value='admin'>관리자 부서</option>
                <option value='general'>사용자 사용자</option>
              </select>
            </div>
            <div id='SearchResult'>
              {
                result.map((a, i) => (
                  <DeptItem key={a['name']+a['id']} setNewDeptId={setNewDeptId} setDetailType={setDetailType} value={a} detailType={detailType} setDeptId={setDeptId} setDetail={setDetail} setStatus={setStatus}/>
                ))
              } 
            </div>
          </SearchTree>
        </SearchArea>
        <DeptDetail detailType={detailType} setDeptId={setDeptId} setDetailEmp={setDetailEmp}
        deptId={deptId} detail={detail} isModified={isModified} newDeptId={newDeptId}
        empList={detailEmp} setDetailType={setDetailType} form={form} setForm={setForm} 
        setRe={setRe} status={status} setStatus={setStatus}/>
      </DetailArea>
      {modalSaveAll && <DetailSaveAll form={form} setModalSaveAll={setModalSaveAll}/>}
    </ContentDept>
  );
}

function DetailSaveAll(props) {
  return (
    <ModalBackdrop onClick={() => props.setModalSaveAll(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div id='saveAllTitle'>
        <div>일괄저장</div>
        <button>확인</button>
          <span onClick={() => props.setModalSaveAll(false)}>x</span>
        </div>
        <FormArea>
          <div>
          {
            props.form.map((a, i) => (
              <FormList value={a} setModalSaveAll={props.setModalSaveAll} key={a['name']+'gnb'}/>
            ))
          }
          </div>
        </FormArea>
      </ModalView>
    </ModalBackdrop>
  );
}

function FormList(props) {
  return (
    <BasicForm>
      <div style={{display: 'flex'}}><div>*모든 필드를 채워주세요</div> ...<div>삭제</div></div>
        <form id='basic'>
        <table>
          <tr>
            <td>상위부서</td>
            <td colSpan="3">
              <textarea value={props.value['parName']} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>부서코드</td>
            <td colSpan="3">
              <input name="code" value={props.value['code']} />
            </td>
          </tr>
          <tr>
            <td>부서명</td>
            <td colSpan="3">
              <input name="name" value={props.value['name']} />
            </td>
          </tr>
          <tr>
            <td>부서약칭</td>
            <td colSpan="3">
              <input name="abbr" value={props.value['abbr']} />
            </td>
          </tr>
          <tr>
            <td className="field">
              사용여부
            </td>
            <td className="data">
              <input name='enabledYn' value="true" type='radio' checked={props.value['enabledYn'] === 'true' || props.value['enabledYn'] === true }  readOnly/>사용
              <input name='enabledYn' value="false" type='radio' checked={props.value['enabledYn'] === 'false' || props.value['enabledYn'] === false} readOnly/>미사용
            </td>
            <td className="field">
              관리부서
            </td>
            <td className="data">
              <input name='managementYn' value="true" type='radio' checked={props.value['managementYn'] === 'true' || props.value['managementYn'] === true}  readOnly/>설정
              <input name='managementYn' value="false" type='radio' checked={props.value['managementYn'] === 'false' || props.value['managementYn'] === false} readOnly />미설정
            </td>
          </tr>
          <tr>
          <td className="field">
              조직도 표시
            </td>
            <td className="data">
              <input name='includedYn' value="true" type='radio' checked={props.value['includedYn'] === 'true' || props.value['includedYn'] === true} readOnly />표시
              <input name='includedYn' value="false" type='radio' checked={props.value['includedYn'] === 'false' || props.value['includedYn'] === false} readOnly />미표시
            </td>
            <td className="field">
              정렬
            </td>
            <td className="data">
              <input name='sortOrder' type="number" value={props.value['sortOrder']} />
            </td>
          </tr>
        </table>
        </form>
      </BasicForm>
  )
}

const ContentDept = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width: 100%;
height: calc(100% - 90px);
`;
const DetailArea = styled.div`
display: flex;
width: 100%;
height: calc(100% - 120px);
`;
const SearchArea = styled.div`
margin:10px;
height: calc(100% - 10px);
background-color: white;
width: 330px;
border: 1px solid rgb(171,172,178);
color: black;
`;
const SearchForm = styled.form`
width: 100%;
padding: 5px;
height: 100px;
background-color: rgb(240,245,248);
border-bottom: 1px solid rgb(171,172,178);
color: black;
> select {
  width: calc(100% - 20px);
  height:25px;
  margin: 10px;
}
> input {
  width: calc(100% - 50px);
  height: 20px;
  margin: 5px;
  margin-left: 10px;
}
> svg {
  width: 20px;
  height: 20px;
  position: relative;
  top: 7px;
}
`;
const SearchTree = styled.div`
width: 300px;
height: calc(100% - 100px);
border: 1px solid gray;
> #SearchSortOrder{
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
> #SearchResult {
  overflow: scroll;
  height: calc(100% - 30px);
  &::-webkit-scrollbar {
    display: none;
  }
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
> #deptBtn {
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
export const ModalBackdrop = styled.div`
z-index: 1; 
position: fixed;
display : flex;
justify-content : center;
align-items : center;
border-radius: 10px;
top : 0;
left : 0;
right : 0;
bottom : 0;
width:100%;
height:100%;
`;
export const ModalView = styled.div`
position: absolute;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 1000px;
height: 550px;
color: black;
background-color: rgb(146,183,214);
z-index:2;
> #saveAllTitle {
  display: flex;
  justify-content: space-around;
  height: 30px;
  font-size: large;
  font-weight: bold;
  margin: 20px;
}
`;
export const FormArea = styled.div`
width: 100%;
height: 100%;
padding: 10px;

> div {
  background-color: white;
  width: 100%;
  height: 450px;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
`;
const BasicForm = styled.div`
width: 100%;
height: 100%;
> form {
> table {
  min-width: 500px;
  border-collapse: collapse;
  > tr {
    > td:nth-child(1) {
      background-color: rgb(240,245,248);
      width: 20%;
      min-width: 150px;
      font-size: medium;
      font-weight: bold;
      padding: 10px;
      text-align: right;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    > td:nth-child(2) {
      background-color:  white;
      color: gray;
      width: 80%;
      min-width: 350px;
      font-size: small;
      padding: 10px;
      text-align: left;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
    }
    > td {
      > .readOnly {
        display: none;
      }
    }
    }
  > tr {
    > .field{
      background-color: rgb(240,245,248);
      width: 20%;
      min-width: 150px;
      font-size: medium;
      font-weight: bold;
      padding: 10px;
      text-align: right;
      border-bottom: 1px solid gray;
    }
    > .data {
      background-color:  white;
      color: gray;
      width: 80%;
      min-width: 400px;
      font-size: small;
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid gray;
    }
  }
  }  
}

> .detailEmpBody {
  overflow: scroll;
height: calc(100% - 50px);
&::-webkit-scrollbar{
  display: none;
}
> table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  text-align: center;

  > tr > td {
    width: 25%;
    min-width: 100px;
    padding: 10px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }
}
}
> div > table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  text-align: center;
  > .detailEmpTitle { 
    background-color: rgb(240,245,248);
    width: 100%;
    min-width: 400px;
    font-size: large;
    font-weight: bold;
    padding: 10px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    height: 30px;
    > td {
      padding: 10px;
      width: 25%;
      min-width: 100px;
    }
  }
}
`;