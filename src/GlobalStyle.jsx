import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'NanumGothic';
  src: url('./assets/fonts/NanumGothic.ttf') format('truetype');
}

${reset}
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'NanumGothic', 'Noto Sans', 'Gothic A1', sans-serif;
 

  /* 스크롤바의 폭 너비 */
  ::-webkit-scrollbar {
      width: 10px;  
  }
  
  ::-webkit-scrollbar-thumb {
      background: #CBD0D5; /* 스크롤바 색상 */
      border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }
  
  ::-webkit-scrollbar-track {
      background: #F2F2F2;  /*스크롤바 뒷 배경 색상*/
  }

  & div.swal2-icon.swal2-success.swal2-icon-show {
    margin: 20px 0 0 220px;
  }
  & div.swal2-icon.swal2-warning.swal2-icon-show {
    width: 0px;
    height: 100px;
    padding: 0 50% 0 50%;
    font-size: 50px;
  }
}

`;

export default GlobalStyle;
