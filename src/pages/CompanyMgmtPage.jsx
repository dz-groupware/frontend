import CompanyMgmtNav from "../components/CompanyMgmt/CompanyMgmtNav";
import CompanyMgmtHeader from "../components/CompanyMgmt/CompanyMgmtHeader"
import MgmtMain from "../components/Commons/MgmtMain";
import CompanyMgmtAside from "../components/CompanyMgmt/CompanyMgmtAside";
import CompanyMgmtForm from "../components/CompanyMgmt/CompanyMgmtForm";
import PageContainer from "../components/Commons/PageContainer";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { companyActions } from "../utils/Slice";

export default function CompanyMgmtPage({pageId}) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("페이지아이디확인",pageId);
    dispatch(companyActions.resetState());
  }, []);
  
  return (
    <PageContainer children={
      <>
        <CompanyMgmtHeader />
        <CompanyMgmtNav pageId={pageId}/>
        <MgmtMain pageId={pageId} aside={<CompanyMgmtAside pageId={pageId} />} form={<CompanyMgmtForm pageId={pageId} />} />
      </>
    }>
    </PageContainer>
  );
}