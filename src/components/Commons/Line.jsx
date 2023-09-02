import React from 'react'
import { styled } from 'styled-components';

export default function Line(props) {
  return (
    <Container $color={props.color} $height={props.height} $top={props.top} $bottom={props.bottom}>
    </Container>
  )
}
const Container = styled.div`
  position: relative;
  width: 100%; // 부모 컴포넌트의 가로 크기만큼 차지
  margin-top: ${props => props.$top || "0px"};
  margin-bottom: ${props => props.$bottom || "0px"};
  height: ${props => props.$height || "1px"};
  background-color: ${props => props.$color || "#C9C9C9"};// 선의 색상을 검은색으로 설정
`;