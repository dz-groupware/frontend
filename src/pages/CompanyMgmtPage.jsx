import CompanyMgmtNav from "../components/CompanyMgmt/CompanyMgmtNav";
import CompanyMgmtHeader from "../components/CompanyMgmt/CompanyMgmtHeader"
import MgmtMain from "../components/Commons/MgmtMain";
import CompanyMgmtAside from "../components/CompanyMgmt/CompanyMgmtAside";
import CompanyMgmtForm from "../components/CompanyMgmt/CompanyMgmtForm";
import PageContainer from "../components/Commons/PageContainer";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { companyActions } from "../utils/Slice";

export default function CompanyMgmtPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 상태 초기화 로직
    dispatch(companyActions.resetState());
  }, []);
  
  return (
    <PageContainer children={
      <>
        <CompanyMgmtHeader/>
        <CompanyMgmtNav/>
        <MgmtMain aside={<CompanyMgmtAside />} form={<CompanyMgmtForm />} />
      </>
    }>
    </PageContainer>
  );
}