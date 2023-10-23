  import React, { useEffect, useRef, useState } from 'react'
  import styled  from 'styled-components';
  import MappingAuthGroupSection from './AuthGroup/MappingAuthGroupSection';
  import MappingMenuOfAuth from './Menu/MappingMenuOfAuth';
  import MappingMenuTreeTop from './Menu/MappingMenuTreeTop';
  import Line from '../Commons/Line';
  import { useFetchData } from '../../hooks/useFetchData';
  import { getParentCompanyWithEmployeeCountApi } from '../../api/company';
  import CompanyTreeBox from './Employee/CompanyTreeBox';

  export default function RoleMappingMain({ isSameCompany, refresh, activeAuthId, handleAuthClick, activeEmp, handleEmpClick, isEditMode, selectedAuthIds, setSelectedAuthIds, handleCheckboxChange, headers}) {
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
            superParentCompId={parCompanyInfo.companyId}
            refresh={refresh}
            item={parCompanyInfo} 
            companyId={parCompanyInfo ? parCompanyInfo.companyId : null}
            activeEmp={activeEmp}
            handleEmpClick={handleEmpClick}
            headers={headers}
            isEditMode={isEditMode}
          />
        </StyledCompanySection>
        {isSameCompany ?  (<>
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
        {activeAuthId &&
          <StyledMenuContainer>
              {/* && <MappingMenuTreeTop />  */}
              {/*&& <Line color="black"/> */}
            <MappingMenuOfAuth 
              refresh={refresh}
              authId={activeAuthId}
              headers={headers}
            />
          </StyledMenuContainer>
        }</>) : (<StyledNoPermission>
          <img src= {`${process.env.PUBLIC_URL}/img/forbidden.png`} width={120} alt="금지 이미지" style={{marginBottom:'80px'}}/>
          <h1 o>해당 유저에 대한 권한은 참조할 수 없습니다.</h1>
        </StyledNoPermission>)}

      </Container>
    );
  };


  const Container = styled.div`
    display: flex;
    height: calc(100% - 110px);
    gap: 30px;
  `;

  const StyledCompanySection = styled.div`
    margin-top: 1.2rem;
    margin-left: 1.2rem;
    min-width: 300px;
    width: 350px;
    height: 94%;
    border-top: 2px solid #747474;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    background-color: #FAFAFA;
    overflow-y: auto;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  `;

  const StyledMenuContainer = styled.div`
    flex: 1;
    width: 400px;
    height: 100%;
    border-top: 2px solid #747474;
    margin-top: 1.2rem;
    margin-right: 1.2rem;
  `

  const StyledNoPermission = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height: 97%;
    border-top: 2px solid #747474;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    background-color: #FAFAFA;
    box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`;