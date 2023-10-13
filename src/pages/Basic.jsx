import { useEffect } from 'react';
import styled from 'styled-components';
import {test} from '../api/menu';
export default function Basic() {
  useEffect(() => {
    // console.log('이거 실행됨')
    // test();
  }, []);
  return(
    <Content>
      <img src='/img/page/basic.gif' alt='animation'/>
      <h1><div>빈페이지 입니다</div></h1>
    </Content>
  )
}

const Content = styled.div`
background-color: rgb(252,252,252);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
  > img {
    padding: 60px 60px 0 60px;
    width: 100%;
    height: 100%;
    max-width: 640px;
    height: auto;
  }
  > h1 {
    position: relative;
    top: -80px;
  }
`;