import styled from "styled-components";
import { BsDot } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { ButtonBlue, ButtonBright } from "../Commons/StyledButton";
import { useDispatch } from "react-redux";


export default function MgmtInfo({title, onSubmit,onDelete, noborder,hideFormAction}) {
    const dispatch = useDispatch();

return (
    <Container $noborder={noborder}>
        <InfoArea>
            <span><BsDot />{title}정보</span>
        </InfoArea>
        <ButtonArea>
            <ButtonBlue onClick={onSubmit} type="button">저장</ButtonBlue>

            <ButtonBright onClick={onDelete}>삭제</ButtonBright>
            <RxCross1 style = {{cursor : "pointer", margin: "5px"}} onClick={() => dispatch(hideFormAction())}  />
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

