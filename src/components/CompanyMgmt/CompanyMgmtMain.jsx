
import styled from "styled-components";
import CompanyMgmtAside from "./CompanyMgmtAside";
import CompanyMgmtForm from "./CompanyMgmtForm";



export default function CompanyMgmtMain() {
 
   
    return (
        <div>
            <Container>
                <StyledCompanyMgmtAside />
                <FormArea>
                    <CompanyMgmtForm/>
                </FormArea>
                
            </Container>
        </div>
    );
}


const Container = styled.div`
    display: flex;
    
   
`;

const StyledCompanyMgmtAside = styled(CompanyMgmtAside)`
  flex:0.3;
`;

const FormArea = styled.div`
  flex:1.7;
`;