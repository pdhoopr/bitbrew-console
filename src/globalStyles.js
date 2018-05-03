import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  :root {
    --color-black: #333;
    --color-blue-grey: #eceff1;
    --font-roboto: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    --size-14: 0.875rem;
    --size-20: 1.25rem;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--color-blue-grey);
    color: var(--color-black);
    font-family: var(--font-roboto);
    font-size: var(--size-14);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    line-height: var(--size-20);
    margin: 0;
  }
`;
