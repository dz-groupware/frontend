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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import StyledButton from '../Commons/StyledButton';

export default function EmployeeMgmtGroupForm({menuId}) {
  const dispatch = useDispatch();
  const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const [info, setInfo] = useState(reduxEmployeeGroupInfo);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [groupsInfo, setGroupsInfo] = useState([reduxEmployeeGroupInfo]);
  

  useEffect(() => {
    // 회사 목록을 가져오는 함수
    const fetchCompanies = async () => {
      try {
        console.log("가나다라마바사",menuId.menuId);
       
        axiosInstance.defaults.headers['menuId'] = menuId;
        const response = await axiosInstance.get('/companies/');
        console.log("가나다라마바사",response);
        setCompanyOptions(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    // 부서 목록을 가져오는 함수
    const fetchDepartments = async () => {
      try {
        axiosInstance.defaults.headers['menuId'] = menuId;
        const response = await axiosInstance.get('/employeemgmt/dep');
        setDepartmentOptions(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchCompanies();
    fetchDepartments();
  }, []);


  useEffect(() => {
    console.log("groupsInfo has changed:", groupsInfo);
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
  const newGroup = {
    deletedYn: false
  };
  setGroupsInfo([...groupsInfo, newGroup]);
};



  const handleBlur = () => {
    dispatch(employeeActions.updateGroupInfo(groupsInfo));
  };

  return (
    <Container>
      {groupsInfo.map((group, idx) => (
        <EmployeeMgmtGroupInputForm key={idx}>
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
              >
                <option value="direct">선택</option>
                {group.position === '대표' && <option value="대표">대표</option>}
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
                value={group.deptId}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
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
                    value={"true"||""}
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
                    value={"false"||""}
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
        </Container>
      );
    }
    
    const EmployeeMgmtGroupInputForm = styled.div`
      border-top: 2px solid black;
      margin-top: 10px;
      width: 100%;
      background-color: white;
    `;
    