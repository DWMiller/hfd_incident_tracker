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
    line-height: 1.5;
    color:  ${props => props.theme.palette['grey-900']};
    height: 100%;
    margin: 0;
    padding: 0;
  }

  button {
    text-transform: uppercase;
    border: none;
    background: #fff;
    cursor: pointer;
    border-bottom: 1px solid lightgray;
  }

  button:hover {
    background: rgba(41, 128, 185, 1);
    color: white;
  }

  button:active {
    box-shadow: ${props => props.theme.shadows['shadow-inset-100']} 
  }

  button:focus {
    outline: none;
  }
`;

export default GlobalStyle;
