import styled from 'styled-components';

export default function Main() {
  return (
    <MainArea id="Main">
        <img src="/img/main_bgi.png" alt="bgiMain" />
    </MainArea>
  );
}

const MainArea = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: -80px;
  }
`;
