import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import App from './components/App';
import Api from './models/Api';
import Stores from './models/Stores';

const stores = Stores.create(
  {},
  {
    api: new Api(),
  },
);

function renderToDom() {
  const appElement = document.getElementById('app');
  ReactModal.setAppElement(appElement);
  ReactDOM.render(
    <Provider stores={stores}>
      <App />
    </Provider>,
    appElement,
  );
}

renderToDom();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderToDom();
  });
}
