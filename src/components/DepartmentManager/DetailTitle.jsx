import styled from 'styled-components';

export default function DetailTitle ({ detail, setDetail }){
  return(
    <>
      {detail.type && 
      <>
      <TitleContent>
        <div>상세정보</div>
        <ButtonArea>
          <button onClick={() => setDetail({...detail, state: 'save', isChanging: detail.state})}>저장</button> 
          <button onClick={() => setDetail({...detail, state: 'delete', isChanging: detail.state})}>삭제</button> 
          <div>|</div>
          <div onClick={() => setDetail({...detail, type: false, state: false, save: false})}>X</div>
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
display: flex;
justify-content: space-between;
font-size: x-large;
font-weight: bold;
width: 100%;
height: 50px;
border-bottom: 2px solid gray;
margin-bottom: 15px;
> div {
  padding: 5px;
  display: flex;
}
`;
const DetailType = styled.div`
display: flex;
width: 100%;
border-bottom: 2px solid gray;
margin-bottom: 10px;
font-size: large;
font-weight: bold;
height: 46px;
& .on {
  color: blue;
  border-bottom: 1px solid blue;
}
& .off {
  color: black;
}
> div {
  display: flex;
  padding : 10px;
}
> span{
  padding-top: 10px;
}
`;
const ButtonArea = styled.div`
> * {
  margin: 5px; 
}
`;