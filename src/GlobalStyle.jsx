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
/* h1 {
  font-family: 'Noto Sans Bold' ,  sans-serif;
}
p {
  font-family: 'Gothic A1','Noto Sans Korean','Roboto Mono',   sans-serif;
} */
p, a, h1, h2, h3, h4, h5, h6 {
    transform: skew(-0.1deg);
}
`;

export default GlobalStyle;