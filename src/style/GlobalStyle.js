import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    /* root */
    > div {
      max-width: 1280px;
      height: 100vh;
      margin: 0 auto;
    }
  }
`;

export default GlobalStyle;
