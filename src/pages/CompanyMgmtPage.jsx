import CompanyMgmtNav from "../components/CompanyMgmt/CompanyMgmtNav";
import CompanyMgmtHeader from "../components/CompanyMgmt/CompanyMgmtHeader"
import MgmtMain from "../components/Commons/MgmtMain";
import CompanyMgmtAside from "../components/CompanyMgmt/CompanyMgmtAside";
import CompanyMgmtForm from "../components/CompanyMgmt/CompanyMgmtForm";
import { styled } from "styled-components";
import PageContainer from "../components/Commons/PageContainer";

export default function CompanyMgmtPage() {
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