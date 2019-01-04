import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-red: #ff5252;
    --color-green: #02ca91;
    --color-white: #fff;
    --color-light-gray: #f5f5f5;
    --color-blue-gray: #eceff1;
    --color-medium-gray: #e0e0e0;
    --color-gray: #bdbdbd;
    --color-dark-gray: #616161;
    --color-black: #333;
    --corner-radius: 3px;
    --duration-short: 0.15s;
    --duration-long: 1.5s;
    --elevation-low: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    --elevation-low-darker: 0 3px 1px -2px rgba(0, 0, 0, 0.28),
      0 2px 2px 0 rgba(0, 0, 0, 0.22), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    --elevation-medium: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    --elevation-high: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
    --font-roboto: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    --font-system-monospace: SFMono-Regular, Consolas, "Liberation Mono", Menlo,
      Courier, monospace;
    --letter-spacing: 0.25px;
    --size-2: 0.125rem;
    --size-4: 0.25rem;
    --size-7: 0.4375rem;
    --size-8: 0.5rem;
    --size-12: 0.75rem;
    --size-14: 0.875rem;
    --size-16: 1rem;
    --size-20: 1.25rem;
    --size-24: 1.5rem;
    --size-28: 1.75rem;
    --size-32: 2rem;
    --size-40: 2.5rem;
    --size-44: 2.75rem;
    --size-48: 3rem;
    --size-56: 3.5rem;
    --size-128: 8rem;
    --size-240: 15rem;
    --size-320: 20rem;
    --size-480: 30rem;
    --size-640: 40rem;
    --weight-regular: 400;
    --weight-bold: 500;
  }

  html {
    box-sizing: border-box;
    text-size-adjust: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--color-blue-gray);
    color: var(--color-black);
    font-family: var(--font-roboto);
    font-size: var(--size-14);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    line-height: var(--size-20);
    margin: 0;
  }

  strong {
    font-weight: var(--weight-bold);
    letter-spacing: var(--letter-spacing);
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &[data-nav] {
      padding-left: var(--size-240);
    }
  }
`;
