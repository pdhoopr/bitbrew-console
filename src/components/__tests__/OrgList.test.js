import { diffComponents, fixtures } from 'bitbrew-test-helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { Simulate, render } from 'react-testing-library';
import OrgList from '../OrgList';

test('renders DOM for the org list without any orgs', () => {
  const dom = shallow(<OrgList orgs={[]} />);
  expect(dom).toMatchSnapshot();
});

test('renders different DOM for the org list with orgs', () => {
  const base = <OrgList orgs={[]} />;
  const comp = <OrgList orgs={Object.values(fixtures.orgs)} />;
  const diff = diffComponents(base, comp);
  expect(diff).toMatchSnapshot();
});

test('can filter the org list with a case-insensitive search query', async () => {
  const orgs = Object.values(fixtures.orgs);
  const query = 'A';
  const results = [fixtures.orgs.azuga, fixtures.orgs.danlaw];
  const { getAllByTestId, getByPlaceholderText } = render(
    <OrgList orgs={orgs} />,
  );
  expect(getAllByTestId('org-name').length).toBe(orgs.length);
  const search = getByPlaceholderText('Search by organization name');
  search.value = query;
  Simulate.change(search);
  const allOrgNames = getAllByTestId('org-name').map(
    orgName => orgName.textContent,
  );
  expect(allOrgNames.length).toBe(results.length);
  results.forEach(result => {
    expect(allOrgNames).toContain(result.properName);
  });
});
