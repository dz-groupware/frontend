import styled from 'styled-components';
import { ButtonBright, ButtonBlue } from '../../common/styles/Button';

export default function DetailTitle ({ detail, setDetail, disabled }){
  return(
    <>
      {detail.type && 
      <>
      <TitleContent>
        <p>상세정보</p> {disabled && (<div style={{color: '#fa7f33', paddingTop: '5px'}}> 다른 회사의 정보는 변경할 수 없습니다.</div>)}
        <ButtonArea >
          <ButtonBlue className={`${disabled ? 'disabled' : 'able'}`} onClick={() => setDetail({...detail, state: 'save', isChanging: detail.state})}>저장</ButtonBlue> 
          <ButtonBright className={`${disabled ? 'disabled' : 'able'}`} onClick={() => setDetail({...detail, state: 'delete', isChanging: detail.state})}>삭제</ButtonBright> 
          <Pipe />
          <span onClick={() => setDetail({...detail, id:'', type: false, state: false, save: false})}>X</span>
        </ButtonArea> 
      </TitleContent>
      
      <DetailType>
        <div className={detail.type === 'basic' ? 'on' : 'off'} 
        onClick={() => setDetail({...detail, type: 'basic'})}>기본 정보</div>
        <span>|</span>
        <div className={detail.type === 'emp'  ? 'on' : 'off'} 
        onClick={() => setDetail({...detail, type: 'emp'})}>부서원 정보</div>
      </DetailType>
      </>
      }
    </>
  );
};

const TitleContent = styled.div`
color: #1d2437;
display: flex;
justify-content: space-between;
font-size: large;
font-weight: bold;
width: 100%;
height: 35px;
border-bottom: 2px solid #242080;
> p {
  margin : 10px 0 0 15px;
  display: flex;
}
`;
const DetailType = styled.div`
display: flex;
width: 100%;
border-bottom: 2px solid #1d2437;;
margin-bottom: 10px;
font-size: large;
font-weight: bold;
height: 40px;
& .on {
  height: 35px;
  color: #318dfc;
  border-bottom: 3px solid #318dfc;
}
& .off {
  color: #1d2437;
}
> div {
  margin: 5px 5px 5px 10px;
  display: flex;
  padding : 10px;
}
> span{
  padding-top: 10px;
}
`;
const ButtonArea = styled.div`
display: flex;
height: 35px;
> * {
  margin: 0 5px 5px 5px;
}
> span {
  padding: 5px;
}
> .disabled {
  pointer-events: none;
  opacity: 0.5;
}

`;
const Pipe = styled.div`
width: 2px;
height: 60%;
background-color: #1d2437;
margin: 5px 0 5px 10px;
`;