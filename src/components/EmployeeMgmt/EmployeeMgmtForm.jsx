import MgmtInfoMenu from '../Commons/MgmtInfoMenu';
import EmployeeMgmtInfo from './EmployeeMgmtInfo';
import EmployeeMgmtBasicForm from './EmployeeMgmtBasicForm';
import EmployeeMgmtGroupForm from './EmployeeMgmtGroupForm';
import { useEffect, useState } from 'react';
import { Container } from '../Commons/StyledForm';
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../utils/Slice';

export default function EmployeeMgmtForm() {
    const dispatch = useDispatch();
    const isVisible = useSelector(state => state.employeeMgmt.isVisible);
    const activeTab = useSelector(state => state.employeeMgmt.activeTab);
    // const [isInitialRender, setIsInitialRender] = useState(true);

    // useEffect(() => {

    // }, [isVisible]);


    // useEffect(() => {
    //     if (isInitialRender) {
    //         setIsInitialRender(false);
    //         return;
    //     }

    //     handleMove();
    // }, [activeTab]);

    if (!isVisible) return null;

    const handleTabClick = (tabName) => {
        dispatch(employeeActions.setActiveTab(tabName));
        handleMove();

    };
    //   let dataChanged = true; // 이 값을 실제로 변경된 데이터를 기반으로 설정해야 합니다.


    const handleMove = () => {
        // if (!dataChanged) {
        //     return; // 데이터 변경이 없으면 아무 작업도 수행하지 않습니다.
        // }

        const isConfirmed = window.confirm("저장하시겠습니까?");
        if (isConfirmed) {
            // 확인 버튼을 클릭한 경우 실행할 코드 axios
            showAlertAndDisappear("저장되었습니다.");
        } else {
            alert("작성 중이던 정보는 저장되지 않았습니다.");
            return;
        }
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
        <Container>
            <EmployeeMgmtInfo />
            <MgmtInfoMenu activeTab={activeTab} setActiveTab={handleTabClick} />

            {activeTab === "basic" && <EmployeeMgmtBasicForm />}
            {activeTab === "department" && <EmployeeMgmtGroupForm />}


        </Container>
    );
}

