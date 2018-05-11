import { fixtures } from 'bitbrew-test-helpers';
import { getSnapshot } from 'mobx-state-tree';
import Search from '../Search';

test('initializes search with the default values', () => {
  const model = Search.create();
  expect(getSnapshot(model)).toMatchSnapshot();
});

test('initializes search with the defined values', () => {
  const data = {
    query: fixtures.orgs.bitbrew.properName,
  };
  const model = Search.create(data);
  expect(model).toMatchObject(data);
});

test('updates the value of the search query', () => {
  const query = fixtures.orgs.danlaw.properName;
  const model = Search.create();
  expect(model.query).not.toBe(query);
  model.update({
    currentTarget: {
      id: 'query',
      value: query,
    },
  });
  expect(model.query).toBe(query);
});

test('gets the search results using the query and a callback defined in the environment', () => {
  const env = {
    onSearch: (query) =>
      Object.values(fixtures.orgs)
        .filter((org) =>
          org.properName.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) => a.properName.localeCompare(b.properName)),
  };
  const model = Search.create({}, env);
  model.update({
    currentTarget: {
      id: 'query',
      value: 'a',
    },
  });
  expect(model.results).toEqual([fixtures.orgs.azuga, fixtures.orgs.danlaw]);
});
