import styled from 'styled-components';

import DetailBasic from './DetailBasic';
import { useState } from 'react';


export default function TmpSaveModal({ modalOff, form, pageId }) {
  const initDetail = {
    type: false,
    id: '',
    state: false,
    save: false,
    isChanging: false,
  }
  const [detail, setDetail] = useState(initDetail);
  // 이건 임시저장용 noti (수정 중이고, detail.state가 바뀌면 alert를 띄움).
  // detail은 여기 detail인데 흠..

  const handleSaveAll = () => {
    // form
  }

  return(
    <ModalBackdrop onClick={modalOff}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
        <div>
          모든 상세 정보 수정 완료를 눌러 주세요 
        </div>
        {form.length === 0 ? <div>임시저장 중인 데이터가 없습니다 </div> :
          form.map((a, i) => (
            <>
            <div>
              <div>삭제</div><div>수정완료</div>
            </div>
            <DetailBasic data={a} detail={detail} setDetail={setDetail} pageId={pageId} />
            </>
          ))
        }
        <div>
          <div onClick={handleSaveAll}>확인</div><div onClick={modalOff}>취소</div>
        </div>
      </OrgModalView>
    </ModalBackdrop>
  )
}

function useValid(form){
  const initValid = {
    code: false,
    name: false,
    abbr: false,
  }
  const [validText, setText] = useState(initValid);
  const [isValid, setValid] = useState(initValid);

  const validate = () => {
    const codeExp = /^[A-Za-z0-9]{1,8}$/;
    const nameExp = /^[A-Za-z0-9\d가-힣/]{1,10}$/;
    const abbrExp = /^[A-Z0-9]{1,6}$/;

    const codeIsValid = codeExp.test(form.code);
    const nameIsValid = nameExp.test(form.name);
    const abbrIsValid = abbrExp.test(form.abbr);

    setValid({
      code : codeIsValid,
      name : nameIsValid,
      abbr : abbrIsValid,
    });

    setText({
      code : codeIsValid ? '' : '8자리 이하 :: 영어 대/소문자',
      name : nameIsValid ? '' : '10잘자리 이하 :: / 제외 특수문자 불가',
      abbr : abbrIsValid ? '' : '6자리 이하 :: 영어 대/소문자',
    });

    return {isValid : codeIsValid && nameIsValid && abbrIsValid};
  }
  return { validText, isValid, validate };
}

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;
export const OrgModalView = styled.div`  
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:0px;
  right:0px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 1000px;
  height: 550px;
  color: black;
  background-color: #ffffff;
  padding: 20px;

  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }

  > #nav {
    display: flex;
    justify-content: space-between;
    width: 100%;

    > h3 {
      font-size: x-large;
      font-weight: bold;
    }

    > div {
      font-size: x-large;
      font-weight: bold;
    }
  }

  > div > span {
    position : right;
  }
  

  > div > #search {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid gray;  
    margin-top: 20px;
    margin-bottom: 10px;
    height: 50px;

    > div {
      > select {
        width: 200px;
        height: 25px;
        margin: 10px;
      }
  
      > input {
        height: 25px;
        width: 600px;
        margin: 10px;
      }
    }

    > svg {
      width: 25px;
      height: 25px;
      border: 1px solid gray;
      border-radius: 5px;
      margin: 10px;
      padding: 5px;
    }
}

  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;


  }
`;