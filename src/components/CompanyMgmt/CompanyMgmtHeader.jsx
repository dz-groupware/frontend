import React, { useState } from 'react'; // useState를 추가로 import
import styled from "styled-components";
import { FiMonitor } from "react-icons/fi";
import { GoVideo, GoChecklist } from "react-icons/go";
import { AiOutlineQuestionCircle, AiOutlineStar } from "react-icons/ai"

export default function CompanyMgmtHeader() {
    const [isStarClicked, setIsStarClicked] = useState(false); // 상태 관리를 위한 state와 setter 함수

    const handleStarClick = () => {
        setIsStarClicked(prev => !prev); // 현재 상태를 반대로 설정
    };

    return (
        <div>
            <Container>
                <Leftdiv>
                    <span style={{ fontSize:'15px', fontWeight:'900', margin: '10px' }}>회사관리</span>
                    <FiMonitor style={{ margin: '10px' }} />
                    <GoVideo style={{ margin: '10px' }}/>
                </Leftdiv>
                <Rightdiv>
                    <AiOutlineQuestionCircle style={{ margin: '10px' }} />
                    <GoChecklist style={{ margin: '10px' }}/>
                    <AiOutlineStar 
                        style={{ 
                            margin: '10px', 
                            color: isStarClicked ? 'yellow' : 'inherit' // isStarClicked가 true면 노란색, 아니면 기본 색상
                        }} 
                        onClick={handleStarClick} // 클릭 이벤트 핸들러 추가
                    />
                </Rightdiv>
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

const Leftdiv = styled.div`
    display: flex;
   
`;

const Rightdiv = styled.div`
    display: flex;
    
`;