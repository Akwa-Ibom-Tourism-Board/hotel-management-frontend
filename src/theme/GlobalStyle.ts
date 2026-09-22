import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    border-color: ${({ theme }) => theme.colors.border};
  }

  html {
    scroll-behavior: smooth;
    /* Keeps hash-linked sections from landing underneath the fixed TopBar + Navbar. */
    scroll-padding-top: 8rem;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${({ theme }) => theme.transitions.base}, color ${({ theme }) => theme.transitions.base};
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  input,
  select,
  textarea {
    font-family: inherit;
  }
`;
