import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";
import React, { useEffect, useState } from 'react';

import MgmtInfo from "../Commons/MgmtInfo";
import { employeeActions } from "../../utils/Slice";



export default function EmployeeMgmtInfo({ isCodeDisabled, idForForm, formData }) {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    const reduxEmployeeGroupInfo = useSelector(state => state.employeeMgmt.employeeGroupInfo);
    const [basicInfo, basicSetInfo] = useState(reduxEmployeeBasicInfo);
    const [groupInfo, groupSetInfo] = useState(reduxEmployeeGroupInfo);
    const activeTab = useSelector(state => state.employeeMgmt.activeTab);

    

    useEffect(() => {
        basicSetInfo(reduxEmployeeBasicInfo);
        console.log("reduxEmployeeBasicInfo:", reduxEmployeeBasicInfo);
    }, [reduxEmployeeBasicInfo]);

    const handleDelete = async (e) => {
        if (isCodeDisabled) {
            try {
                //    await deleteEmployeeMgmt(idForForm, {...getReduxForm});

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
                // await modifyCompanyMgmt(basicInfo);
                alert("사원 데이터가 수정되었습니다.");
                dispatch(employeeActions.hideForm());
                window.location.reload();
            } catch (error) {
                console.error("Error updating company data:", error);
            }



        } else {
            try {
                // await addCompanyMgmt(basicInfo);
                alert("사원 데이터가 저장되었습니다.");
                dispatch(employeeActions.hideForm());
                window.location.reload();
            } catch (error) {
                console.error("Error adding company data:", error);
            }
        }
    };




    const handleBasicSubmit = async (e) => {
        const requiredFields = [
            'name', 'IdNum', 'gender',
            'accountYn', 'loginId', 'loginPw',
            'privEmail', 'mobileNumber',
            'address', 'joinDate'
        ]; // 필수 입력 필드 목록


        const isEmptyField = requiredFields.some(field => {
            const value = basicInfo[field];
            if (field === "accountYn") {
                return value !== true && value !== false;
            }
            return !value || value === 'direct' || value === null;
        });


        if (isEmptyField) {
            console.log(basicInfo);
            alert("모든 필드를 채워주세요.");
            console.log('isEmptyField: ', isEmptyField);
            return;
        }

        if (!basicInfo.privEmail.includes('@')) {
            console.log('privEmail:', basicInfo.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }
        if (basicInfo.IdNum.length !== 14 || !basicInfo.IdNum.includes('-')) {
            alert("주민등록번호는 '-'를 포함한 14자리여야 합니다.");
            return;
        }

        const joinDate = new Date(basicInfo.joinDate);
        const resignationDate = basicInfo.resignationDate ? new Date(basicInfo.resignationDate) : null;

        if (resignationDate && joinDate > resignationDate) {
            alert("퇴사일은 입사일 이후의 날짜여야 합니다.");
            return;
        }

    
        dispatch(employeeActions.updateInfo(basicInfo));

        handleUpdate(e);

    };


    const handleGroupSubmit = async (e) => {
        const requiredFields = [
            'name', 'IdNum', 'gender',
            'accountYn', 'loginId', 'loginPw',
            'email', 'privEmail', 'mobileNumber',
            'address', 'joinDate'
        ]; // 필수 입력 필드 목록


        const isEmptyField = requiredFields.some(field => {
            const value = groupInfo[field];
            if (field === "accountYn") {
                return value !== true && value !== false;
            }
            return !value || value === 'direct' || value === null;
        });


        if (isEmptyField) {
            console.log(groupInfo);
            alert("모든 필드를 채워주세요.");
            console.log('isEmptyField: ', isEmptyField);
            return;
        }


        const joinDate = new Date(groupInfo.joinDate);
        const resignationDate = groupInfo.resignationDate ? new Date(groupInfo.resignationDate) : null;

        if (resignationDate && joinDate > resignationDate) {
            alert("부서 이동일은 부서 배정일 이후의 날짜여야 합니다.");
            return;
        }


        dispatch(employeeActions.updateInfo(groupInfo));

        handleUpdate(e);
        console.log(groupInfo);

    };


    const handleSubmit = async (e) => {
        if (activeTab == "basic") {
            handleBasicSubmit(e);

        }
        else {
            handleGroupSubmit(e);
        }
    }

    return (
        <MgmtInfo title="상세" $noborder="true" onSubmit={handleSubmit} onDelete={handleDelete} hideFormAction={employeeActions.hideForm}>

        </MgmtInfo>
    );
}
