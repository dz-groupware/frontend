import { styled } from 'styled-components';
import MgmtHeader from '../Commons/MgmtHeader';
import StyledButton from '../Commons/StyledButton';
import NotificationInfo from '../Commons/NotificationInfo';
import { employeeActions } from '../../utils/Slice';
import { useDispatch, useSelector } from 'react-redux';


export default function EmployeeMgmtHeader() {
  const dispatch = useDispatch();
  const basicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);

  const handleHireProcess = async () => {
    dispatch(employeeActions.resetState())
    dispatch(employeeActions.hideForm())
    console.log("hide");
    
    console.log(" basicInfo ", basicInfo);
    setTimeout(() => {
        dispatch(employeeActions.showForm());
      },50);
    
  }



  return (
    <div>
      <MgmtHeader title="사원" extraButtonComponents={
        <ButtonArea>
          <StyledButton>ID변경</StyledButton>
          <StyledButton>비밀번호 초기화</StyledButton>
          <StyledButton onClick={handleHireProcess}>입사처리</StyledButton>
          <StyledButton>퇴사처리</StyledButton>
          <StyledButton>변경이력</StyledButton>
          <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '0px', marginRight: '-5px' }} />
        </ButtonArea>
      } />
      <NotificationArea>
        <NotificationInfo>
          사원이 추가 될 경우 알림이 갑니다.
        </NotificationInfo>
      </NotificationArea>
    </div >
  );
}

const ButtonArea = styled.div`
  display:flex;
  justify-content: center;
  align-items : center;

`;

const NotificationArea = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  margin-top : 10px;
`

