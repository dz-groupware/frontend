import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ButtonTitle } from '../../common/styles/Button';
import Swal from "sweetalert2";

export default function TitleBtn({ favorOn, handleFavor, detail, setDetail, disabled }){
  return(
    <BtnContent>
      <ButtonTitle 
        className={`${disabled ? 'disabled' : 'able'}`} 
        onClick={() => {
          if (detail.id === 0) {
            Swal.fire({
              title: "이미 새로운 부서를 추가중입니다.",
              text: "새로 작성하시겠습니까? 작성중인 내용은 삭제됩니다.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            }).then((result) => {
              console.log(result);
              if (result.isConfirmed) {
                setDetail({...detail, id: 0});
              };
              if (result.isDismissed) {
                Swal.fire({
                  title: "취소되었습니다",
                });
              };
            });
          }
          setDetail({...detail, id: 0})
        }}
      >
        추가
      </ButtonTitle>
      <div><Pipe /></div>
      <div onClick={handleFavor}>
        {favorOn === true ? 
          <AiFillStar />
          : <AiOutlineStar/>
        }
      </div>
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