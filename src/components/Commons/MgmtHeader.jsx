// CommonHeader.js
import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { FiMonitor } from "react-icons/fi";
import { GoVideo, GoChecklist } from "react-icons/go";
import { AiOutlineQuestionCircle, AiOutlineStar } from "react-icons/ai"
import { FavorApi } from '../../api/menu';


export default function MgmtHeader({ title, extraButtonComponents , pageId}) {
    const [favor, setFavor] = useState(false); // 초기 상태는 false (즐겨찾기 비활성화)로 설정

    // useEffect(() => {
    //     // 컴포넌트가 마운트될 때 즐겨찾기 상태를 불러옴
    //     FavorApi(pageId, 'load').then(response => {
    //         // API 응답에서 즐겨찾기 상태를 추출하고 state를 업데이트
    //         // 응답 형식에 따라 아래 코드를 적절히 수정해야 합니다.
    //         setFavor(response.data[0].data === 'true');
    //     });
    // }, [pageId]);

    const handleFavoriteToggle = () => {
        // 현재 즐겨찾기 상태의 반대 값을 API에 전송
        FavorApi(pageId, !favor).then(() => {
            // API 호출 후 state를 업데이트
            setFavor(!favor);
        });
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
                <Icon onClick={handleFavoriteToggle}>
                        <AiOutlineStar color={favor ? "gold" : "gray"} />
                    </Icon>            </FavArea>
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

