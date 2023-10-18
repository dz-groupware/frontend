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
import { StyledButton } from '../Commons/StyledButton';

export default function EmployeeMgmtGroupForm({ pageId }) {
  const dispatch = useDispatch();
  const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const [info, setInfo] = useState(reduxEmployeeGroupInfo);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState({});
  const [groupsInfo, setGroupsInfo] = useState([reduxEmployeeGroupInfo]);
  const previousGroupsInfo = useRef([]);
  const [showCEOOption, setShowCEOOption] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const loginCompanyId = useSelector(state => state.employeeMgmt.loginCompanyId);


  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        axiosInstance.defaults.headers['menuId'] = pageId;
        const response = await axiosInstance.get('/companies/');
        setCompanyOptions(response.data.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false); // 데이터를 받아온 후 로딩 상태를 false로 변경
      }
    };

    fetchCompanies();
  }, [pageId]); // pageId가 변경될 때만 useEffect가 실행되도록 의존성 배열 추가

  // 로딩 중일 때는 로딩 인디케이터 렌더링

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
    if (Array.isArray(reduxEmployeeGroupInfo)) {
      setGroupsInfo(reduxEmployeeGroupInfo.map(item => ({ ...item })));
      for (const item of reduxEmployeeGroupInfo) {
        if (item.compId) {
          fetchDepartmentsForCompany(item.compId);
        }
      }
    } else {
      setGroupsInfo([reduxEmployeeGroupInfo]);
      if (reduxEmployeeGroupInfo.compId) {
        fetchDepartmentsForCompany(reduxEmployeeGroupInfo.compId);
      }
    }
  }, [reduxEmployeeGroupInfo, isVisible]);


  useEffect(() => {
    console.log("showCEOOption changed to", showCEOOption);
  }, [showCEOOption]);



  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    let propName = name;

    if (name === "compId") {
      checkIfCompanyHasCEO(value);
      fetchDepartmentsForCompany(value);

      const updatedGroups = [...groupsInfo];
      updatedGroups[idx] = {
        ...updatedGroups[idx],
        compId: value,
        position: "",
        deptId: "",
        transferredYn: "",
        edjoinDate: "",
        leftDate: ""
      };
      setGroupsInfo(updatedGroups);
      return;
    }



    if (name === "position" && value === "대표") {
      const updatedGroups = [...groupsInfo];
      updatedGroups[idx] = {
        ...updatedGroups[idx],
        position: value,
        deptId: "",
        transferredYn: "",
        edjoinDate: "",
        leftDate: ""
      };
      setGroupsInfo(updatedGroups);
      return;
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




  const handleBlur = () => {
    dispatch(employeeActions.updateGroupInfo(groupsInfo));
  };


  const fetchDepartmentsForCompany = async (companyId) => {
    console.log("부서체크하니");

    try {
      axiosInstance.defaults.headers['menuId'] = pageId;
      const response = await axiosInstance.get(`/employeemgmt/dep/${companyId}`);

      setDepartmentOptions(prevOptions => ({
        ...prevOptions,
        [companyId]: response.data.data
      }));

      console.log("부서값 받아왓니");
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const checkIfCompanyHasCEO = async (companyId) => {
    setShowCEOOption(false);
    console.log("check하니");
    try {
      axiosInstance.defaults.headers['menuId'] = pageId;
      const response = await axiosInstance.get(`/employeemgmt/${companyId}/hasCEO`);
      console.log("ceo값 받아왔니", response.data.data);

      // 데이터에 따라 showCEOOption을 설정합니다.
      if (response.data.data) {
        // 회사에 대표가 있다면 "대표" 옵션을 표시하지 않음
        setShowCEOOption(false);
      } else {
        // 회사에 대표가 없다면 "대표" 옵션을 표시함
        setShowCEOOption(true);
      }
    } catch (error) {
      console.error("Error checking if company has CEO:", error);
    }
  };


  const restoreGroup = (index) => {
    const updatedGroups = [...groupsInfo];
    // 'deletedYn' 플래그를 false로 재설정하여 항목을 복구합니다.
    updatedGroups[index].deletedYn = false;
    setGroupsInfo(updatedGroups);
    // 필요한 경우, 서버에 복구 상태를 업데이트하는 로직을 여기에 추가합니다.
  };


  const addNewGroup = () => {
    previousGroupsInfo.current.push([...groupsInfo]);
    const newGroup = {
      compId: loginCompanyId,
      deletedYn: false,
      new: true,

    };
    setGroupsInfo([...groupsInfo, newGroup]);
  };


  const removeGroup = (index) => {
    // 그룹 정보를 복사하고
    const updatedGroups = [...groupsInfo];

    // 삭제될 항목을 찾아서 deletedYn 값을 true로 설정합니다.
    if (updatedGroups[index].new) {
      updatedGroups.splice(index, 1);  // 새로운 그룹이면 완전히 제거
    } else {
      updatedGroups[index].deletedYn = true;  // 기존 그룹은 '삭제됨' 상태로 표시
    }

    // 상태를 업데이트합니다.
    setGroupsInfo(updatedGroups);
    // 서버에 저장 로직이 있다면 그 부분도 업데이트가 필요합니다.
  };



  if (loading) {
    return <p>Loading...</p>;
  }

  return (

    <StyledContainer>
      {groupsInfo.map((group, idx) => (
        <EmployeeMgmtGroupInputForm key={idx} style={{ color: group.deletedYn ? 'red' : 'black' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>  {/* 이 div가 버튼들을 오른쪽으로 정렬하는 컨테이너 역할을 합니다. */}
            {/* 그룹이 삭제되지 않았거나 새 그룹인 경우에만 X 버튼 표시 */}
            {!group.deletedYn && (group.new || group.compId === loginCompanyId) && (
              <CloseButton onClick={() => removeGroup(idx)}>x</CloseButton>
            )}
            {group.deletedYn && (
              <div style={{ display: 'flex', alignItems: 'center' }}> {/* 이 div가 버튼과 텍스트를 한 줄에 정렬합니다. */}
                <span style={{ marginRight: '10px' }}>삭제되었습니다.</span>
                {/* "복구하기" 버튼. 여기서는 CloseButton 컴포넌트를 재사용하지만, 필요에 따라 별도의 스타일을 적용할 수 있습니다. */}
                <CloseButton onClick={() => restoreGroup(idx)}>복구하기</CloseButton>
              </div>
            )}
            {!group.new && group.compId !== loginCompanyId && (
              <p style={{ margin: '5px 0', alignSelf: 'center' }}>로그인한 회사만 수정 삭제할 수 있습니다.</p>

            )}
          </div>
          <InputContainer>
            <Label>회사</Label>

            <Select
              name="compId"
              value={group.compId || ''}
              onChange={(e) => handleChange(e, idx)}
              onBlur={handleBlur}
              disabled={group.compId}
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
                {(showCEOOption || group.position === "대표") && <option value="대표">대표</option>}
                {(!showCEOOption || group.position === "팀장") && <option value="팀장">팀장</option>}
                {(!showCEOOption || group.position === "부장") && <option value="부장">부장</option>}
                {(!showCEOOption || group.position === "대리") && <option value="대리">대리</option>}
                {(!showCEOOption || group.position === "사원") && <option value="사원">사원</option>}
              </Select>
            </InputContainer>


            <InputContainer>
              <Label>부서</Label>
              <Select
                name="deptId"
                value={group.deptId || ""}
                onChange={(e) => handleChange(e, idx)}
                onBlur={handleBlur}
                disabled={!group.compId || group.position === "대표"}
              >
                <option value="direct">선택</option>
                {departmentOptions[group.compId] && departmentOptions[group.compId].map((department, index) => (
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
                disabled={!group.compId || group.position === "대표"}
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
                disabled={!group.compId || group.position === "대표"}
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
              disabled={!group.compId || group.position === "대표"}

            />
            <FormInput
              label="부서 이동일"
              name="leftDate"
              type="date"
              value={group.leftDate || ''}
              onChange={(e) => handleChange(e, idx)}
              onBlur={handleBlur}

              disabled={!group.compId || group.transferredYn !== true}
            />
          </HalfInputContainer>

        </EmployeeMgmtGroupInputForm>
      ))}
      <AddButton onClick={addNewGroup}>소속 부서 추가</AddButton>
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
   height:  460px;
`;

const EmployeeMgmtGroupInputForm = styled.div`
      border-top: 2px solid gray;
      margin-top: 10px;
      width: 99%;
      background-color: white;
      
    `;

const CloseButton = styled(StyledButton)`
    cursor: pointer;
    font-size: 15px;
   
  `;

const AddButton = styled(StyledButton)`
  margin-top: 20px;
  cursor: pointer;
  font-size: 15px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
  3px 3px 3px 0px rgba(0,0,0,.1),
  1px 1px 3px 0px rgba(0,0,0,.1);
  outline: none;
 
`;