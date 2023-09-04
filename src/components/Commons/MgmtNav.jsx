import styled from 'styled-components';
import StyledButton from './StyledButton';
import { FiSearch } from "react-icons/fi";


export default function MgmtNav({children, onSearch}) {
  
  return (
      <Container>
        
        <SearchArea>
          {children}
        </SearchArea>
        <ButtonArea onClick={onSearch}>
        <SearchButton><FiSearch style={{ color: "lightgrey" }} /></SearchButton>
        </ButtonArea>
      </Container>
    );
}

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid lightgrey;
    margin: 10px;
`;

export const SearchArea = styled.div`
    display: flex;
    align-items:center;
`;

export const ButtonArea = styled.div`
    display: flex;
    padding:10px;
`;

export const SearchButton = styled(StyledButton)`
  &:active {
    background: lightgrey;
    color: white;
  }
`;
