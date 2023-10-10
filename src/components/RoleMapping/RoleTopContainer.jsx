import React, { useEffect } from 'react'
import ActionButton from '../Commons/ActionButton'
import styled from 'styled-components';
import MgmtHeader from '../Commons/MgmtHeader';

export default function RoleTopContainer({ activeEmp, isEditMode, handleSaveClick, handleEditModeClick, handleChangeMasterClick, setIsEditMode, refresh, pageId }) {
  return (
    <MgmtHeader title="권한설정" pageId={pageId} extraButtonComponents={
      <ButtonArea>
        {activeEmp.id && (
          <>
            {activeEmp.masterYn ? (
              <ActionButton
                name="마스터해제"
                onClick={handleChangeMasterClick}
              />
            ) : (
              <>
                <ActionButton
                  name={isEditMode ? "저장" : "권한부여"}
                  onClick={() => isEditMode ? handleSaveClick() : handleEditModeClick()}
                />
                {!isEditMode && <ActionButton

                  name="마스터부여"
                  onClick={handleChangeMasterClick} // 마스터 권한을 부여하는 함수
                />}
              </>
            )}
          </>
        )}
        {activeEmp.id && isEditMode && (
          <ActionButton

            name="닫기"
            onClick={() => setIsEditMode(false)}
          />)
        }
        <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '10px', marginRight: '5px' }} />
      </ButtonArea>
    }
    >


    </MgmtHeader>
  )
}


const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;