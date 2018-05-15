import axios from 'axios';
import { diffComponents, fixtures } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import React from 'react';
import { Simulate, render } from 'react-testing-library';
import Store from '../../models/Store';
import ConnectedApp from '../App';

const App = ConnectedApp.wrappedComponent;

beforeEach(() => {
  localStorage.clear();
  axios.reset();
});

test('renders DOM for the app when signed out', () => {
  const dom = shallow(<App isSignedIn={false} />);
  expect(dom).toMatchSnapshot();
});

test('renders different DOM for the app when signed in', () => {
  const base = <App isSignedIn={false} />;
  const comp = <App isSignedIn />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('allows signing in and out of the app', async () => {
  axios.api.get.mockResolvedValueOnce({
    data: {
      items: [],
    },
  });
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
  expect(getByText('Welcome!')).toBeDefined();
  const signOut = getByText('Sign out');
  expect(signOut).toBeDefined();
  Simulate.click(signOut);
  expect(getByText('Sign in')).toBeDefined();
});
