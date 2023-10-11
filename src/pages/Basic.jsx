import styled from 'styled-components';

export default function Basic() {
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
    position: absolute;
    padding: 50% 50% 50% 50%;
    > div {
      color: #72adbc;
      width: 150px;
      height: 300px;
    }
  }
`;