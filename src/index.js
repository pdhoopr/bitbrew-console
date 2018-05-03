import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './globalStyles';

function renderToDom(Component) {
  ReactDOM.render(<Component />, document.getElementById('app'));
}

renderToDom(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderToDom(App);
  });
}
