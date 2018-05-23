import axios from 'axios';
import { fixtures } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';
import React from 'react';
import { render, wait } from 'react-testing-library';
import Store from '../../models/Store';
import ConnectedListOrgsPage from '../ListOrgsPage';

const ListOrgsPage = ConnectedListOrgsPage.wrappedComponent;

beforeEach(() => {
  localStorage.clear();
  axios.reset();
});

test('renders DOM for the list orgs page', () => {
  const dom = shallow(
    <ListOrgsPage listOrgs={jest.fn()} orgs={[]} signOut={jest.fn()} />,
  );
  expect(dom).toMatchSnapshot();
});

test('can successfully list orgs from the API', async () => {
  const items = Object.values(fixtures.orgs);
  axios.api.get.mockResolvedValueOnce({
    data: { items },
  });
  const { getAllByTestId, getByTestId, getByText } = render(
    <Provider store={Store.create()}>
      <ConnectedListOrgsPage />
    </Provider>,
  );
  expect(getByText('Welcome!')).toBeDefined();
  expect(() => getByTestId('org-name')).toThrow();
  await wait();
  const allOrgNames = getAllByTestId('org-name').map(
    orgName => orgName.textContent,
  );
  expect(allOrgNames.length).toBe(items.length);
  items.forEach(item => {
    expect(allOrgNames).toContain(item.properName);
  });
});
