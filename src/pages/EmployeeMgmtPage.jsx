import MgmtMain from '../components/Commons/MgmtMain';
import EmployeeMgmtHeader from '../components/EmployeeMgmt/EmployeeMgmtHeadr'
import EmployeeMgmtNav from '../components/EmployeeMgmt/EmployeeMgmtNav';
import EmployeeMgmtForm from '../components/EmployeeMgmt/EmployeeMgmtForm';
import EmployeeMgmtAside from '../components/EmployeeMgmt/EmployeeMgmtAside';
import PageContainer from '../components/Commons/PageContainer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { employeeActions } from '../utils/Slice';



export default function EmployeeMgmtPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 상태 초기화 로직
    dispatch(employeeActions.resetState());
  }, []);
    return (
      <PageContainer children={
        <>
        <EmployeeMgmtHeader/>
        <EmployeeMgmtNav/>
      <MgmtMain aside={<EmployeeMgmtAside />} form={<EmployeeMgmtForm />} />
      
      </>
    }>
    </PageContainer>
    );
  }