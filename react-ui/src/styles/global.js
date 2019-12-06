// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  html,
  #root {

    font-family: Verdana, sans-serif;
    position: relative;
    height: 100%;
    line-height: 1.6;

    height: 100%;
    margin: 0;
    padding: 0;
  }

  button {
    text-transform: uppercase;
    border: none;
    background: #fff;
    cursor: pointer;
    box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.3);
  }

  button:hover {
    background: rgba(41, 128, 185, 1);
    color: white;
  }

  button:active {
    box-shadow: -2px 2px 5px -2px rgba(0, 0, 0, 0.3);
  }

  button:focus {
    outline: none;
  }
`;

export default GlobalStyle;
