import { fixtures } from 'bitbrew-test-helpers';
import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-testing-library';
import connect from '../connect';

function Component(props) {
  return <pre data-testid="props">{JSON.stringify(props)}</pre>;
}

test('returns a component with props derived from store data as defined by the callback', () => {
  const appStore = {
    org: fixtures.orgs.bitbrew,
    user: fixtures.users.bill,
  };
  const ConnectedComponent = connect(Component, (store) => ({
    org: store.org.properName,
    email: store.user.email,
  }));
  const { getByTestId } = render(
    <Provider store={appStore}>
      <ConnectedComponent />
    </Provider>,
  );
  expect(JSON.parse(getByTestId('props').textContent)).toEqual({
    org: appStore.org.properName,
    email: appStore.user.email,
  });
});
