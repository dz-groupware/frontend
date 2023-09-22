import styled from 'styled-components';

const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-weight: 600;
  color : #454545;
  background: linear-gradient(to bottom, #FBFCFB,#F5F5F6,#F0F0EF); 
  padding: 5px;
  margin: 5px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  cursor : pointer; 
  white-space: nowrap;  // 줄바꿈 방지
  &:disabled {
    cursor: not-allowed; 
    color: #A9A9A9;
    border: 1px solid #CDCDCD;
    background: #E0E0E0;
  }
  
`;

export default StyledButton;
