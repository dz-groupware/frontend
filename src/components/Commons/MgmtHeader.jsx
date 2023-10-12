// CommonHeader.js
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { FiMonitor } from "react-icons/fi";
import { GoVideo, GoChecklist } from "react-icons/go";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { FavorApi } from '../../api/menu';


export default function MgmtHeader({ title, extraButtonComponents, pageId }) {
    const [favor, setFavor] = useState(false); // 초기 상태는 false (즐겨찾기 비활성화)로 설정

    // useEffect(() => {
    //     // 컴포넌트가 마운트될 때 즐겨찾기 상태를 불러옴
    //     FavorApi(pageId, 'load').then(response => {
    //         // API 응답에서 즐겨찾기 상태를 추출하고 state를 업데이트
    //         // 응답 형식에 따라 아래 코드를 적절히 수정해야 합니다.
    //         setFavor(response.data[0].data === 'true');
    //     });
    // }, [pageId]);


    //페이지에서 즐겨찾기 가져오기
    FavorApi(pageId, 'load').then(res => {
        console.log(res.data.data);
        if (res.data.data === 1) {
            console.log('즐겨찾기 on')
            setFavor(true);
        }
        if (res.data.data === 0) {
            console.log('즐겨찾기 off')
            setFavor(false);
        } else {
            console.log('즐겨찾기 에러')
        }
    });

    // 즐겨찾기 추가/삭제 요청
    function handleFavor() {
        FavorApi(pageId, favor).then(res => {
            console.log("favor", favor, " -> ", res.data.data);
            if (res.data.data === 1) {
                setFavor(!favor);
            } else {
                console.log('즐겨찾기 오류 : 강제 off')
                setFavor(false);
            }
        });
    }



    return (
        <div>
            <Container>
                <MgmtNameArea>
                    <Title>{title}</Title>
                </MgmtNameArea>

                <FavArea>
                    <ButtonArea>
                        {extraButtonComponents}
                    </ButtonArea>
                    
                    
                    <Icon>

                        <div onClick={handleFavor}>{favor === true ? <AiFillStar /> : <AiOutlineStar />}</div>

                    </Icon>
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
    height: 50px;
    
`;

const MgmtNameArea = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
 
`;

const FavArea = styled.div`
    display: flex;
`;
const ButtonArea = styled.div`
    display:flex;
`
const Title = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin: 10px;
`;

const Icon = styled.div`
  margin: 10px;
  > div > svg {
    width: 20px;
    height: 30px;
    width: 30px;
    color: rgb(252,214,80);
  }
`;

