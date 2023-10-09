import styled from 'styled-components';

export const StyledButton = styled.button`
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

export const ButtonBright = styled.div`
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
export const ButtonBlue = styled.div`
background: linear-gradient(0deg, rgb(55,137,250) 0%, rgb(96,171,252) 100%);
            border: none;
cursor: pointer;
transition: all 0.3s ease;
color: #e7e6ee; 
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


