import styled from "styled-components";
import { AiOutlineInfoCircle } from 'react-icons/ai';


export default function NotificationInfo({ children }) {
    if (!children) {
        return null; // 아무 것도 렌더링하지 않음
    }


    return (


        <StyledNotificationInfo>

            <AiOutlineInfoCircle />&nbsp; {children}

        </StyledNotificationInfo>
    );
}





export const StyledNotificationInfo = styled.div`
display: flex;
justify-content: left;
align-items: center;
margin: 10px;
padding: 10px;
width: 97%;
background-color: rgb(214,236,248);
border: 1px solid rgb(146,183,214);
border-radius: 5px;
color: black;
height: 20px;
font-weight: 500;
font-size: 14px;
  
`;