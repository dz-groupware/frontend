import MgmtMain from '../components/Commons/MgmtMain';
import EmployeeMgmtHeader from '../components/EmployeeMgmt/EmployeeMgmtHeader'
import EmployeeMgmtNav from '../components/EmployeeMgmt/EmployeeMgmtNav';
import EmployeeMgmtForm from '../components/EmployeeMgmt/EmployeeMgmtForm';
import EmployeeMgmtAside from '../components/EmployeeMgmt/EmployeeMgmtAside';
import PageContainer from '../components/Commons/PageContainer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { employeeActions } from '../utils/Slice';

export default function EmployeeMgmtPage({menuId}) {
  const dispatch = useDispatch();
  useEffect(() => {

    
    // 컴포넌트가 unmount 될 때 상태를 초기화하려면, useEffect의 클린업 함수를 사용합니다.
    return () => {
      dispatch(employeeActions.resetState());
    };
  }, []);
 
    return (
      <PageContainer children={
        <>
        <EmployeeMgmtHeader/>
        <EmployeeMgmtNav menuId={menuId}/>
      <MgmtMain aside={<EmployeeMgmtAside menuId={menuId} />} form={<EmployeeMgmtForm menuId={menuId} />} />
      
      </>
    }>
    </PageContainer>
    );
  }