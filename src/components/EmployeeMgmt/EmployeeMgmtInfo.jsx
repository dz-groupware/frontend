import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

import MgmtInfo from "../Commons/MgmtInfo";
import { employeeActions } from "../../utils/Slice";
import { addEmployeeMgmt, deleteEmployeeMgmt } from "../../api/employeemgmt";



export default function EmployeeMgmtInfo() {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
    const [basicInfo, basicSetInfo] = useState(reduxEmployeeBasicInfo);
    const [groupInfo, groupSetInfo] = useState(reduxEmployeeGroupInfo);
    const activeTab = useSelector(state => state.employeeMgmt.activeTab);
    const idForForm = useSelector(state => state.employeeMgmt.idForForm);


    useEffect(() => {
        
    
      }, [idForForm]);

    const employeeInfo = {
        ...reduxEmployeeBasicInfo,
        ...reduxEmployeeGroupInfo[0]
    };


    const handleDelete = async (e) => {
        console.log("info : idforform", idForForm);
        if (idForForm) {
            if (!employeeInfo.resignationDate) {
                alert("퇴사일을 입력해주세요.");
                return;
            }

            if (employeeInfo.transferredYn && !employeeInfo.leftDate) {
                alert("부서이동일을 입력해주세요.");
                return;
            }

            try {
                await deleteEmployeeMgmt(employeeInfo.id, employeeInfo);
                alert("회사 데이터가 삭제되었습니다.");
                window.location.reload();
                dispatch(employeeActions.hideForm());
            } catch (error) {
                console.error("Error deleting employee data:", error);
            }
        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(employeeActions.hideForm());
            window.location.reload();
        }
    };




    const handleUpdate = async (e) => {
        if (idForForm) {
            try {
                // await modifyCompanyMgmt(employeeInfo);
                alert("사원 데이터가 수정되었습니다.");
                dispatch(employeeActions.hideForm());
                window.location.reload();
            } catch (error) {
                console.error("Error updating employee data:", error);
            }



        } else {
            try {
                await addEmployeeMgmt(employeeInfo);

                alert("사원 데이터가 저장되었습니다.");
                dispatch(employeeActions.hideForm());
                window.location.reload();
            } catch (error) {
                alert("이미 가입된 사원 입니다.");
            }
        }
    };




    const handleSubmit = async (e) => {




        console.log("employee", employeeInfo.transferredYn);
        const requiredFields = [
            'name', 'empIdNum', 'gender',
            'accountYn', 'loginId', 'loginPw',
            'privEmail', 'mobileNumber',
            'address', 'joinDate', 'compId',
            'position'
        ]; // 필수 입력 필드 목록



        if (employeeInfo.position !== "대표") {
            requiredFields.push('transferredYn', 'edjoinDate', 'deptId');
            if (employeeInfo.transferredYn === true) {
                requiredFields.push('leftDate');
            }
        }



        const missingFields = [];
        requiredFields.forEach((field) => {
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


        if (!employeeInfo.privEmail.includes('@')) {
            console.log('privEmail:', employeeInfo.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }
        if (employeeInfo.empIdNum.length !== 14 || !employeeInfo.empIdNum.includes('-')) {
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
