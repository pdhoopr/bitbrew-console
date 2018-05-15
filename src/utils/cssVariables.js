import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  :root {
    --color-black: #333;
    --color-blue-grey: #eceff1;
    --color-medium-grey: #e0e0e0;
    --color-dark-grey: #757575;
    --color-green: #02ca91;
    --color-white: #fff;
    --corner-radius: 3px;
    --duration-short: 0.15s;
    --elevation-low: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    --font-roboto: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    --size-8: 0.5rem;
    --size-14: 0.875rem;
    --size-16: 1rem;
    --size-20: 1.25rem;
    --size-24: 1.5rem;
    --size-28: 1.75rem;
    --size-32: 2rem;
    --size-40: 2.5rem;
    --size-128: 8rem;
    --size-320: 20rem;
    --size-960: 60rem;
    --weight-normal: 400;
    --weight-bold: 500;
  }
`;
