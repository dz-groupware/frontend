import CompanyMgmtNav from "../../../../dzproject/frontend/src/components/CompanyMgmt/CompanyMgmtNav";
import CompanyMgmtHeader from "../components/CompanyMgmt/CompanyMgmtHeader"
import MgmtMain from "../components/Commons/MgmtMain";
import CompanyMgmtAside from "../components/CompanyMgmt/CompanyMgmtAside";
import CompanyMgmtForm from "../components/CompanyMgmt/CompanyMgmtForm";



export default function CompanyMgmtPage() {
  return (
    <div className="CompanyMgmtPage">
      <CompanyMgmtHeader/>
      <CompanyMgmtNav/>
      <MgmtMain aside={<CompanyMgmtAside />} form={<CompanyMgmtForm />} />
      
    </div>
  );
}

