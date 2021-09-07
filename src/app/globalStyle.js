import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
  }
  
  html, body {
    background-color: #000000;
    color: greenyellow;
    margin: 10px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    border: 1px solid rgba(173, 255, 47, 0.5);
    border-radius: 5px;
    background-color: rgba(0,0,0,0.85);
    padding: 0 1rem 1rem 1rem;
    max-width: 88%;
    margin: 1rem auto;
  }

  .nav-link a {
    color: greenyellow;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`;

export default GlobalStyle;
