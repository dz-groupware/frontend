import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import styled from "styled-components";
import { useFetchData } from "../../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { getEmployeeByDepartmentIdApi, getSubsidiaryDepartmentsWithEmployeeCount } from "../../../api/company";
import EmployeeBox from "./EmployeeBox";

export function DepartmentTreeBox({ refresh, item, depth=0, companyId, activeEmp, handleEmpClick, headers, isEditMode }) {
  const [expanded, setExpanded] = useState(false);
  const { data: departmentList, isLoading: departmentLoading, error: departmentError, setShouldFetch: setDeptFetch } = useFetchData(getSubsidiaryDepartmentsWithEmployeeCount,
    { 
      paths:{departmentId: item.departmentId, companyId}, 
      shouldFetch:false, 
      headers 
    });
  const { data: empList, isLoading: empLoading, error: empError, setShouldFetch: setEmpFetch } = useFetchData(getEmployeeByDepartmentIdApi,
    { 
      paths:{departmentId: item.departmentId}, 
      shouldFetch:false ,
      headers 
    });

  const toggleSubDepartment = async () => {
    if (expanded) {
      setExpanded((prev) => !prev);
      return;
    }
    
    if (!item.childNodeYn && departmentList.length === 0) {
      setDeptFetch(true);
    }
    if (item.childNodeYn && empList.length === 0) {
    }
    setExpanded(true);
  };

  useEffect(()=> {
    if(item.childNodeYn){
      setEmpFetch(true);
    }
  },[departmentList]);

  useEffect(()=> {
    // console.log('departmentTreeBox');
    if(item.childNodeYn){
      // console.log('departmentTreeBox-1');
      setEmpFetch(true);
    }
    if (!item.childNodeYn && departmentList.length === 0) {
      // console.log('departmentTreeBox-2');
      setDeptFetch(true);
    }
  },[refresh]);


  return (
    <>
      <NameBar $depth={depth}>
        <>
          <StyledButton onClick={toggleSubDepartment}>
            <div style={{ width: '1em' }} >
              {expanded ? <VscChevronDown style={{ fontWeight: 'bold' }}/> : <VscChevronRight style={{ fontWeight: 'bold' }}/>}
            </div>
            {expanded ? <img src="/img/comp/dept_open_32.png"width={20} alt="example" /> : <img src="/img/comp/dept_50.png"width={18} alt="example" />}
          </StyledButton>
        </>
        <p>{item.departmentName} ({item.employeeCount})</p>
      </NameBar>
      {expanded && departmentList.length > 0 && (
        <>
          {departmentList.map((subItem) => (
              <DepartmentTreeBox 
                key={"d-"+subItem.departmentId}
                item={subItem} 
                depth={depth+1}
                companyId={companyId}
                activeEmp={activeEmp}
                handleEmpClick={handleEmpClick}
                headers={headers}
                isEditMode={isEditMode}
              />
          ))}
        </>
      )}
      {expanded && empList.length > 0 && (
        <>
          {empList.map((subItem, subIndex) => (
            <EmployeeBox 
              key={"e-"+subItem.empId} 
              refresh={refresh}
              id={subItem.empId}
              name={subItem.empName} 
              position={subItem.empPosition}
              masterYn={subItem.empMasterYn}
              depth={depth+1}
              activeEmp={activeEmp}
              onClick={() => handleEmpClick({id: subItem.empId, masterYn: subItem.empMasterYn})}
              isEditMode={isEditMode}
            />
          ))}
        </>
      )}
    </>
  );
}

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: ${({ $depth }) => `${$depth * 15}px`};
  align-items: center;
  margin-bottom: 4px;
`;