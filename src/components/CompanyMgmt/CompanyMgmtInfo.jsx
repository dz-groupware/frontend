import { useDispatch, useSelector } from "react-redux";
import MgmtInfo from "../Commons/MgmtInfo";
import { companyActions } from "../../utils/Slice";
import { deleteCompanyMgmt } from "../../api/companymgmt";
import React, { useEffect, useState } from 'react';




export default function CompanyMgmtInfo({ handleSubmit, isCodeDisabled,idForForm,pageId}) {
    const dispatch = useDispatch();
    const getReduxForm = useSelector(state => state.companyMgmt.companyInfo);
    const loginCompanyId = useSelector(state => state.companyMgmt.loginCompanyId);
    const [isDataSame, setIsDataSame] = useState(false);
    


    useEffect(() => {
        console.log("idForForm",idForForm);
        console.log("loginCompanyId",loginCompanyId);
        if (idForForm && loginCompanyId) {
            // 예를 들어, id를 기준으로 비교합니다. 실제로는 더 복잡한 객체 비교가 필요할 수 있습니다.
            const isSame = idForForm === loginCompanyId;

            setIsDataSame(isSame);
        console.log("isDataSame",isDataSame);
            
        }
    }, [idForForm, loginCompanyId]);




    const handleDelete = async (e) => {
        if (isCodeDisabled) {
            try {
               await deleteCompanyMgmt(idForForm, {...getReduxForm},pageId);
              
               alert("회사 데이터가 삭제되었습니다.");
               window.location.reload();
               dispatch(companyActions.hideForm());
            } catch (error) {
               console.error("Error deleting company data:", error);
            }
        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(companyActions.hideForm());
            window.location.reload();
        }
    };

    return (
        <MgmtInfo title="기본" isCompanyMgmt={true} onSubmit={handleSubmit} onDelete={handleDelete} idForForm={idForForm} hideFormAction={companyActions.hideForm} >
            
            </MgmtInfo>
    );
}
