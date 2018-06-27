import '@babel/polyfill';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { injectGlobal } from 'styled-components';
import RootPage from './pages/RootPage';
import RootStore from './stores/RootStore';
import * as api from './utils/api';
import './utils/variables';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
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
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

const store = RootStore.create({}, { api });

function renderToDom(Component) {
  const rootElement = document.getElementById('root');
  ReactModal.setAppElement(rootElement);
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootElement,
  );
}

renderToDom(RootPage);

if (module.hot) {
  module.hot.accept('./pages/RootPage', () => {
    renderToDom(RootPage);
  });
}
