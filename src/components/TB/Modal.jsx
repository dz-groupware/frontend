// import styled from 'styled-components';


// export function SearchModal(props){
//     return (
//     <ModalBackdrop onClick={() => {props.setSearchModal(false)}}>
//         <ModalView onClick={(e) => e.stopPropagation()}>
//         <br />
//         <div>
//             <h2>준비중입니다</h2>
//         </div>
//         </ModalView>
//     </ModalBackdrop>
//     );
// }

// export function SetModal(props){
//     return (
//       <ModalBackdrop onClick={() => {props.setSetModal(false)}}>
//       <ModalView onClick={(e) => e.stopPropagation()}>
//         <br />
//         <div>
//           <h2>준비중입니다</h2>
//         </div>
//       </ModalView>
//     </ModalBackdrop>
//     );
// }

// export function AlertModal(props){
//     return (
//       <ModalBackdrop onClick={() => {props.setAlertModal(false)}}>
//       <ModalView onClick={(e) => e.stopPropagation()}>
//         <br />
//         <div>
//           <h2>준비중입니다</h2>
//         </div>
//       </ModalView>
//     </ModalBackdrop>
//     );
// }

// export const ModalBackdrop = styled.div`
//   // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
//   z-index: 1; //위치지정 요소
//   position: fixed;
//   display : flex;
//   justify-content : center;
//   align-items : center;
//   background-color: rgba(0,0,0,0.4);
//   border-radius: 10px;
//   top : 0;
//   left : 0;
//   right : 0;
//   bottom : 0;
// `;
// export const ModalView = styled.div`
//   // Modal창 CSS를 구현합니다.
//   display: flex;
//   position: relative;
//   top:-150px;
//   right:-200px;
//   align-items: center;
//   flex-direction: column;
//   border-radius: 5px;
//   width: 500px;
//   heigth: 200px;
//   color: black;
//   background-color: #ffffff;

//   > div {
//     display: flex;

//     > img {
//       width:60px;
//       height:60px;
//       margin: 20px;
//     }

//     > div {
//       width: 350px;

//       > #profile_name {
//         margin-top: 10px;
//         font-size: 18px;
//         font-weight: bold;
//       }

//       > p {
//         color: grey;
//         font-size: 12px;
//         margin: 0;
//       }
//     }

//     > PosiList {
//       width: 450px;
//     }
//   }

//   >#modal_btn {
//     display: flex;
//     justify-content: center;
//     width: 90%;
//     background-color: rgb(230,230,250);
//     margin-bottom: 10px;
//   }

//   > #tableName {
//     width: 85%;
//     align-items: left;
//     font-weight: bold;
//   }

// `;