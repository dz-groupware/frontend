  import React, { useEffect, useRef, useState } from 'react'
  import styled  from 'styled-components';
  import MappingAuthGroupSection from './AuthGroup/MappingAuthGroupSection';
  import MappingMenuOfAuth from './Menu/MappingMenuOfAuth';
  import MappingMenuTreeTop from './Menu/MappingMenuTreeTop';
  import Line from '../Commons/Line';
  import { useFetchData } from '../../hooks/useFetchData';
  import { getParentCompanyWithEmployeeCountApi } from '../../api/company';
  import CompanyTreeBox from './Employee/CompanyTreeBox';

  export default function RoleMappingMain({ refresh, activeAuthId, handleAuthClick, activeEmp, handleEmpClick, isEditMode, selectedAuthIds, setSelectedAuthIds, handleCheckboxChange, headers}) {
    const { data: parCompanyInfo, isLoading: companyLoading, error: companyError, setShouldFetch} = useFetchData(getParentCompanyWithEmployeeCountApi,
      {
        headers,
        shouldFetch:false
      });
    useEffect(()=>{
      setShouldFetch(true);
    },[refresh]);

    return (
      <Container>
        <StyledCompanySection>
          {companyError && ( <div>서버에 에러가 생겨서 불러올 수가 없습니다.</div>)}
          <CompanyTreeBox 
            refresh={refresh}
            item={parCompanyInfo} 
            companyId={parCompanyInfo ? parCompanyInfo.companyId : null}
            activeEmp={activeEmp}
            handleEmpClick={handleEmpClick}
            headers={headers}
            isEditMode={isEditMode}
          />
        </StyledCompanySection>
        <StyledAuthGroupContainer>
          <MappingAuthGroupSection
            activeAuthId={activeAuthId}
            handleAuthClick={handleAuthClick}
            activeEmp={activeEmp}
            isEditMode={isEditMode}
            selectedAuthIds={selectedAuthIds}
            setSelectedAuthIds={setSelectedAuthIds}
            handleCheckboxChange={handleCheckboxChange}
            headers={headers}
          />
        </StyledAuthGroupContainer>
        {activeAuthId &&
          <Container2>
              {/* && <MappingMenuTreeTop />  */}
              {/*&& <Line color="black"/> */}
            <MappingMenuOfAuth 
              authId={activeAuthId}
              headers={headers}
            />
          </Container2>
         }
      </Container>
    );
  };


  const Container = styled.div`
    display: flex;
    height: 80%;
    gap: 30px;
  `;

  const StyledCompanySection = styled.div`
    margin-top: 1.2rem;
    margin-left: 1.2rem;
    min-width: 300px;
    height: 95%;
    width: 350px;
    border-top: 2px solid #747474;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    background-color: #FAFAFA;
  `;

  const StyledAuthGroupContainer = styled.div`
    min-width: 400px;
    overflow-y: auto;
  `;

  const Container2 = styled.div`
    flex: 1;
    width: 400px;
    height: 100%;
    border-top: 2px solid #747474;
    margin-top: 1.2rem;
    margin-right: 1.2rem;
  `