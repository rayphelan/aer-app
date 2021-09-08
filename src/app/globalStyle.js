import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
  }
  
  html, body {
    background-color: #000000;
    background-image: url(${process.env.PUBLIC_URL + '/bg3.jpg'} );
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    color: rgba(7, 120, 240, 1);
    margin: 10px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .nav-link a {
    color: rgba(7, 120, 240, 1);
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  .pagination {
    margin: 1rem 0;
    color: rgba(7, 120, 240, 1);
    font-size: 0.8rem;

    & input, select, button {
      background-color: #000000;
      border: 1px rgba(7, 120, 240, 1) solid;
      color: rgba(7, 120, 240, 1);

      &:disabled {
        border: 1px solid black;
        color: grey;
      }
    }
  }

  .glow {
    -webkit-animation: glow 1s ease-in-out infinite alternate;
    -moz-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate;
  }

  @-webkit-keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px rgba(7, 120, 240, 1), 0 0 40px rgba(7, 120, 240, 1), 0 0 50px rgba(7, 120, 240, 1), 0 0 60px rgba(7, 120, 240, 1), 0 0 70px rgba(7, 120, 240, 1);
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px rgba(7, 120, 240, 1), 0 0 40px rgba(7, 120, 240, 1), 0 0 50px rgba(7, 120, 240, 1), 0 0 60px rgba(7, 120, 240, 1), 0 0 70px rgba(7, 120, 240, 1), 0 0 80px rgba(7, 120, 240, 1);
    }
  }

`;

export default GlobalStyle;
