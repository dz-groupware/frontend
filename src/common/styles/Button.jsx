import styled from 'styled-components';

export const ButtonTitle = styled.div`
background: linear-gradient(0deg, #e3e8ed 10%, #ffffff 100%);
            border: none;
cursor: pointer;
transition: all 0.3s ease;
color: #1d2437cd;
padding: 5px 10px 5px 10px; 
font-size: 12px;
font-weight: 600;
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

&.disabled {
  pointer-events: none;
  opacity: 0.5;
}
`;

export const ButtonBright = styled.div`
background: linear-gradient(0deg, #e3e8ed 10%, #ffffff 100%);
            border: none;
cursor: pointer;
transition: all 0.3s ease;
color: #1d2437; 
padding: 5px 10px 5px 10px; 
font-size: 14px;
font-weight: 600;
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
padding: 5px 10px 5px 10px; 
font-size: 14px;
font-weight: 600;
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

export const ButtonDarkBlue = styled.div`
background: linear-gradient(0deg, #242080 10%, #242080 100%);
            border: none;
cursor: pointer;
transition: all 0.3s ease;
color: white;
padding: 10px 15px 10px 15px; 
font-size: 16px;
font-family: 'Lato', sans-serif;
font-weight: 500;
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