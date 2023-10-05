import { useDispatch, useSelector } from "react-redux";
import MgmtInfo from "../Commons/MgmtInfo";
import { companyActions } from "../../utils/Slice";
import { deleteCompanyMgmt } from "../../api/companymgmt";



export default function CompanyMgmtInfo({ handleSubmit, isCodeDisabled, idForForm,pageId}) {
    const dispatch = useDispatch();
    const getReduxForm = useSelector(state => state.companyMgmt.companyInfo);
    const handleDelete = async (e) => {
        if (isCodeDisabled) {
            console.log("ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ",pageId)
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
        <MgmtInfo title="기본" onSubmit={handleSubmit} onDelete={handleDelete} hideFormAction={companyActions.hideForm}>
            
            </MgmtInfo>
    );
}
