import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { hideForm } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";



export default function CompanyMgmtInfo({ handleSubmit, isCodeDisabled, codeForForm,formData }) {
    const dispatch = useDispatch();
    const getReduxForm = useSelector(state => state.company.info);

    const handleDelete = async (e) => {
        if (isCodeDisabled) {
            try {
                console.log("getReduxForm:", getReduxForm);
               await axiosInstance.put(`/api/v1/companies/del/${codeForForm}`,{...getReduxForm});
               alert("회사 데이터가 삭제되었습니다.");
               window.location.reload();
                dispatch(hideForm());
                } catch (error) {
                  console.error("Error fetching company data:", error);
                }

        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(hideForm());
            window.location.reload();
        }
    };

    return (
        <Container>
            <InfoArea>
                <span><BsDot />기본정보</span>
            </InfoArea>
            <ButtonArea>
                <StyledButton onClick={handleSubmit} type="button">저장</StyledButton>

                <StyledButton onClick={handleDelete}>삭제</StyledButton>
                <RxCross1 style = {{cursor : "pointer"}} onClick={() => dispatch(hideForm())} />
            </ButtonArea>
        </Container>
    );
}



const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid black;
    width: 100%;
    margin: 0 auto;
    height: 40px;
`;

const InfoArea = styled.div`
    display: flex;
    & > span {
        font-size: 15px;
        font-weight: 900;
        margin: 5px;
    }
    & > svg {
        margin: 5px;
    }
`;

const ButtonArea = styled.div`
    display: flex;
    align-items:center;
`;

const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-weight: 600;
  background: linear-gradient(to bottom, #ffffff,#ffffff,#e4e4e4); 
  padding: 5px;
  margin: 5px;
  border: 1px solid #C9C9C9;
  border-radius: 5px;

`