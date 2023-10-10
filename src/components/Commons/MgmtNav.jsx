import styled from 'styled-components';
import {StyledButton} from './StyledButton';
import { FiSearch } from "react-icons/fi";


export default function MgmtNav({children, onSearch}) {
  
  return (
      <Container>
        
        <SearchArea type="submit">
          {children}
        </SearchArea>
        <ButtonArea onClick={onSearch}>
        <SearchButton><FiSearch style={{ color: "grey" }} /></SearchButton>
        </ButtonArea>
      </Container>
    );
}

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid lightgrey;
    margin: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 98%;
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
background: linear-gradient(0deg, #e3e8ed 10%, #ffffff 100%);
            border: none;
cursor: pointer;
transition: all 0.3s ease;
color: #1d2437; 
margin: 5px;

padding: 5px 10px 5px 10px; 
font-size: 16px;
font-weight: 550;
position: relative;
display: inline-block;
border: 1px solid rgba(190,190,190,0.21);
border-radius: 5px;
border-bottom-color: rgba(0,0,0,0.34);
text-shadow:0 1px 0 rgba(0,0,0,0.15);
box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;

&:active {
  top: 1px;
  border-color: rgba(0,0,0,0.34) rgba(0,0,0,0.21) rgba(0,0,0,0.21);
  box-shadow: 0 1px 0 rgba(255,255,255,0.89),0 1px rgba(0,0,0,0.05) inset;
  position: relative;
}
`;
