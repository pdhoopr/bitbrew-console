import { Provider } from 'mobx-react';
import React from 'react';
import { Simulate, render } from 'react-testing-library';
import { fixtures, getComponentDiff, shallow } from '../../test';
import Store from '../models/Store';
import ConnectedApp from './App';

const App = ConnectedApp.wrappedComponent;

test('renders DOM for the app when signed out', () => {
  const dom = shallow(
    <App isSignedIn={false} signIn={jest.fn()} signOut={jest.fn()} />,
  );
  expect(dom).toMatchSnapshot();
});

test('renders different DOM for the app when signed in', () => {
  const base = shallow(
    <App isSignedIn={false} signIn={jest.fn()} signOut={jest.fn()} />,
  );
  const compare = shallow(
    <App isSignedIn signIn={jest.fn()} signOut={jest.fn()} />,
  );
  const diff = getComponentDiff(base, compare);
  expect(diff).toMatchSnapshot();
});

test('allows signing in and out of the app', () => {
  const { getByLabelText, getByTestId, getByText } = render(
    <Provider store={Store.create()}>
      <ConnectedApp />
    </Provider>,
  );
  expect(getByText('Sign in')).toBeDefined();
  const accessToken = getByLabelText('Access Token');
  accessToken.value = fixtures.accessToken;
  Simulate.change(accessToken);
  Simulate.submit(getByTestId('sign-in-form'));
  const signOut = getByText('Sign out');
  expect(signOut).toBeDefined();
  Simulate.click(signOut);
  expect(getByText('Sign in')).toBeDefined();
});
