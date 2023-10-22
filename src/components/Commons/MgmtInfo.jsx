import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { ButtonBlue, ButtonBright } from "../Commons/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';



export default function MgmtInfo({ isCompanyMgmt, title, onSubmit, onDelete, noborder, hideFormAction, idForForm }) {
    const dispatch = useDispatch();
    const loginCompanyId = useSelector(state => state.companyMgmt.loginCompanyId);
    const companyMgmtId = useSelector(state => state.companyMgmt.companyInfo.id);
    const [isDataSame, setIsDataSame] = useState(false);

    
    useEffect(() => {
        console.log("idForForm", idForForm);
        console.log("loginCompanyId", loginCompanyId);
        console.log("companyMgmtId확인할게요", companyMgmtId);  // companyMgmtId 값도 확인합니다.
    
        if (idForForm && loginCompanyId) {
            // id가 같은지 비교합니다.
            const isSame = idForForm === loginCompanyId;
            setIsDataSame(isSame);
        } else if (!companyMgmtId) {  // companyMgmtId가 undefined 또는 null인 경우
            // 여기서는 companyMgmtId가 없으므로 isDataSame을 true로 설정합니다.
            setIsDataSame(true);
        }
    
        console.log("isDataSame", isDataSame);
    }, [idForForm, loginCompanyId, companyMgmtId]);  // companyMgmtId도 의존성 배열에 추가합니다.
    



    return (
        <Container $noborder={noborder}>
            <InfoArea>
                <span><BsDot />{title}정보</span>
            </InfoArea>
            <ButtonArea>
                {isCompanyMgmt ? (
                    isDataSame ? (
                        <>
                            <ButtonBlue onClick={onSubmit} type="button">저장</ButtonBlue>
                            <ButtonBright onClick={onDelete}>삭제</ButtonBright>
                        </>
                    ) : (
                        <ButtonBlue onClick={onSubmit} type="button">소속회사 수정</ButtonBlue>
                    )
                ) : (
                    isDataSame ? (
                        <>
                            <ButtonBlue onClick={onSubmit} type="button">저장</ButtonBlue>
                            <ButtonBright onClick={onDelete}>삭제</ButtonBright>
                        </>
                    ) : (
                        <>
                            <ButtonBlue onClick={onSubmit} type="button">저장</ButtonBlue>
                            <ButtonBright onClick={onDelete}>삭제</ButtonBright>
                        </>
                    )
                )}
                <RxCross1 style={{ cursor: "pointer", margin: "5px" }} onClick={() => dispatch(hideFormAction())} />
            </ButtonArea>
        </Container>
    );
}



const Container = styled.div`
display: flex;
justify-content: space-between;
border-bottom: ${props => (props.$noborder ? "none" : "2px solid black")};
width: 100%;
margin: 0 auto;
height: 40px;
`;

const InfoArea = styled.div`
display: flex;
& > span {
    font-size: 18px;
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

