import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function TitleBtn({ favor, handleFavor, detail, setDetail }){
  return(
    <BtnContent>
      <button onClick={() => {setDetail({...detail, id: 0, state:'add'})}}>추가</button>
      <div onClick={handleFavor}>{favor === true ? <AiFillStar /> : <AiOutlineStar/>}</div>
    </BtnContent>
  );
};

const BtnContent = styled.div`
display: flex;
margin-top: 5px;
> * {
  height: 30px;
  margin: 5px;
}
> svg {
  margin-top: 10px;
  width: 20px;
  height: 20px;
  color: gray;
}
`;