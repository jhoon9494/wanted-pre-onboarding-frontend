import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  } 

  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(-20deg, #bac8ff, #748ffc);
    
    /* root */
    > div {
      max-width: 1280px;
      height: 100vh;
      margin: 0 auto;
    }
  }

  a {
    color: #91a7ff;
    text-decoration: none;

    :hover {
      color: #6d8afd
    }
  }

  /* input 자동완성시 배경 색상 제거 */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
	  transition: background-color 5000s ease-in-out 0s;
	  -webkit-transition: background-color 9999s ease-out;
     -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
     -webkit-text-fill-color: #656565 !important;
   }
`;

export default GlobalStyle;
