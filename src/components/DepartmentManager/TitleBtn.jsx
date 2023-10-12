import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ButtonTitle } from '../../common/styles/Button';

export default function TitleBtn({ favor, handleFavor, detail, setDetail, disabled }){
  return(
    <BtnContent>
      <ButtonTitle className={`${disabled ? 'disabled' : 'able'}`} onClick={() => {setDetail({...detail, id: 0, state:'add'})}}>추가</ButtonTitle>
      <div><Pipe /></div>
      <div onClick={handleFavor}>{favor === true ? <AiFillStar /> : <AiOutlineStar/>}</div>
    </BtnContent>
  );
};

const BtnContent = styled.div`
display: flex;
> * {
  font-size: 14px;
  margin: 10px 5px 5px 5px;
}
> div > svg {
  margin: 0 5px 0 0;
  padding: 0 5px 0 0;
  width: 25px;
  height: 25px;
  color: rgb(252,214,80);
}
`;

const Pipe = styled.div`
width: 2px;
height: 80%;
background-color: #1d2437;
margin: 3px 0 0 5px;
`;