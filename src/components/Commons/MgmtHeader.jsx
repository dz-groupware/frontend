// CommonHeader.js
import React, { useState } from 'react';
import styled from "styled-components";
import { FiMonitor } from "react-icons/fi";
import { GoVideo, GoChecklist } from "react-icons/go";
import { AiOutlineQuestionCircle, AiOutlineStar } from "react-icons/ai"

export default function MgmtHeader({ title, extraButtonComponents }) {
    const [isStarClicked, setIsStarClicked] = useState(false);

    const handleStarClick = () => {
        setIsStarClicked(prev => !prev);
    };

    return (
        <div>
        <Container>
            <MgmtNameArea>
                <Title>{title}관리</Title>
                <Icon><FiMonitor /></Icon>
                <Icon><GoVideo /></Icon>
            </MgmtNameArea>
            
            <FavArea>
                <ButtonArea>
                    {extraButtonComponents}
                </ButtonArea>
                <Icon><AiOutlineQuestionCircle /></Icon>
                <Icon><GoChecklist /></Icon>
                {isStarClicked ? <YellowStarIcon onClick={handleStarClick} /> : <NormalStarIcon onClick={handleStarClick} />}
            </FavArea>
        </Container>
    </div>
    );
}
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom : 2px solid black;
    margin-left: 10px;
    margin-right:10px;
    
`;

const MgmtNameArea = styled.div`
    display: flex;
   
`;

const FavArea = styled.div`
    display: flex;
    
`;
const ButtonArea = styled.div`
    display:flex;
`
const Title = styled.span`
  font-size: 15px;
  font-weight: 900;
  margin: 10px;
`;

const Icon = styled.div`
  margin: 10px;
`;

const YellowStarIcon = styled(AiOutlineStar)`
  margin: 10px;
  color: yellow;
`;

const NormalStarIcon = styled(AiOutlineStar)`
  margin: 10px;
`;