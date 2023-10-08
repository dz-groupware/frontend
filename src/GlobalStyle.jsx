import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family:  'Noto Sans','Gothic A1',  sans-serif;
}
h1 {
  font-family: 'Noto Sans Bold' ,  sans-serif;
}
p {
  font-family: 'Gothic A1', 'Roboto Mono',   sans-serif;
}
`;

export default GlobalStyle;