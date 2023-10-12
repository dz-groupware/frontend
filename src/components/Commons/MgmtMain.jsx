

import styled from "styled-components";



export default function MgmtMain({ aside, form, menuId }) {
    


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
  width: 300px;
  min-width: 300px;
`;

const FormArea = styled.div`
  width: 100%;
`;
