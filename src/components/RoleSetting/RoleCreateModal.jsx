import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { addAuthApi, getCompanyGnbListApi } from '../../api/authgroup';
import { useFetchData } from '../../hooks/useFetchData';
export default function RoleCreateModal({ isOpen, onClose,changeRefresh, setActiveAuthId }) {
  const { data, isLoading, error } = useFetchData(getCompanyGnbListApi);
  const [usage, setUsage] = useState('사용');
  const authNameRef = useRef();

  const handleSubmit = async () => {
    try {
      const data = {
        authName: authNameRef.current.value, 
        enabledYn: usage === '사용' ? true : false
      };

      // 직접 API 호출
    const response = await addAuthApi({ data });
      if(response && response.data) {
        setActiveAuthId(response.data.authId); // 권한의 ID를 반환 받았다고 가정
      }

      changeRefresh();
      onClose(); // 모달 닫기
    } catch (error) {
      throw error;
    }
  };
  


  if (isLoading) return <div>로딩중입니다!...</div>;
  if (error) return <div>{console.log(error)}</div>;
  if (!data) return null;
  return (
    isOpen && (
      <ModalBackground>
        <Modal>
          <CloseButton onClick={onClose}>x</CloseButton>
          <FormWrapper>
            <Label>
              <LabelText>권한명</LabelText>
              <Input type="text" placeholder='권한명을 입력하세요.' ref={authNameRef}/>
            </Label>
            <Label>
              <LabelText>사용 여부</LabelText>
              <div style={{display: 'flex', gap: '2rem', flex: 4}}>
                <label>
                  <Radio type="radio" name="usage" value="사용" defaultChecked onChange={() => setUsage('사용')}/> 사용
                </label>
                <label>
                  <Radio type="radio" name="usage" value="미사용" onChange={() => setUsage('미사용')}/> 미사용
                </label>
              </div>
            </Label>
          </FormWrapper>
          <ButtonWrapper>
            <CreateButton onClick={() => handleSubmit()}> 생성 </CreateButton>
            <CloseModalButton onClick={onClose}> 닫기 </CloseModalButton>
          </ButtonWrapper>
        </Modal>
      </ModalBackground>
    )
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column; /* 변경된 부분: Flex direction 설정 */
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  height: 80%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;
const CloseButton = styled.button`
  position: relative;
  align-self: flex-end;
  margin-right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.5em;
`;

const FormWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  height: 80%;
  overflow-y: auto;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%; /* 이 부분을 추가하여 라벨이 부모 요소의 전체 폭을 차지하도록 합니다. */
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 2rem;
  padding: 5px;
  flex: 4; /* 이 부분을 변경하여 입력 필드가 더 많은 공간을 차지하도록 합니다. */
`;
const LabelText = styled.span`
  flex: 1; /* 이 부분을 추가하여 라벨 텍스트가 적절한 공간을 차지하도록 합니다. */
`;

const ButtonWrapper = styled.div`
  margin-top: auto; /* 변경된 부분: Margin-top을 auto로 설정 */
  display: flex;
  justify-content: space-between;
  padding: 10px 0; /* 변경된 부분: Padding 추가 */
`;

const ButtonBase = styled.button`
  width: 48%; 
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  bottom: 0;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  transition: all 0.2s ease-in;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CreateButton = styled(ButtonBase)`
  background-color: #0064f9;
  color: #f0f0f0;
  &:hover {
    background-color: #5398FF;
  }
`;

const CloseModalButton = styled(ButtonBase)`
`;

const Radio = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 8px; /* 추가된 부분: 라디오 버튼과 라벨 텍스트 사이에 간격 추가 */
`;
