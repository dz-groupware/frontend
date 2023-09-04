// CommonHeader.js
import React, { useState } from 'react';
import styled from "styled-components";
import { FiMonitor } from "react-icons/fi";
import { GoVideo, GoChecklist } from "react-icons/go";
import { AiOutlineQuestionCircle, AiOutlineStar } from "react-icons/ai"

export default function Header({ title, extraButtonComponents }) {
    const [isStarClicked, setIsStarClicked] = useState(false);

    const handleStarClick = () => {
        setIsStarClicked(prev => !prev);
    };

    return (
        <div>
            <Container>
                <MgmtNameArea>
                    <span style={{ fontSize: '15px', fontWeight: '900', margin: '10px' }}>{title}관리</span>
                    <FiMonitor style={{ margin: '10px' }} />
                    <GoVideo style={{ margin: '10px' }} />
                </MgmtNameArea>

                <FavArea>
                    <ButtonArea>
                        {extraButtonComponents}
                    </ButtonArea>
                    <AiOutlineQuestionCircle style={{ margin: '10px' }} />
                    <GoChecklist style={{ margin: '10px' }} />
                    <AiOutlineStar
                        style={{ margin: '10px', color: isStarClicked ? 'yellow' : 'inherit' }}
                        onClick={handleStarClick}
                    />
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