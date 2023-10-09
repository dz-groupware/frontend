import MgmtInfoMenu from '../Commons/MgmtInfoMenu';
import {
  Container,
  InputContainer,
  HalfInputContainer,
  Label,
  Input,
  FormInput,
  Select
} from '../Commons/StyledForm';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import {StyledButton} from '../Commons/StyledButton';

export default function EmployeeMgmtGroupForm({ pageId }) {
  const dispatch = useDispatch();
  const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const [info, setInfo] = useState(reduxEmployeeGroupInfo);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupsInfo, setGroupsInfo] = useState([reduxEmployeeGroupInfo]);
  const previousGroupsInfo = useRef([]);
  const [showCEOOption, setShowCEOOption] = useState(false);


  useEffect(() => {
    // 회사 목록을 가져오는 함수
    const fetchCompanies = async () => {
      try {
        // console.log("가나다라마바사", pageId.pageId);

        axiosInstance.defaults.headers['menuId'] = pageId;
        const response = await axiosInstance.get('/companies/');
        // console.log("가나다라마바사", response);
        setCompanyOptions(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    // 부서 목록을 가져오는 함수
    
    fetchCompanies();
  }, []);

  // useEffect(() => {
  //   const checkIfCompanyHasCEO = async (compId) => {
  //     console.log("대표변화되니", compId);

  //     try {
  //       // const response = await axiosInstance.get(`/companies/${compId}/hasCEO`);
  //       // ... 나머지 로직
  //     } catch (error) {
  //       console.error("Error checking if company has CEO:", error);
  //     }
  //   };

  //   // groupsInfo 배열을 순회하며 각 compId에 대한 체크를 실행
  //   for (const group of groupsInfo) {
  //     if (group.compId) {
  //       checkIfCompanyHasCEO(group.compId);
  //     }
  //   }

  // }, [groupsInfo.map(item => item.compId).join(",")]);



  useEffect(() => {
    // console.log("groupsInfo has changed:", groupsInfo);
  }, [groupsInfo]);

  useEffect(() => {
    // info가 배열인 경우에 대한 처리
    if (Array.isArray(reduxEmployeeGroupInfo)) {
      setGroupsInfo(reduxEmployeeGroupInfo.map(item => ({ ...item })));
    } else {
      // info가 배열이 아닌 경우에 대한 처리
      setGroupsInfo([reduxEmployeeGroupInfo]);
    }
  }, [reduxEmployeeGroupInfo, isVisible]);

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    let propName = name;

    if (name === "compId") {
console.log("dlvmans ehsl");
      checkIfCompanyHasCEO(value); 
      fetchDepartmentsForCompany(value);
    }

    // Extract correct property name for transferredYn
    if (name.startsWith("transferredYn")) {
      propName = "transferredYn";
    }

    let finalValue;
    if (propName === "transferredYn") {
      finalValue = value === "true";
    } else {
      finalValue = value;
    }


    const updatedGroups = [...groupsInfo];
    updatedGroups[idx] = {
      ...updatedGroups[idx],
      [propName]: finalValue
    };
    setGroupsInfo(updatedGroups);


  };

  const addNewGroup = () => {
    previousGroupsInfo.current.push([...groupsInfo]);
    const newGroup = {
      deletedYn: false
    };
    setGroupsInfo([...groupsInfo, newGroup]);
  };


  const removeGroup = () => {
    if (groupsInfo.length > 1) {
      const updatedGroups = [...groupsInfo];
      updatedGroups.pop(); // 마지막 원소 제거
      setGroupsInfo(updatedGroups);
      dispatch(employeeActions.updateGroupInfo(updatedGroups));
      
    } else {
      // 모든 그룹이 제거되었을 때 필요한 필드 초기화
      const resetGroup = {
        // 초기 상태로 설정하고자 하는 필드들을 여기에 추가합니다.
        deletedYn: false
      };
      setGroupsInfo([resetGroup]);

      
    }
  };
  

  const handleBlur = () => {
    dispatch(employeeActions.updateGroupInfo(groupsInfo));
  };


  const fetchDepartmentsForCompany = async (companyId) => {
    console.log("부서체크하니");

    try {
      axiosInstance.defaults.headers['menuId'] = pageId;
      const response = await axiosInstance.get(`/employeemgmt/dep/${companyId}`);
      setDepartmentOptions(response.data.data);
      console.log("부서값 받아왓니");
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const checkIfCompanyHasCEO = async (companyId) => {

    console.log("check하니");
    try {
      axiosInstance.defaults.headers['menuId'] = pageId;
      const response = await axiosInstance.get(`/employeemgmt/${companyId}/hasCEO`);
      console.log("ceo값 받아왓니",response.data.data);
     
      if (response.data.data) {
        setShowCEOOption(false);
      } else {
        setShowCEOOption(true);
      }
    } catch (error) {
      console.error("Error checking if company has CEO:", error);
    }
  };

  return (
    
    <StyledContainer>
      {groupsInfo.map((group, idx) => (
        <EmployeeMgmtGroupInputForm key={idx}>
          {!group.deptId && idx !== 0 && <CloseButton onClick={() => removeGroup(idx)}>x</CloseButton >}
          <InputContainer>
            <Label>회사</Label>

            <Select
              name="compId"
              value={group.compId || ''}
              onChange={(e) => handleChange(e, idx)}
              onBlur={handleBlur}
            >
              <option value="direct">선택</option>
              {companyOptions && companyOptions.map((company, index) => (
                <option key={index} value={company.id}>{company.name}</option>
              ))}
            </Select>
          </InputContainer>

          <HalfInputContainer>
            <InputContainer>
              <Label>직급</Label>
              <Select
                name="position"
                value={group.position}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
                disabled={!group.compId}
              >
                <option value="direct">선택</option>
                {showCEOOption && <option value="대표">대표</option>}
                <option value="팀장">팀장</option>
                <option value="부장">부장</option>
                <option value="대리">대리</option>
                <option value="사원">사원</option>
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>부서</Label>
              <Select
                name="deptId"
                value={group.deptId || ""}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
                disabled={!group.compId}
              >
                <option value="direct">선택</option>
                {departmentOptions && departmentOptions.map((department, index) => (
                  <option key={index} value={department.id}>{department.name}</option>
                ))}
              </Select>
            </InputContainer>
          </HalfInputContainer>

          <InputContainer>
            <Label>인사이동유무</Label>
            <label>
              <Input
                type="radio"
                name={`transferredYn-${idx}`}
                value={"true" || ""}
                checked={group.transferredYn === true}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
              />
              이동
            </label>
            <label>
              <Input
                type="radio"
                name={`transferredYn-${idx}`}
                value={"false" || ""}
                checked={group.transferredYn === false}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
              />
              미이동
            </label>
          </InputContainer>

          <HalfInputContainer>
            <FormInput
              label="부서 배정일"
              name="edjoinDate"
              type="date"
              value={group.edjoinDate || ''}
              onChange={(e) => handleChange(e, idx)}
              onBlur={handleBlur}


            />
            <FormInput
              label="부서 이동일"
              name="leftDate"
              type="date"
              value={group.leftDate || ''}
              onChange={(e) => handleChange(e, idx)}
              onBlur={handleBlur}

              disabled={group.transferredYn !== true}
            />
          </HalfInputContainer>

        </EmployeeMgmtGroupInputForm>
      ))}
      <StyledButton onClick={addNewGroup}>소속 부서 추가</StyledButton>
    </StyledContainer>
  
  );
}

const StyledContainer = styled.div`
    width:100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
   height:  300px;
`;

const EmployeeMgmtGroupInputForm = styled.div`
      border-top: 2px solid black;
      margin-top: 10px;
      width: 99%;
      background-color: white;
    `;

const CloseButton = styled(StyledButton)`
    cursor: pointer;
    font-size: 15px;
   
  `;

 