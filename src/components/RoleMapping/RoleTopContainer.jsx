import React, { useEffect } from 'react'
import ActionButton from '../Commons/ActionButton'
import { MdDisplaySettings, MdOutlineMapsUgc, MdSmartDisplay } from 'react-icons/md'
import styled from 'styled-components';

export default function RoleTopContainer({activeEmp, isEditMode, handleSaveClick, handleEditModeClick, handleChangeMasterClick, setIsEditMode,refresh }) {
  return (
    <TopContainer>
      <TitleAndIconContainer>
          <h1>권한설정</h1>
          <IconWrapper>
            <MdDisplaySettings fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdSmartDisplay fontSize={20} color='#939393'/>
          </IconWrapper>
          <IconWrapper>
            <MdOutlineMapsUgc fontSize={20} color='#939393'/>
          </IconWrapper>
        </TitleAndIconContainer>
        <div>
          {activeEmp.id && (
            <>
              {activeEmp.masterYn ? (
                <ActionButton 
                  height={'2.5rem'}
                  fontWeight={600} 
                  fontSize={'1.0rem'} 
                  name="마스터해제"
                  onClick={handleChangeMasterClick} 
                />
              ) : (
                <>
                  <ActionButton 
                    width={'5rem'}
                    height={'2.5rem'}
                    fontWeight={600} 
                    fontSize={'1.0rem'} 
                    name={isEditMode ? "저장":"권한부여"}
                    onClick={() => isEditMode ? handleSaveClick() : handleEditModeClick()}
                  />
                  {!isEditMode && <ActionButton 
                    height={'2.5rem'}
                    fontWeight={600} 
                    fontSize={'1.0rem'} 
                    name="마스터부여"
                    onClick={handleChangeMasterClick} // 마스터 권한을 부여하는 함수
                  />}
                </>
              )}
            </>
          )}
          {activeEmp.id && isEditMode &&(        
            <ActionButton 
              width={'5rem'}
              height={'2.5rem'}
              fontWeight={600} 
              fontSize={'1.0rem'} 
              name="닫기"
              onClick={() => setIsEditMode(false)}
            />)
          }
        </div>
    </TopContainer>
  )
}


const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 0.5rem;
`;
const TitleAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  h1{
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  position: relative;
  bottom: 5px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
`;