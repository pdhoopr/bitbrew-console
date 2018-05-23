import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { injectGlobal } from 'styled-components';
import Store from './models/Store';
import IndexPage from './pages/IndexPage';
import './utils/cssVariables';

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
    background-color: var(--color-blue-grey);
    color: var(--color-black);
    font-family: var(--font-roboto);
    font-size: var(--size-14);
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    line-height: var(--size-20);
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

const store = Store.create();

const renderToDom = Component => {
  const rootElement = document.getElementById('root');
  ReactModal.setAppElement(rootElement);
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootElement,
  );
};

renderToDom(IndexPage);

if (module.hot) {
  module.hot.accept('./pages/IndexPage', () => {
    renderToDom(IndexPage);
  });
}
