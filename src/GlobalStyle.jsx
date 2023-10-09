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
  font-family:  'NanumGothic', 'Noto Sans','Gothic A1',  sans-serif;
}

`;

export default GlobalStyle;