import { styled } from 'styled-components';
import MgmtHeader from '../Commons/MgmtHeader';
import {ButtonBright, StyledButton} from '../Commons/StyledButton';
import NotificationInfo from '../Commons/NotificationInfo';
import { employeeActions } from '../../utils/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteEmployeeMgmt, findEmployeeMgmtList, getEmployeeDetailsById } from '../../api/employeemgmt';
import { SearchButton } from '../Commons/MgmtNav';
import { FiSearch } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";


export default function EmployeeMgmtHeader({ pageId }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 상태를 관리할 state
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [employeeList, setEmployeeList] = useState([]); // API 응답을 저장하는 상태
  const [checkedEmployees, setCheckedEmployees] = useState([]); // 체크된 사원들의 ID 또는 고유 값을 저장하는 상태
  const idForForm = useSelector(state => state.employeeMgmt.idForForm);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const showAlertAndDisappear = (message) => {
    // overlay 생성 및 스타일 설정
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // 불투명한 검은색 배경
    overlay.style.zIndex = "9998"; // z-index를 높게 설정하여 다른 요소들 위에 오도록 함

    // alertBox 생성 및 스타일 설정
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.backgroundColor = "#eee";
    alertBox.style.padding = "40px";
    alertBox.style.zIndex = "9999"; // overlay보다 높게 설정하여 overlay 위에 오도록 함

    document.body.appendChild(overlay);
    document.body.appendChild(alertBox);

    setTimeout(() => {
      document.body.removeChild(alertBox);
      document.body.removeChild(overlay);
    }, 1000);
  };



  const handleHireProcess = async () => {
    dispatch(employeeActions.resetState())
    dispatch(employeeActions.hideForm())

    setTimeout(() => {
      dispatch(employeeActions.showForm());
    }, 50);

  }

  const handleCloseModal = () => {
    if (window.confirm("모달을 닫으면 정보가 날라갑니다. 계속하시겠습니까?")) {
      setModalIsOpen(false);
      setSelectedEmployees([]);  // selectedEmployees 상태 초기화
    }
  };



  const handleRetire = () => {
    dispatch(employeeActions.resetState())
    dispatch(employeeActions.hideForm())
    setSearchValue(""); // 검색 값 초기화
    setSelectedOption(""); // 선택 옵션 초기화
    setEmployeeList([]); // 검색된 사원 목록 초기화
    setCheckedEmployees([]); // 선택된 사원 목록 초기화
    setModalIsOpen(true);
  }



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();

    }
  };




const handleSearch = async () => {
  try {
    dispatch(employeeActions.hideForm());

    const responseData = await findEmployeeMgmtList(searchValue, selectedOption, pageId);
    
    console.log("eeeeeeeee", responseData);

    setEmployeeList(responseData); // API 응답을 상태에 저장
    
    
  } catch (error) {
    console.error("API Error:", error);
  }
};



  async function handleEmployeeDetails(checkedEmployees) {
  

    try {
      const fetchedEmployeeData = await getEmployeeDetailsById(checkedEmployees, pageId);
      // console.log(fetchedEmployeeData);
      if (!fetchedEmployeeData) {
        console.error("No data returned for employee ID:", checkedEmployees);
        return;
      }



      const fetchedEmployeeArray = Object.values(fetchedEmployeeData);
      // 첫 번째 데이터로 basicInfo 생성
      const firstEmployee = fetchedEmployeeArray[0];
      // console.log("firstEmployee", firstEmployee);

      const employeeBasicInfo = {
        id: firstEmployee.id,
        imageUrl: firstEmployee.imageUrl,
        name: firstEmployee.name,
        empIdNum: firstEmployee.empIdNum,
        gender: firstEmployee.gender,
        accountYn: firstEmployee.accountYn,
        loginId: firstEmployee.loginId,
        loginPw: firstEmployee.loginPw,
        privEmail: firstEmployee.privEmail,
        mobileNumber: firstEmployee.mobileNumber,
        homeNumber: firstEmployee.homeNumber,
        address: firstEmployee.address,
        joinDate: firstEmployee.joinDate,
        resignationDate: firstEmployee.resignationDate
      };

      // 모든 데이터에서 groupInfo 수집
      const employeeGroupInfo = fetchedEmployeeArray.map(employee => ({
        departmentId: employee.departmentId,
        position: employee.position,
        compId: employee.compId,
        deptId: employee.deptId,
        transferredYn: employee.transferredYn,
        edjoinDate: employee.edjoinDate,
        leftDate: employee.leftDate,
        deletedYn: employee.deletedYn
      }));




      const combinedEmployeeInfo = employeeGroupInfo.map(group => ({
        ...employeeBasicInfo,
        ...group
      }));

      setEmployeeList(combinedEmployeeInfo);


    } catch (error) {
      console.error("Error fetching employee data by code:", error);
    }
  }






  const selectedEmployeeIds = selectedEmployees.map(employee => employee.id);


  const handleRetireProcess = async () => {
    if (checkedEmployees.length === 0) {
      alert("퇴사 처리할 사원을 선택해주세요.");
      return;
    }
    if (!window.confirm("진짜로 일괄 퇴사처리 하시겠습니까?")) {
      return;  // 사용자가 취소를 누르면 함수를 종료합니다.
    }
  
    for (let i = 0; i < selectedEmployees.length; i++) {
      try {
        // 해당 사원의 세부 정보 가져오기
        const employeeDetails = await getEmployeeDetailsById(selectedEmployeeIds[i], pageId);
  
        // 이제 employeeDetails를 사용하여 퇴사 처리를 수행합니다.
        await deleteEmployeeMgmt(selectedEmployeeIds[i], employeeDetails[0], pageId);
  
      } catch (error) {
        console.error("Error deleting employee data for ID:", selectedEmployeeIds[i], error);
        // 특정 ID에 대한 처리가 실패하면, 에러 메시지를 표시하고 루프를 종료합니다.
        alert(`ID: ${selectedEmployeeIds[i]}에 대한 퇴사처리 실패.`);
        return;
      }
    }
  
    alert("선택한 사원들의 퇴사 처리가 완료되었습니다.");
    setCheckedEmployees([]);  // 체크된 목록 초기화
    setModalIsOpen(false);
    window.location.reload();
  };
  










  const handleCheckboxChange = (employeeId) => {
    const employee = employeeList.find(emp => emp.id === employeeId); // 해당 사원의 정보를 찾습니다.

    if (checkedEmployees.includes(employeeId)) {
      setCheckedEmployees(checkedEmployees.filter(id => id !== employeeId));

      setSelectedEmployees(selectedEmployees.filter(emp => emp.id !== employeeId));
    } else {
      setCheckedEmployees([...checkedEmployees, employeeId]);

      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };



  const handleNameClick = (employeeId) => {
    handleCheckboxChange(employeeId);
  }

  return (
    <div>
      <MgmtHeader title="사원관리" pageId={pageId} extraButtonComponents={
        <ButtonArea>
          {/* <StyledButton>ID변경</StyledButton> */}
          {/* <StyledButton>비밀번호 초기화</StyledButton> */}
          <ButtonBright onClick={handleHireProcess}>입사처리</ButtonBright>
          <ButtonBright onClick={handleRetire}>퇴사일괄처리</ButtonBright>
          {modalIsOpen && (
            <ModalOverlay onClick={handleCloseModal}>
              <ModalContent onClick={e => e.stopPropagation()}>
                <h1>퇴사일괄처리</h1>
                <NotificationText><AiOutlineExclamationCircle />
                  오늘 날짜로 퇴사일이 처리되며
                  정보도 삭제됩니다.
                </NotificationText>


                <div>
                  <input value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text" placeholder="사원 이름 또는 ID 또는 Mail ID입력" />
                  <SearchButton onClick={handleSearch}><FiSearch style={{ color: "black" }} /></SearchButton>
                </div>
                <ContentSection>
                  <EmployeeList>
                    <h3>검색된 사원</h3>
                    <ul>
                      {employeeList.map(employee => (
                        <li key={employee.id} onClick={() => handleNameClick(employee.id)}>
                          <input
                            type="checkbox"
                            checked={checkedEmployees.includes(employee.id)}
                            onChange={() => handleCheckboxChange(employee.id)}
                          />
                          {employee.name} - {employee.loginId}
                        </li>
                      ))}
                    </ul>
                  </EmployeeList>

                  <EmployeeList>
                    <h3>선택된 사원</h3>
                    <ul>
                      {selectedEmployees.map(employee => (
                        <li key={employee.id}>
                          {employee.id} - {employee.name}
                        </li>
                      ))}
                    </ul>




                  </EmployeeList>
                </ContentSection>

                <CloseButton onClick={handleCloseModal}>✖</CloseButton>
                <Spacer />
                <Spacer />
                <ButtonArea>

                  <StyledButton styled={{ marginTop: "10px" }} onClick={handleRetireProcess}>퇴사 일괄 처리</StyledButton>

                </ButtonArea>

              </ModalContent>

            </ModalOverlay>
          )}


          <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '10px', marginRight: '5px' }} />
        </ButtonArea>
      } />
      <NotificationArea>
        <NotificationInfo>
          사용자 상세정보에서 퇴사일 입력 또는 삭제 클릭 시 퇴사처리 됩니다.
        </NotificationInfo>
      </NotificationArea>
    </div >
  );
}

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationArea = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  margin-top : 10px;
`



const ModalContent = styled.div`
display: flex;  // flexbox 활성화
justify-content: space-between; // 컨텐츠 사이에 공간 배치
flex-direction: column; 
position: relative;
width: 80%;            // 원하는 비율로 조정
max-width: 700px;
background-color: #f1f1f1;
padding: 40px;
border-radius: 10px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
text-align: center; // 중앙 정렬



h1 {
  font-weight: 700;  // 굵게 조절
  font-size: 2rem;   // 크기 조절
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem; // 크기 조절
  margin: 10px;
}

input[type="text"] {
  width: 80%; // 폭 조절
  margin: 10px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
  text-align: center; // 텍스트 중앙 정렬
}


`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  margin-top:50px;
`;


const CloseButton = styled.button`
position: absolute;
right: 15px;
top: 15px;
background: none;
border: none;
font-size: 24px; // 크기 조절
color: #888; // 색상 조절
cursor: pointer;
transition: 0.3s; // 부드러운 효과를 위한 트랜지션

&:hover {
  color: #444; // 호버 시의 색상
}
`;

const NotificationText = styled.p`
  font-size: 0.8rem; // 작게
  color: #b33; // 약간의 빨간색으로 주의를 끕니다.
  margin: 10px 0; // 위아래 여백 추가
  font-weight: 600;
`;


const ContentSection = styled.div`
  display: flex;  // 두 섹션을 양 옆에 배치
  justify-content: space-between;
`;

const EmployeeList = styled.div`
  width: 48%;  // 전체 너비의 약 절반
  height: 250px;
  max-height: 250px;  // 10명의 이름에 대략 맞는 높이 설정 (이 값을 조절해가며 원하는 높이를 찾아주세요)
  margin : 10px;
  h3 {
    font-weight: bold;
    border-bottom: 2px solid #000;  // 밑줄 추가
    padding-bottom: 5px;  // 밑줄과의 간격 추가
    margin-bottom: 10px;  // 밑줄 아래와의 간격 추가
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 250px;  // 목록의 높이 제한
    overflow-y: auto;
  
    li {

      cursor: pointer; 
      padding: 5px;
      white-space: nowrap;      // 줄 바꿈 방지
      overflow: hidden;        // 내용이 넘치면 숨김
      text-overflow: ellipsis; 
    }
  }
`;
const Spacer = styled.div`
  margin: 10px 0; // 원하는 마진을 설정
`;