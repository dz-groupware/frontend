import MgmtInfoMenu from '../Commons/MgmtInfoMenu';
import EmployeeMgmtInfo from './EmployeeMgmtInfo';
import EmployeeMgmtBasicForm from './EmployeeMgmtBasicForm';
import EmployeeMgmtGroupForm from './EmployeeMgmtGroupForm';
import { useEffect, useRef, useState } from 'react';
import { Container } from '../Commons/StyledForm';
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../utils/Slice';
import { getEmployeeDetailsById } from '../../api/employeemgmt';
import { styled } from "styled-components";


export default function EmployeeMgmtForm(pageId) {
  const dispatch = useDispatch();
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const activeTab = useSelector(state => state.employeeMgmt.activeTab);
  const basicInfo = useSelector(state => state.employeeMgmt.EmployeeMgmtBasicInfo);
  const groupInfo = useSelector(state => state.employeeMgmt.EmployeeMgmtGroupInfo);
  // const [isInitialRender, setIsInitialRender] = useState(true);




  // useEffect(() => {
  //     if (isInitialRender) {
  //         setIsInitialRender(false);
  //         return;
  //     }

  //     handleMove();
  // }, [activeTab]);

  // useEffect(() => {
  //     const handleEvent = () => {
  //         console.log('확인되었습니다');
  //     };

  //     window.addEventListener('basicInfoUpdated', handleEvent);

  //     return () => {
  //         window.removeEventListener('basicInfoUpdated', handleEvent);
  //     };
  // }, []);

  if (!isVisible) return null;

  const handleTabClick = async (tabName) => {
    handleMove();

    dispatch(employeeActions.setActiveTab(tabName));
  };






  const handleMove = () => {
    // const isConfirmed = window.confirm("저장하시겠습니까?");
    // if (isConfirmed) {
    //   if (activeTab === "basic") {
    //     //axios 쓰기
    //   } else if (activeTab === "department") {
    //     ////axios 쓰기
    //   }
    //   showAlertAndDisappear("저장되었습니다.");
    // } else {

    //   alert("작성 중이던 정보는 저장되지 않았습니다."); 
    //   return;
    // }
  };



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


  return (

    <StyledContainer>
      <EmployeeMgmtInfo pageId={pageId} />
      <MgmtInfoMenu activeTab={activeTab} setActiveTab={handleTabClick} />
        {activeTab === "basic" && <EmployeeMgmtBasicForm pageId={pageId} />}
        {activeTab === "department" && <EmployeeMgmtGroupForm pageId={pageId} />}
    </StyledContainer>


  );
}

const StyledContainer = styled.div`
    max-width: 95%;
    min-width: 95%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 40px;
      
`;
