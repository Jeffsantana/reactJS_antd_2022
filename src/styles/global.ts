/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background: #f1f1f1;
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text};
  }


  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 400 !important;
    font-family: 'Rubik', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  .faelpz {
    z-index: 999;
  }

  button {
    cursor: pointer;
  }
`;
