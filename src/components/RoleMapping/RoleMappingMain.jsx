import React, { useEffect, useRef, useState } from 'react'
import styled  from 'styled-components';
import MappingAuthGroupSection from './AuthGroup/MappingAuthGroupSection';
import MappingMenuOfAuth from './Menu/MappingMenuOfAuth';
import MappingMenuTreeTop from './Menu/MappingMenuTreeTop';
import Line from '../Commons/Line';
import { useFetchData } from '../../hooks/useFetchData';
import { getParentCompanyWithEmployeeCountApi, getSubsidiaryCompaniesWithEmployeeCountApi } from '../../api/company';
import CompanyTreeBox from './Employee/CompanyTreeBox';

export default function RoleMappingMain({ activeAuthId, handleAuthClick, activeEmpId,handleEmpClick}) {
  const { data: parCompanyInfo, isLoading: companyLoading, error: companyError} = useFetchData(getParentCompanyWithEmployeeCountApi);
  if (companyLoading) {
    return <div>Loading...</div>;
  }

  if (companyError) {
    return <div>Error: {companyError.message}</div>;
  }

  return (
    <Container>
      <StyledCompanySection>
        <CompanyTreeBox 
          item={parCompanyInfo} 
          companyId={parCompanyInfo ? parCompanyInfo.companyId : null}
          activeEmpId={activeEmpId}
          handleEmpClick={handleEmpClick}
        />
      </StyledCompanySection>
      <StyledAuthGroupContainer >
        <MappingAuthGroupSection
          activeAuthId={activeAuthId}
          handleAuthClick={handleAuthClick}
        />
      </StyledAuthGroupContainer>
      <Container2>
        <MappingMenuTreeTop 
        />
        <Line color="black"/>
        <MappingMenuOfAuth 
          authId={activeAuthId}
        />
      </Container2>
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
`;

const StyledAuthGroupContainer = styled.div`
  min-width: 400px;
  overflow-y: auto;
`;

const Container2 = styled.div`
  flex: 1;
  width: 400px;
  height: 100%;
  margin-top: 1.2rem;
  margin-right: 1.2rem;
`