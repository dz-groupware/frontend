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
}

`;

export default GlobalStyle;
