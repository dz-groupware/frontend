import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useFetchData } from '../../../hooks/useFetchData';
import { deleteAuthApi, getGnbListOfAuthWithAllApi, getLnbListOfAuthWithAllApi, modifyMappedMenuOfAuthApi } from '../../../api/authgroup';
import MenuItemEditor from './MenuItemEditor';

export default function MenuOfAuthEditor({ authId , isSaveClicked, setIsSaveClicked, setIsEditMode, isDeleteClicked, setIsDeleteClicked, changeRefresh}) {
  const [checkedItems, setCheckedItems] = useState([]);
  const { data, isLoading, setShouldFetch, error } = useFetchData(getGnbListOfAuthWithAllApi,{
    paths: {
      authId,
    },
  });

  const {setShouldFetch: setModifyShouldFetch, status: saveStatus } = useFetchData(
    modifyMappedMenuOfAuthApi,
    { 
      paths: {authId}, 
      data: checkedItems, 
      shouldFetch:false
    },
  );
  const {setShouldFetch: setDelteShouldFetch, status: deleteStatus } = useFetchData(
    deleteAuthApi,
    { 
      paths: {authId}, 
      shouldFetch:false
    },
  );
  useEffect(() =>{
    console.log(authId);
    console.log(checkedItems);
  }, [checkedItems]);

  //authId를 감지해서 api 호출
  useEffect(() => { 
    if(authId !== null && authId !== undefined) { // authId가 유효한지 검사
      setShouldFetch(true);
    }
  }, [authId]);
  //api를 통해 데이터가 오면 메뉴 체크아이템에 데이터넣기
  useEffect(() => {
    if (data) {
      const newCheckedItems = data.reduce((acc, item) => {
        acc[item.menuId] = item.hasMenu;
        return acc;
      }, {});
      setCheckedItems(newCheckedItems);
    }
  }, [data]);

  useEffect(() => {
    if(isSaveClicked){
      setModifyShouldFetch(true);
      setIsSaveClicked(false);
    }
  },[isSaveClicked]);

  useEffect(() => {
    if (isDeleteClicked) {
      const confirmDelete = window.confirm("진짜로 삭제하시겠습니까?");
      if (confirmDelete) {
        setDelteShouldFetch(true);
      }
      setIsDeleteClicked(false);
    }
  }, [isDeleteClicked]);

  useEffect(() => {
    if(saveStatus === 202){
      alert('저장되었습니다.');
      setIsEditMode(false);
    }
  }, [saveStatus]);

  useEffect(() => {
    if(deleteStatus === 202){
      alert('삭제되었습니다.');
      setIsEditMode(false);
      changeRefresh();
    }
  }, [deleteStatus]);

  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>{console.log(error)}</div>;
  if (!data) return null;

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>메뉴명</Th>
            <Th>사용여부</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <MenuItemEditor 
              key={item.menuId} 
              item={item}
              hasMenu={item.hasMenu}
              isEditMode={true}
              authId={authId}
              fetchApi={getLnbListOfAuthWithAllApi}
              paths={{authId, parId: item.menuId }}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              curChecked={item.hasMenu}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  )
}


const Container = styled.div`
  margin-bottom: 1.2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  overflow-y: hidden;
  thead tr {
    th:nth-child(1) {
      border-right: 1px dashed #ccc;
      border-left: 1px solid #ccc;
    }

    th:nth-child(2) {
      border-left: none;
      border-right: 1px solid #ccc;
      text-align: center;
    }
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  background-color: beige;
  border-bottom: 2px solid #ccc;
`;
