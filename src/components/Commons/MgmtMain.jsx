
import styled from "styled-components";


export default function MgmtMain({ aside, form }) {


    return (
        <div>
            <Container>
                <AsideArea>
                    {aside}
                </AsideArea>
                <FormArea>
                    {form}
                </FormArea>

            </Container>
        </div>
    );
}


const Container = styled.div`
    display: flex;
    
   
`;

const AsideArea = styled.div`
  flex: 0.3;
`;

const FormArea = styled.div`
  flex: 1.7;
`;
