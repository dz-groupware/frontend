import React, { useEffect, useState } from 'react'
import { MdDisplaySettings, MdOutlineMapsUgc, MdSmartDisplay } from 'react-icons/md';
import styled from 'styled-components';
import RoleMappingMain from '../components/RoleMapping/RoleMappingMain';
import Line from '../components/Commons/Line';
import { useFetchData } from '../hooks/useFetchData';
import { addEmployeeAuthApi } from '../api/authgroup';
import { changeMasterYn } from '../api/employee';
import RoleTopContainer from '../components/RoleMapping/RoleTopContainer';
import LinkButton from '../components/Commons/LinkButton';

export default function RoleMappingPage({ pageId }) {
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [activeEmp, setActiveEmp] = useState({id: null, compId: null, masterYn: null});
  const [isSameCompany, setIsSameCompany] = useState(true);
  const [isEditMode, setIsEditMode] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedAuthIds, setSelectedAuthIds] = useState({});

  const {data, isLoading, setShouldFetch, status, setStatus} = useFetchData(addEmployeeAuthApi, {
    data:{ 
      employeeId: activeEmp.id, 
      selectedAuthIds,
    }, 
    headers: { pageId },
    shouldFetch: false,
  }); 
  const {data: updateMaster,isLoading: updateMasterYnLoading, error: updateMasterYnError, status: updateStatus,setStatus: setUpdateStatus, shouldFetch: updateFetch, setShouldFetch: setUpdateMasterYnFetch } = useFetchData(changeMasterYn, {
    data: { empId: activeEmp.id, compId: activeEmp.compId, masterYn: activeEmp.masterYn },  // activeEmp의 id를 empId로 전달
    headers: { pageId },
    shouldFetch: false  // 처음 로드할 때 API를 호출할 것인지 여부
  });

  const handleAuthClick = (authId) => {
    setActiveAuthId(authId);
  };

  const handleEmpClick = ({id, compId, masterYn},superParentCompId) => {
    if(isEditMode){
      alert('수정중에는 이동할 수 없습니다.');
      return;
    }
    console.log("compId", compId, "superParentCompId", superParentCompId)
    setIsSameCompany(superParentCompId === compId);
    setActiveEmp((prev) => ({...prev, id, compId, masterYn}));
  }

  const handleSaveClick = () => {
    if (activeEmp.id && selectedAuthIds) {
      setShouldFetch(true);   
    }
  }

  const handleEditModeClick = () => {
    if (activeEmp.masterYn) {
      alert('마스터 권한을 갖고 있는 계정은 권한을 더 부여할 수 없습니다.');
      return;
    }
    setIsEditMode(true);
  }

  const handleChangeMasterClick = () => {
    if (!activeEmp.masterYn) {
      const confirmChange = window.confirm("마스터로 지정하시겠습니까?");
      if (confirmChange) {
        setUpdateMasterYnFetch(!updateFetch);
      }
    } 
    else {
      const confirmChange = window.confirm("마스터를 해제하시겠습니까?");
      if (confirmChange) {
        setUpdateMasterYnFetch(!updateFetch);
      }
    }
  };


  useEffect(()=>{
    if(status === 200){
      alert('저장되었습니다.');
      setIsEditMode(false);
      setStatus(null);
      setActiveAuthId(null);
    }
  },[status]);

  const handleCheckboxChange = (authId) => {
    setSelectedAuthIds(prevSelectedAuthIds => {
      const newState = { ...prevSelectedAuthIds };
      if (newState[authId]) {
        newState[authId] = false;
      } else {
        newState[authId] = true;
      }
      return newState;
    });
  };

  useEffect(() => {
    if(updateMaster && updateStatus === 200) { // API 호출이 성공적으로 끝났을 때
      setRefresh(!refresh);  // refresh 상태를 업데이트
      setActiveEmp({id: updateMaster.id, compId: updateMaster.compId, masterYn: updateMaster.masterYn})
      setUpdateStatus(null);
    }

    setUpdateStatus(null);
  }, [updateStatus]);

  useEffect(()=>{
    if(updateMasterYnError && updateMasterYnError.data && updateMasterYnError.data.message){
      alert(updateMasterYnError.data.message);
    }
  },[updateMasterYnError]);
  
  useEffect(() => {
    setActiveAuthId(null);
  }, [activeEmp]);
  return (
    <Container>
      <RoleTopContainer
        activeEmp={activeEmp}
        isEditMode={isEditMode}
        handleSaveClick={handleSaveClick}
        handleEditModeClick={handleEditModeClick} 
        handleChangeMasterClick={handleChangeMasterClick}
        setIsEditMode={setIsEditMode}
        refresh={refresh}
        pageId={pageId}
      />
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButton
          cursor="none"
          onClick={(e)=>e.preventDefault()}
          name="사원 기준"
          selected={true}
          padding={"0.1rem 1.2rem 0.5rem"}
          showBorderBottom={true}
          showBorderLeft={true}
          showBorderRight={true}
        />
      </div>
      <Line left={"1.2rem"}/>
      <RoleMappingMain 
        isSameCompany={isSameCompany}
        refresh={refresh}
        activeAuthId={activeAuthId} 
        handleAuthClick={handleAuthClick}
        activeEmp={activeEmp}
        handleEmpClick={handleEmpClick}
        isEditMode={isEditMode}
        selectedAuthIds={selectedAuthIds}
        setSelectedAuthIds={setSelectedAuthIds}
        handleCheckboxChange={handleCheckboxChange}
        headers={{pageId}}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%; //높이 바꿔
`;


