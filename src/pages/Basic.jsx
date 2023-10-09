import styled from 'styled-components';

export default function Basic() {
  return(
    <Content>
      <img src='/img/empty_page.gif' alt='animation' />
      <h1>빈페이지 입니다</h1>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh; 
  > img {
    width: 200px;
    height: 200px;
  }
`;