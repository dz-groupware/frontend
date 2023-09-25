import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

import MgmtInfo from "../Commons/MgmtInfo";
import { employeeActions } from "../../utils/Slice";
import { addEmployeeMgmt, deleteEmployeeMgmt, modifyEmployeeMgmt } from "../../api/employeemgmt";



export default function EmployeeMgmtInfo() {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
    const [basicInfo, basicSetInfo] = useState(reduxEmployeeBasicInfo);
    const [groupInfo, groupSetInfo] = useState(reduxEmployeeGroupInfo);
    const activeTab = useSelector(state => state.employeeMgmt.activeTab);
    const idForForm = useSelector(state => state.employeeMgmt.idForForm);



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
            console.log("combinedEmployeeInfo",combinedEmployeeInfo.departmentId);
            for (const info of combinedEmployeeInfo) {
                if (!info.resignationDate) {
                    alert("퇴사일을 입력해주세요.");
                    
                    return;
                }
                
                try {
                    console.log("퇴사 바디", info);
                    await deleteEmployeeMgmt(info.id, info);
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
        if (idForForm) {
            for (const info of combinedEmployeeInfo) {
                try {
                    await modifyEmployeeMgmt(info);
                } catch (error) {
                    console.error("Error updating employee data for ID:", info.id, error);
                    // 여기서 실패한 경우에 대한 추가 처리를 고려할 수 있습니다.
                }
            }
            alert("사원 데이터가 수정되었습니다.");
            dispatch(employeeActions.hideForm());
            // window.location.reload();
    
        } else {
            for (const info of combinedEmployeeInfo) {
                try {
                    await addEmployeeMgmt(info);
                } catch (error) {
                    console.error("Error adding employee data for ID:", info.id, error);
                    // 이미 등록된 사원에 대한 오류 또는 다른 오류를 처리하기 위한 추가 로직을 여기에 넣을 수 있습니다.
                }
            }
            alert("사원 데이터가 저장되었습니다.");
            dispatch(employeeActions.hideForm());
            window.location.reload();
        }
    };
    



    const handleSubmit = async (e) => {



        console.log("employee", combinedEmployeeInfo);
        const requiredFields = [
            'name', 'empIdNum', 'gender',
            'accountYn', 'loginId', 'loginPw',
            'privEmail', 'mobileNumber',
            'address', 'joinDate', 'compId',
            'position'
        ]; // 필수 입력 필드 목록


        const missingFields = [];

        for (const employeeInfo of combinedEmployeeInfo) {  // 배열을 순회합니다.
            if (employeeInfo.position !== "대표") {
                requiredFields.push('transferredYn', 'edjoinDate', 'deptId');
                if (employeeInfo.transferredYn === true) {
                    requiredFields.push('leftDate');
                }
            }
    
            requiredFields.forEach((field) => {
                const value = employeeInfo[field];  // 여기서 각 객체에서 필드 값을 가져옵니다.
                if ((field !== "transferredYn" && field !== "accountYn" && !value) ||
                    ((field === "transferredYn" || field === "accountYn") && value !== true && value !== false) ||
                    value === 'direct' ||
                    value === null ||
                    value === '') {
                    missingFields.push(field);  // 필드가 누락되거나 유효하지 않으면 missingFields 배열에 추가합니다.
                }
            });
        }
    
        if (missingFields.length > 0) {
            console.log("Missing fields:", missingFields);
            alert("모든 필수 필드를 채워주세요: " + missingFields.join(", "));
            return;
        }


        if (combinedEmployeeInfo.privEmail && !combinedEmployeeInfo.privEmail.includes('@')) {
            console.log('privEmail:', combinedEmployeeInfo.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }
        if (combinedEmployeeInfo.empIdNum && (combinedEmployeeInfo.empIdNum.length !== 14 || !combinedEmployeeInfo.empIdNum.includes('-'))) {
            alert("주민등록번호는 '-'를 포함한 14자리여야 합니다.");
            return;
        }
        

        const joinDate = new Date(combinedEmployeeInfo.joinDate);
        const resignationDate = combinedEmployeeInfo.resignationDate ? new Date(combinedEmployeeInfo.resignationDate) : null;

        if (resignationDate && joinDate > resignationDate) {
            alert("퇴사일은 입사일 이후의 날짜여야 합니다.");
            return;
        }

        const ecjoinDate = new Date(combinedEmployeeInfo.ecjoinDate);
        const leftDate = combinedEmployeeInfo.leftDate ? new Date(combinedEmployeeInfo.leftDate) : null;

        if (leftDate && ecjoinDate > leftDate) {
            alert("부서 이동일은 부서 배정일 이후의 날짜여야 합니다.");
            return;
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
