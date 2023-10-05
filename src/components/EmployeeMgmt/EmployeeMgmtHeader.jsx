import { styled } from 'styled-components';
import MgmtHeader from '../Commons/MgmtHeader';
import StyledButton from '../Commons/StyledButton';
import NotificationInfo from '../Commons/NotificationInfo';
import { employeeActions } from '../../utils/Slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { findEmployeeMgmtList } from '../../api/employeemgmt';
import { SearchButton } from '../Commons/MgmtNav';
import { FiSearch } from "react-icons/fi";


export default function EmployeeMgmtHeader({ pageId }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 상태를 관리할 state
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [employeeList, setEmployeeList] = useState([]); // API 응답을 저장하는 상태
  const [checkedEmployees, setCheckedEmployees] = useState([]); // 체크된 사원들의 ID 또는 고유 값을 저장하는 상태


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

  const handleRetire = () => {
    dispatch(employeeActions.resetState())
    dispatch(employeeActions.hideForm())
    setModalIsOpen(true);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Enter 키를 누르면 검색 실행
      // setModalIsOpen(false);
      // showAlertAndDisappear("퇴사일을 입력해 주세요.");

    }
  };

  const handleSearch = async () => {
    try {
      dispatch(employeeActions.hideForm());

      const responseData = await findEmployeeMgmtList(searchValue, selectedOption, pageId);
      setEmployeeList(responseData); // API 응답을 상태에 저장
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleCheckboxChange = (employeeId) => {
    if (checkedEmployees.includes(employeeId)) {
        // 이미 체크된 항목의 체크를 해제
        setCheckedEmployees(checkedEmployees.filter(id => id !== employeeId));
    } else {
        // 새로운 항목의 체크 설정
        setCheckedEmployees([...checkedEmployees, employeeId]);
    }
};



  return (
    <div>
      <MgmtHeader title="사원" extraButtonComponents={
        <ButtonArea>
          {/* <StyledButton>ID변경</StyledButton> */}
          <StyledButton>비밀번호 초기화</StyledButton>
          <StyledButton onClick={handleHireProcess}>입사처리</StyledButton>
          <StyledButton onClick={handleRetire}>퇴사처리</StyledButton>
          {modalIsOpen && (
            <ModalOverlay onClick={() => setModalIsOpen(false)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                <h1>퇴사처리</h1>
                <NotificationText>오늘 날짜로 퇴사일이 처리되며 정보도 삭제됩니다.</NotificationText>
                <p>사원 검색:</p>
                <input value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text" placeholder="사원 이름 또는 ID 또는 Mail ID입력" />
                  <SearchButton onClick={handleSearch}><FiSearch style={{ color: "lightgrey" }} /></SearchButton>
                <CloseButton onClick={() => setModalIsOpen(false)}>✖</CloseButton>

                <ul>
                  {employeeList.map(employee => (
                    <li key={employee.id}>
                      <input
                        type="checkbox"
                        checked={checkedEmployees.includes(employee.id)}
                        onChange={() => handleCheckboxChange(employee.id)}
                      />
                      {employee.name} - {employee.position}
                    </li>
                  ))}
                </ul>
              </ModalContent>
            </ModalOverlay>
          )}


          <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '0px', marginRight: '-5px' }} />
        </ButtonArea>
      } />
      <NotificationArea>
        <NotificationInfo>
          사원이 추가 될 경우 알림이 갑니다.
        </NotificationInfo>
      </NotificationArea>
    </div >
  );
}

const ButtonArea = styled.div`
  display:flex;
  justify-content: center;
  align-items : center;

`;

const NotificationArea = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  margin-top : 10px;
`



const ModalContent = styled.div`
position: relative;
width: 50%;
max-width: 500px;
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
  margin-bottom: 10px;
}

input[type="text"] {
  width: 80%; // 폭 조절
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
`;
