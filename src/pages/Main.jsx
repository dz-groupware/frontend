import styled from 'styled-components';

export default function Main() {
  return (
    <MainArea id="Main">
        <img src="/img/main_bgi.png" alt="bgiMain" draggable="false"  />
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
    width: calc(100% + 150px);
    height: calc(100% + 120px);
    object-fit: cover;
    top: -120px;
    right: 0px;
  }
`;
