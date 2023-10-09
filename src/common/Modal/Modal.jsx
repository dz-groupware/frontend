import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  z-index: 1; 
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
  width:100%;
  height:100%;
`;
export const ModalView = styled.div`
display: flex;
position: relative;
z-index: 2;
top:-100px;
right:-200px;
align-items: center;
flex-direction: column;
border-radius: 5px;
width: 600px;
height: 400px;
color: black;
background-color: #ffffff;
`;

export const ModalArea = styled.div`
width: 600px;
height: 300px;
margin: 5px;
> table {
  margin: 5px;
  height: 290px;
  font-size: medium;
  > tbody {
    > #tHeader {
      height: 20px;
      background-color: rgb(230,230,250);
      text-align : center;
      font-weight: bold;
    } 

    > tr {
      > td {
        height: 20px;
        padding: 5px;
      }
      > nth:child(0) {
        width: 150px;
      }
      > nth:child(1) {
        width: 200px;
      }
      > nth:child(2) {
        width: 100px;
      }
    }
  }
}

> #modal_btn {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgb(230,230,250);
}
`;

const ModalBtn = styled.button`
display : flex;
justify-content : center;
border: none;
border-radius: 10px;
cursor: grab;
width: 100px;
height: 40px;
margin: 10px;
padding: 5px 10px 20px 10px;
align-items : center;
`;
export const DoneBtn = styled(ModalBtn) `
background-color : rgb(21,21,72);
color: white;
`;
export const ExitBtn = styled(ModalBtn) `
background-color : white;
color: black;
`;