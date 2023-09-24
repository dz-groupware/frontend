import React, { useEffect, useState } from 'react'
import { MdDisplaySettings, MdOutlineMapsUgc, MdSmartDisplay } from 'react-icons/md';
import styled from 'styled-components';
import RoleMappingMain from '../components/RoleMapping/RoleMappingMain';
import Line from '../components/Commons/Line';
import LinkButon from '../components/Commons/LinkButon';
import ActionButton from '../components/Commons/ActionButton';
import { useFetchData } from '../hooks/useFetchData';
import { addEmployeeAuthApi } from '../api/authgroup';

export default function RoleMappingPage() {
  const [activeAuthId, setActiveAuthId] = useState(null);
  const [activeEmpId, setActiveEmpId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(null);
  const [selectedAuthIds, setSelectedAuthIds] = useState({});
  const {data, isLoading, error ,setShouldFetch, status, setStatus} = useFetchData(addEmployeeAuthApi, {
    data:{ 
      employeeId: activeEmpId, 
      selectedAuthIds}, 
    shouldFetch:false}); 
  const handleAuthClick = (authId) => {
    setActiveAuthId(authId);
  };

  const handleEmpClick = (empId) => {
    if(isEditMode){
      alert('수정중에는 이동할 수 없습니다.');
    }
    setActiveEmpId(empId);
  }
  const handleSaveClick = () => {
    if (activeEmpId && selectedAuthIds) {
      console.log(selectedAuthIds);
      setShouldFetch(true);   
    }
  }
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

  useEffect(()=>{
    console.log(activeAuthId);
  },[activeAuthId])
  return (
    <Container>
      <TopContainer>
        <TitleAndIconContainer>
          <h1>권한설정</h1>
          <IconWrapper>
            <MdDisplaySettings fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdSmartDisplay fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdOutlineMapsUgc fontSize={20} color='#939393'/>
          </IconWrapper>
        </TitleAndIconContainer>
        <div>
          {activeEmpId && (        
            <ActionButton 
              width={'5rem'}
              height={'2.5rem'}
              fontWeight={600} 
              fontSize={'1.0rem'} 
              name= {isEditMode ? "저장":"권한부여"}
              onClick={() => isEditMode ? handleSaveClick() : setIsEditMode(true)}
            />
          )}
          {activeEmpId && isEditMode &&(        
            <ActionButton 
              width={'5rem'}
              height={'2.5rem'}
              fontWeight={600} 
              fontSize={'1.0rem'} 
              name="닫기"
              onClick={() => setIsEditMode(false)}
            />)
          }
        </div>

      </TopContainer>

      <Line color="#f5f5f5" height="2px" bottom={"20px"}/>
      <div style={{  marginLeft: "1.2rem" }} >
        <LinkButon
          cursor="none"
          onClick={(e)=>e.preventDefault()}
          name="사용자 기준"
          selected={true}
          padding={"0.1rem 1.2rem 0.5rem"}
          showBorderBottom={true}
          showBorderLeft={true}
          showBorderRight={true}
        />
      </div>
      <Line left={"1.2rem"}/>
      <RoleMappingMain 
        activeAuthId={activeAuthId} 
        handleAuthClick={handleAuthClick}
        activeEmpId={activeEmpId}
        handleEmpClick={handleEmpClick}
        isEditMode={isEditMode}
        selectedAuthIds={selectedAuthIds}
        setSelectedAuthIds={setSelectedAuthIds}
        handleCheckboxChange={handleCheckboxChange}
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

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 0.5rem;
`;
const TitleAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  h1{
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  position: relative;
  bottom: 5px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
`;