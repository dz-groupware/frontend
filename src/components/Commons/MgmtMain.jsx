

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
  width: 250px;
  min-width: 250px;
`;

const FormArea = styled.div`
  width: 100%;
`;
