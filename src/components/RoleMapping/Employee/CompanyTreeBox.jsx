import { useEffect, useState } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { getEmployeeNoDepartmentApi, getParDepartmentsWithEmployeeCountApi, getSubsidiaryCompaniesWithEmployeeCountApi, getSubsidiaryDepartmentsWithEmployeeCount } from "../../../api/company";
import styled from "styled-components";
import { useFetchData } from "../../../hooks/useFetchData";
import { DepartmentTreeBox } from "./DepartmentTreeBox";
import EmployeeBox from "./EmployeeBox";

export default function CompanyTreeBox({ item, depth=0, companyId,activeEmpId, handleEmpClick }) {
  const [expanded, setExpanded] = useState(false);
  const { data: companyItemList, setShouldFetch: setCompanyFetch, isLoading: companyLoading, error } = useFetchData(getSubsidiaryCompaniesWithEmployeeCountApi,{paths:{ companyId}, shouldFetch:false});
  const { data: parDepartmentInfoList, isLoading: departmentLoading, error: departmentError, setShouldFetch: setDepartmentFetch} = useFetchData(getParDepartmentsWithEmployeeCountApi, {paths:{companyId}, shouldFetch:false});
  const { data: companyEmpList, isLoading: empLoading, setShouldFetch: setEmpFetch} = useFetchData(getEmployeeNoDepartmentApi, {paths:{companyId}, shouldFetch:false});

  const toggleSubCompany = async () => {
    if (expanded) {
      setExpanded((prev) => !prev);
      return;
    }
    
    if (companyId && !item.childNodeYn && companyItemList.length === 0) {
      setCompanyFetch(true);
    }

    if (companyId && item.hasDepartment){
      setDepartmentFetch(true);
    }
    setExpanded(true);
  };
  useEffect(()=>{
    if(companyId){
      setEmpFetch(true);
    }
  },[expanded,companyId]);
  if(companyLoading || departmentLoading || empLoading) {
    return (
      <>
        <div>로딩중...</div>
      </>
    );
  }
  return (
    <>
      <NameBar $depth={depth} >
        {item.childNodeYn ? (
          <>
            <div style={{ width: '1em' }}></div>
            {depth===0?<img src="/img/comp/comp_48.png"width={22} alt="example" /> : <img src="/img/comp/branch_48.png"width={22} alt="example" />}
          </>
          ) : (
            <>
              <StyledButton onClick={toggleSubCompany}>
              <div style={{ width: '1em' }} >
                {expanded ? <VscChevronDown style={{ fontWeight: 'bold' }}/> : <VscChevronRight style={{ fontWeight: 'bold' }}/>}
              </div>
              {depth===0?<img src="/img/comp/comp_48.png"width={22} alt="example" /> : <img src="/img/comp/branch_48.png"width={22} alt="example" />}
              </StyledButton>
            </>
        )}
        <p>{item.companyName} ({item.employeeCount})</p>
      </NameBar>
      {expanded && companyItemList.length > 0 && (
        <>
          {companyItemList.map((subItem) => (
            <CompanyTreeBox 
              key={"c-"+subItem.companyId}
              depth={depth+1}
              item={subItem} 
              companyId={subItem?.companyId}
              activeEmpId={activeEmpId}
              handleEmpClick={handleEmpClick}
            />
          ))}
        </>
      )}
      {expanded && item.hasDepartment && (
        <>
          {parDepartmentInfoList.map((subItem) => (
            <DepartmentTreeBox 
              key={"d-"+subItem.departmentId}
              item={subItem}
              depth={depth+1}
              companyId={item.companyId}
              activeEmpId={activeEmpId}
              handleEmpClick={handleEmpClick}
            />
          ))}
        </>
      )}
      {expanded && (
        <>
          {companyEmpList.map((subItem) => (
              <EmployeeBox 
                key={"e-"+subItem.empId} 
                id={subItem.empId}
                name={subItem.empName} 
                position={subItem.empPosition}
                masterYn={subItem.empMasterYn}
                activeEmpId={activeEmpId}
                onClick={() => handleEmpClick(subItem.empId)}
                depth={depth+1}
              />
          ))}
        </>
      )}
    </>
  );
}


const NameBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${({ $depth }) => `${$depth * 15}px`}; // 여기를 수정했습니다
  align-items: center;
  margin-bottom: 4px;
`;

const StyledButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;