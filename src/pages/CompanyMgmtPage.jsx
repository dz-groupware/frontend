import CompanyMgmtMain from "../../../../dzproject/frontend/src/components/CompanyMgmt/CompanyMgmtMain";
import CompanyMgmtNav from "../../../../dzproject/frontend/src/components/CompanyMgmt/CompanyMgmtNav";
import CompanyMgmtHeader from "../../../../dzproject/frontend/src/components/CompanyMgmt/CompanyMgmtHeader"



export default function CompanyMgmtPage() {
  return (
    <div className="CompanyMgmtPage">
      <CompanyMgmtHeader/>
      <CompanyMgmtNav/>
      <CompanyMgmtMain/>
      
    </div>
  );
}

