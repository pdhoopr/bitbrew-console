import '@babel/polyfill';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Store from './models/Store';
import './styles/Global';

const store = Store.create();

function renderToDom(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
}

renderToDom(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderToDom(App);
  });
}
