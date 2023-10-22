import styled from "styled-components";

export default function ErrNetwork(){
  return(
    <Content>
      <h1>서버와 연결이 끊겼습니다.</h1>
      <img src="/img/page/net_error.gif" alt="net_error"/>
    </Content>
  )
}

const Content = styled.div`
  background-color: rgb(252, 252, 252);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;

  > h1 {
    font-size: xx-large;
    margin: 100px;
  }

  > img {
    padding: 60px 60px 0 60px;
    width: 100%;
    height: auto;
    max-width: 640px;
  }
`;
