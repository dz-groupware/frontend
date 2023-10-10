import { useEffect, useState } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { getEmployeeNoDepartmentApi, getParDepartmentsWithEmployeeCountApi, getSubsidiaryCompaniesWithEmployeeCountApi, getSubsidiaryDepartmentsWithEmployeeCount } from "../../../api/company";
import styled from "styled-components";
import { useFetchData } from "../../../hooks/useFetchData";
import { DepartmentTreeBox } from "./DepartmentTreeBox";
import EmployeeBox from "./EmployeeBox";

export default function CompanyTreeBox({superParentCompId, refresh, item, depth = 0, companyId, activeEmp, handleEmpClick, headers, isEditMode, is }) {
  const [expanded, setExpanded] = useState(false);
  const { data: companyItemList, setShouldFetch: setCompanyFetch, isLoading: companyLoading, error } = useFetchData(getSubsidiaryCompaniesWithEmployeeCountApi, { paths: { companyId }, shouldFetch: false, headers });
  const { data: parDepartmentInfoList, isLoading: departmentLoading, error: departmentError, setShouldFetch: setDepartmentFetch } = useFetchData(getParDepartmentsWithEmployeeCountApi, { paths: { companyId }, shouldFetch: false, headers });
  const { data: companyEmpList, isLoading: empLoading, setShouldFetch: setEmpFetch } = useFetchData(getEmployeeNoDepartmentApi, { paths: { companyId }, shouldFetch: false, headers });

  const toggleSubCompany = async () => {
    if (expanded) {
      setExpanded((prev) => !prev);
      return;
    }

    if (companyId && !item.childNodeYn && companyItemList.length === 0) {
      setCompanyFetch(true);
    }

    if (companyId && item.hasDepartment) {
      setDepartmentFetch(true);
    }
    setExpanded(true);
  };
  useEffect(() => {
    if (companyId) {
      setEmpFetch(true);
    }
  }, [expanded, companyId]);

  useEffect(() => {
    // console.log('companyTreeBox');
    if (companyId) {
      // console.log('companyTreeBox-1');
      setEmpFetch(true);
    }
    if (companyId && !item.childNodeYn && companyItemList.length === 0) {
      // console.log('companyTreeBox-2');
      setCompanyFetch(true);
    }

    if (companyId && item.hasDepartment) {
      // console.log('companyTreeBox-3');
      setDepartmentFetch(true);
    }
  }, [refresh]);

  return (
    <Container>
      <NameBar $depth={depth} onClick={toggleSubCompany}>
        {item.childNodeYn ? (
          <>
              <div style={{ width: '1em' }} >
                {item.employeeCount > 0 ? (expanded ? <VscChevronDown style={{ fontWeight: 'bold' }} /> : <VscChevronRight style={{ fontWeight: 'bold' }} />)
                  : null
                }
              </div>
            {depth === 0 ? <img src="/img/comp/comp_48.png" width={22} alt="example" /> : <img src="/img/comp/branch_48.png" width={22} alt="example" />}
          </>
        ) : (
          <>
            <StyledButton>
              <div style={{ width: '1em' }} >
                {expanded ? <VscChevronDown style={{ fontWeight: 'bold' }} /> : <VscChevronRight style={{ fontWeight: 'bold' }} />}
              </div>
              {depth === 0 ? <img src="/img/comp/comp_48.png" width={22} alt="example" /> : <img src="/img/comp/branch_48.png" width={22} alt="example" />}
            </StyledButton>
          </>
        )}
        <p>{item.companyName} ({item.employeeCount})</p>
      </NameBar>
      {/* {expanded && companyItemList.length > 0 && (
        <>
          {companyItemList.map((subItem) => (
            <CompanyTreeBox
              superParentCompId={superParentCompId}
              refresh={refresh}
              key={"c-" + subItem.companyId}
              depth={depth + 1}
              item={subItem}
              companyId={subItem?.companyId}
              activeEmp={activeEmp}
              handleEmpClick={handleEmpClick}
              headers={headers}
              isEditMode={isEditMode}
            />
          ))}
        </>
      )} */}
      {expanded && item.hasDepartment && (
        <>
          {parDepartmentInfoList.map((subItem) => (
            <DepartmentTreeBox
              superParentCompId={superParentCompId}
              refresh={refresh}
              key={"d-" + subItem.departmentId}
              item={subItem}
              depth={depth + 1}
              companyId={item.companyId}
              activeEmp={activeEmp}
              handleEmpClick={handleEmpClick}
              headers={headers}
              isEditMode={isEditMode}
            />
          ))}
        </>
      )}
      {expanded && (
        <>
          {companyEmpList.map((subItem) => (
            <EmployeeBox
              key={"e-" + subItem.empId}
              id={subItem.empId}
              refresh={refresh}
              name={subItem.empName}
              position={subItem.empPosition}
              masterYn={subItem.empMasterYn}
              activeEmp={activeEmp}
              onClick={() => handleEmpClick({ id: subItem.empId, compId: companyId, masterYn: subItem.empMasterYn }, superParentCompId)}
              depth={depth + 1}
              isEditMode={isEditMode}
            />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  `;

const NameBar = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: ${({ $depth }) => `${$depth * 15}px`}; // 여기를 수정했습니다
    align-items: center;
    margin-bottom: 4px;

  ${props => !props.$isEditMode && `
    &:hover {
      border-width: 2px;
      background-color: #d0cece84;  
      border-color: #d0cece84;          
    }
  `}

  ${props => !props.$isEditMode && `
    &:active {
      border-width: 2px;
      background-color: #5dc3fb;  
      border-color: #5dc3fb;  
    }
  `}

  p {
    white-space: nowrap;          // 줄 바꿈 없이 한 줄에 표시
    overflow: hidden;             // 내용이 넘칠 경우 숨김
    text-overflow: ellipsis;     // 내용이 넘칠 경우 ... 표시
    max-width: 270px;            // 최대 너비 설정 (원하는 값으로 조절 가능)
  }
  `;

const StyledButton = styled.button`
    background: transparent;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `;