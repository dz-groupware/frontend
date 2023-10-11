import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

import MgmtInfo from "../Commons/MgmtInfo";
import { employeeActions } from "../../utils/Slice";
import { addEmployeeMgmt, deleteEmployeeMgmt, modifyEmployeeMgmt, imageUpload } from "../../api/employeemgmt";



export default function EmployeeMgmtInfo({ pageId }) {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
    const [basicInfo, basicSetInfo] = useState(reduxEmployeeBasicInfo);
    const [groupInfo, groupSetInfo] = useState(reduxEmployeeGroupInfo);
    const idForForm = useSelector(state => state.employeeMgmt.idForForm);
    const isDuplicated = useSelector(state => state.employeeMgmt.isDuplicated);
    const isSignUpChecked = useSelector(state => state.employeeMgmt.isSignUpChecked);
    const isDataFetched = useSelector(state => state.employeeMgmt.idForForm);




    useEffect(() => {
        basicSetInfo(reduxEmployeeBasicInfo);
        groupSetInfo(reduxEmployeeGroupInfo);
    }, [reduxEmployeeBasicInfo, reduxEmployeeGroupInfo]);

    const combinedEmployeeInfo = reduxEmployeeGroupInfo.map(group => ({
        ...reduxEmployeeBasicInfo,
        ...group
    }));


    const handleDelete = async (e) => {
        if (idForForm) {
            console.log("combinedEmployeeInfo", combinedEmployeeInfo.departmentId);
            for (const info of combinedEmployeeInfo) {
                if (!info.resignationDate) {
                    alert("퇴사일을 입력해주세요.");

                    return;
                }

                try {
                    console.log("퇴사 바디", info);
                    await deleteEmployeeMgmt(info.id, info, pageId);
                    //image 업로드
                } catch (error) {
                    console.error("Error deleting employee data for ID:", info.id, error);
                    // 여기서 실패한 경우에 대한 추가 처리를 고려할 수 있습니다.
                }
            }
            alert("사원 데이터가 삭제되었습니다.");
            window.location.reload();
            dispatch(employeeActions.hideForm());

        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(employeeActions.hideForm());
            window.location.reload();
        }
    };





    const handleUpdate = async (e) => {
        let isErrorOccurred = false;

        if (idForForm) {
            for (const info of combinedEmployeeInfo) {
                try {

                    await modifyEmployeeMgmt(info, pageId);

                    //여기서 이미지 upload api 요청하기 사원 이름+로그인아이디 해서 올려주기
                } catch (error) {
                    console.error("Error updating employee data for ID:", info.id, error);
                    isErrorOccurred = true;
                    // 여기서 실패한 경우에 대한 추가 처리를 고려할 수 있습니다.
                }
            }
            if (!isErrorOccurred) {
                alert("사원 데이터가 수정되었습니다.");
                dispatch(employeeActions.hideForm());
                window.location.reload();
            }

        } else {
            for (const info of combinedEmployeeInfo) {
                try {
                    await addEmployeeMgmt(info, pageId);
                    //여기서 이미지 upload api 요청하기

                } catch (error) {
                    console.error("Error adding employee data for ID:", info.id, error);
                    isErrorOccurred = true;
                }
            }
            if (!isErrorOccurred) {
                alert("사원 데이터가 저장되었습니다.");
                dispatch(employeeActions.hideForm());

                window.location.reload();
            }
        }
    };




    const handleSubmit = async (e) => {


        if (!isDataFetched) {
            console.log("isSignUpChecked", isSignUpChecked);
            if (isSignUpChecked === false) {
                alert("가입확인을 해주세요.");
                return;
            }

            console.log("isDuplicated", isDuplicated);
            if (isDuplicated === false) {
                alert("아이디 중복확인을 해주세요.");
                return;
            }
        }

        console.log("employee", combinedEmployeeInfo);
        const requiredFields = [
            'name', 'empIdNum', 'gender',
            'accountYn', 'loginId', 'loginPw',
            'privEmail', 'mobileNumber',
            'address', 'joinDate', 'compId',
            'position'
        ]; // 필수 입력 필드 목록


        const missingFields = [];

        for (const employeeInfo of combinedEmployeeInfo) {
            console.log("departmentId",employeeInfo);
            const currentRequiredFields = [...requiredFields]; // 필수 입력 필드 목록을 복사하여 초기화
          

            if (employeeInfo.position !== "대표") {
                currentRequiredFields.push('transferredYn', 'edjoinDate', 'deptId');
                if (employeeInfo.transferredYn === true) {
                    currentRequiredFields.push('leftDate');
                }
            }

            currentRequiredFields.forEach((field) => {
                const value = employeeInfo[field];
                if ((field !== "transferredYn" && field !== "accountYn" && !value) ||
                    ((field === "transferredYn" || field === "accountYn") && value !== true && value !== false) ||
                    value === 'direct' ||
                    value === null ||
                    value === '') {
                    missingFields.push(field);
                }
            });


            if (missingFields.length > 0) {
                console.log("Missing fields:", missingFields);
                alert("모든 필수 필드를 채워주세요: " + missingFields.join(", "));
                return;
            }


            if (employeeInfo.privEmail && !employeeInfo.privEmail.includes('@')) {
                console.log('privEmail:', employeeInfo.privEmail);
                alert("이메일에 도메인이 포함되어야 합니다.");
                return;
            }
            if (employeeInfo.empIdNum && (employeeInfo.empIdNum.length !== 14 || !employeeInfo.empIdNum.includes('-'))) {
                alert("주민등록번호는 '-'를 포함한 14자리여야 합니다.");
                return;
            }

            const joinDate = new Date(employeeInfo.joinDate);
            const resignationDate = employeeInfo.resignationDate ? new Date(employeeInfo.resignationDate) : null;
            if (resignationDate && joinDate > resignationDate) {
                alert("퇴사일은 입사일 이후의 날짜여야 합니다.");
                return;
            }

            const ecjoinDate = new Date(employeeInfo.ecjoinDate);
            const leftDate = employeeInfo.leftDate ? new Date(employeeInfo.leftDate) : null;
            if (leftDate && ecjoinDate > leftDate) {
                alert("부서 이동일은 부서 배정일 이후의 날짜여야 합니다.");
                return;
            }
        }


        dispatch(employeeActions.updateBasicInfo(basicInfo));
        dispatch(employeeActions.updateGroupInfo(groupInfo));
        handleUpdate(e);


    }



    return (
        <MgmtInfo title="상세" $noborder="true"
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            hideFormAction={employeeActions.hideForm}>

        </MgmtInfo>
    );
}
