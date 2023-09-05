import { employeeActions, hideForm } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";

import MgmtInfo from "../Commons/MgmtInfo";



export default function CompanyMgmtInfo({ handleSubmit, isCodeDisabled, idForForm,formData }) {
    const dispatch = useDispatch();
    // const getReduxForm = useSelector(state => state.companyMgmt.info);

    // const handleDelete = async (e) => {
    //     if (isCodeDisabled) {
    //         try {
    //             console.log("getReduxForm:", getReduxForm);
    //            await axiosInstance.put(`/companies/del/${codeForForm}`,{...getReduxForm});
    //            alert("회사 데이터가 삭제되었습니다.");
    //            window.location.reload();
    //             dispatch(hideForm());
    //             } catch (error) {
    //               console.error("Error fetching company data:", error);
    //             }

    //     } else {
    //         alert("작성중이던 내용이 삭제되었습니다.");
    //         dispatch(hideForm());
    //         window.location.reload();
    //     }
    // };

    return (
        <MgmtInfo title="상세"  $noborder="true" hideFormAction={employeeActions.hideForm}>
            
            </MgmtInfo>
    );
}
// onSubmit={handleSubmit} onDelete={handleDelete}