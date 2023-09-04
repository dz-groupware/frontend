import { styled } from 'styled-components';
import MgmtHeader from '../Commons/MgmtHeader';
import StyledButton from '../Commons/StyledButton';
import NotificationInfo from '../Commons/NotificationInfo';


export default function EmployeeMgmtHeader() {
  return (
    <div>
      <MgmtHeader title="사원" extraButtonComponents={
        <ButtonArea>
          <StyledButton>ID변경</StyledButton>
          <StyledButton>비밀번호 초기화</StyledButton>
          <StyledButton>입사처리</StyledButton>
          <StyledButton>퇴사처리</StyledButton>
          <StyledButton>변경이력</StyledButton>
          <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '0px', marginRight: '-5px' }} />
        </ButtonArea>
      } />
      <NotificationInfo>
        사원이 추가 될 경우 알림이 갑니다.
      </NotificationInfo>
    </div >
  );
}

const ButtonArea = styled.div`
  display:flex;
  justify-content: center;
  align-items : center;

`;


