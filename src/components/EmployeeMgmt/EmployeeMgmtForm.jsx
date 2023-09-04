import MgmtInfoMenu from '../Commons/MgmtInfoMenu';
import EmployeeMgmtInfo from './EmployeeMgmtInfo';
import EmployeeMgmtBasicForm from './EmployeeMgmtBasicForm';
import EmployeeMgmtGroupForm from './EmployeeMgmtGroupForm';
import { useState } from 'react';
import { Container } from '../Commons/StyledForm';

export default function EmployeeMgmtForm() {
    const [activeTab, setActiveTab] = useState("basic");
 
    return (
        <Container>
            <EmployeeMgmtInfo />
            <MgmtInfoMenu activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "basic" && <EmployeeMgmtBasicForm />}
            {activeTab === "department" && <EmployeeMgmtGroupForm />}

            
        </Container>
    );
}

