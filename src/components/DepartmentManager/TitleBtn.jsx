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
margin-top: 10px;
> * {
  margin: 5px;
}
> div > svg {
  margin: 5px 10px 0 0;
  width: 20px;
  height: 30px;
  width: 30px;
  /* color: rgb(255,231,147); */
  color: rgb(252,214,80);
}
`;

const Pipe = styled.div`
width: 2px;
height: 60%;
background-color: #1d2437;
margin: 10px 0 0 0;
`;