import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { hideForm } from "../../App";
import { useDispatch } from "react-redux";
import { useState } from "react";



export default function CompanyMgmtInfo({ handleSubmit, initialData  }) {
    const dispatch = useDispatch();
    const [isFromDB, setIsFromDB] = useState(!!initialData);  // initialData가 있으면 true, 없으면 false
    const handleDelete = () => {
        if (isFromDB) {
             // API 호출을 통해 해당 데이터의 isDeleted 필드를 true로 설정합니다.
        // 예: axios.post('/api/company/delete', { id: data.id });
        // 이 API는 데이터를 삭제하는 대신 isDeleted를 true로 설정해야 합니다.
        } else {
            alert("작성중이던 내용이 삭제되었습니다.");
            dispatch(hideForm());
        }
    };

    return (
        <Container>
            <Leftdiv>
                <span><BsDot />기본정보</span>
            </Leftdiv>
            <Rightdiv>
                <StyledButton onClick={handleSubmit} type="button">저장</StyledButton>

                <StyledButton onClick={handleDelete}>삭제</StyledButton>
                <RxCross1 style = {{cursor : "pointer"}} onClick={() => dispatch(hideForm())} />
            </Rightdiv>
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

const Leftdiv = styled.div`
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

const Rightdiv = styled.div`
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