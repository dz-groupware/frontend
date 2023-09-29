import MgmtMain from '../components/Commons/MgmtMain';
import EmployeeMgmtHeader from '../components/EmployeeMgmt/EmployeeMgmtHeader'
import EmployeeMgmtNav from '../components/EmployeeMgmt/EmployeeMgmtNav';
import EmployeeMgmtForm from '../components/EmployeeMgmt/EmployeeMgmtForm';
import EmployeeMgmtAside from '../components/EmployeeMgmt/EmployeeMgmtAside';
import PageContainer from '../components/Commons/PageContainer';



export default function EmployeeMgmtPage() {
 
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