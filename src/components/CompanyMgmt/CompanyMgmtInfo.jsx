import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";

import MgmtInfo from "../Commons/MgmtInfo";
import { companyActions } from "../../utils/Slice";



export default function CompanyMgmtInfo({ handleSubmit, isCodeDisabled, idForForm,formData }) {
    const dispatch = useDispatch();
    const getReduxForm = useSelector(state => state.companyMgmt.companyInfo);

    const handleDelete = async (e) => {
        if (isCodeDisabled) {
            try {
               await axiosInstance.delete(`/companies/${idForForm}`,{...getReduxForm});
              
               alert("회사 데이터가 삭제되었습니다.");
               window.location.reload();
                dispatch(companyActions.hideForm());
                } catch (error) {
                  console.error("Error fetching company data:", error);
                }

        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(companyActions.hideForm());
            window.location.reload();
        }
    };

    return (
        <MgmtInfo title="기본" onSubmit={handleSubmit} onDelete={handleDelete} hideFormAction={companyActions.hideForm}>
            
            </MgmtInfo>
    );
}
