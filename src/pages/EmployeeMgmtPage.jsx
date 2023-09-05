import MgmtMain from '../components/Commons/MgmtMain';
import EmployeeMgmtHeader from '../components/EmployeeMgmt/EmployeeMgmtHeadr'
import EmployeeMgmtNav from '../components/EmployeeMgmt/EmployeeMgmtNav';
import EmployeeMgmtForm from '../components/EmployeeMgmt/EmployeeMgmtForm';
import EmployeeMgmtAside from '../components/EmployeeMgmt/EmployeeMgmtAside';


export default function EmployeeMgmtPage() {
    return (
      <div className="EmployeeMgmtPage">
        <EmployeeMgmtHeader/>
        <EmployeeMgmtNav/>
      <MgmtMain aside={<EmployeeMgmtAside />} form={<EmployeeMgmtForm />} />
      
      
      </div>
    );
  }