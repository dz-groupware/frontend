import React, { useEffect, useState } from 'react'
import { MdDisplaySettings, MdOutlineMapsUgc, MdSmartDisplay } from 'react-icons/md';
import styled from 'styled-components';
import RoleMappingMain from '../components/RoleMapping/RoleMappingMain';
import Line from '../components/Commons/Line';
import LinkButon from '../components/Commons/LinkButon';
import ActionButton from '../components/Commons/ActionButton';
import { useFetchData } from '../hooks/useFetchData';
import { addEmployeeAuthApi } from '../api/authgroup';
import { changeMasterYn } from '../api/employee';
import RoleTopContainer from '../components/RoleMapping/RoleTopContainer';

export default function RoleMappingPage({ pageId }) {
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [activeEmp, setActiveEmp] = useState({id: null, masterYn: null});
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
    data: { empId: activeEmp.id, masterYn: activeEmp.masterYn },  // activeEmp의 id를 empId로 전달
    headers: { pageId },
    shouldFetch: false  // 처음 로드할 때 API를 호출할 것인지 여부
  });

  const handleAuthClick = (authId) => {
    setActiveAuthId(authId);
  };

  const handleEmpClick = ({id, masterYn}) => {
    if(isEditMode){
      alert('수정중에는 이동할 수 없습니다.');
      return;
    }
    setActiveEmp((prev) => ({...prev, id, masterYn}));
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
        delete newState[authId];
      } else {
        newState[authId] = true;
      }
      return newState;
    });
  };

  useEffect(() => {
    if(updateMaster && updateStatus === 200) { // API 호출이 성공적으로 끝났을 때
      setRefresh(!refresh);  // refresh 상태를 업데이트
      setActiveEmp({id: updateMaster.id, masterYn: updateMaster.masterYn})
      setUpdateStatus(null);
    }

    setUpdateStatus(null);
  }, [updateStatus]);

  useEffect(()=>{
    if(updateMasterYnError && updateMasterYnError.data && updateMasterYnError.data.message){
      alert(updateMasterYnError.data.message);
    }
  },[updateMasterYnError]);
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
      />
      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButon
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


