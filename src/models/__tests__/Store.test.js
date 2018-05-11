import axios from 'axios';
import { fixtures } from 'bitbrew-test-helpers';
import { getSnapshot } from 'mobx-state-tree';
import Org from '../Org';
import Store from '../Store';

beforeEach(() => {
  localStorage.clear();
  axios.reset();
});

test('initializes the store with the default values', () => {
  const model = Store.create();
  expect(getSnapshot(model)).toMatchSnapshot();
});

test('initializes the store with the defined values', () => {
  const data = {
    orgs: [Org.create(fixtures.orgs.bitbrew)],
    storageKey: 'bitbrew:auth:token',
  };
  const model = Store.create(data);
  expect(model).toMatchObject(data);
});

test("initializes the store with a token if there's one in localStorage", () => {
  const token = fixtures.accessToken;
  const data = {
    storageKey: 'bitbrew:auth:token',
  };
  localStorage.setItem(data.storageKey, token);
  const model = Store.create(data);
  expect(model.token).toBe(token);
});

test('signs in by setting a token in the store and localStorage', () => {
  const token = fixtures.accessToken;
  const model = Store.create();
  model.signIn({
    accessToken: token,
  });
  expect(model.token).toBe(token);
  expect(localStorage.getItem(model.storageKey)).toBe(token);
  expect(model.isSignedIn).toBe(true);
});

test('signs out by removing a token from the store and localStorage', () => {
  const model = Store.create();
  model.signIn({
    accessToken: fixtures.accessToken,
  });
  model.signOut();
  expect(model.token).toBeNull();
  expect(localStorage.getItem(model.storageKey)).toBeNull();
  expect(model.isSignedIn).toBe(false);
});

test('reconfigures the API auth headers every time the token changes', () => {
  const token = fixtures.accessToken;
  const data = {
    storageKey: 'bitbrew:auth:token',
  };
  localStorage.setItem(data.storageKey, token);
  const model = Store.create(data);
  expect(axios.api.defaults.headers.common.Authorization).toBe(
    `Bearer ${token}`,
  );
  model.signOut();
  expect(axios.api.defaults.headers.common.Authorization).toBeUndefined();
  model.signIn({
    accessToken: token,
  });
  expect(axios.api.defaults.headers.common.Authorization).toBe(
    `Bearer ${token}`,
  );
});

test('gets orgs from the API and saves them to the store (sorted alphabetically)', async () => {
  axios.api.get.mockResolvedValueOnce({
    data: {
      items: Object.values(fixtures.orgs),
    },
  });
  const model = Store.create();
  model.signIn({
    accessToken: fixtures.accessToken,
  });
  await model.listOrgs();
  [fixtures.orgs.azuga, fixtures.orgs.bitbrew, fixtures.orgs.danlaw].forEach(
    (org, idx) => {
      expect(model.orgs[idx]).toMatchObject(org);
    },
  );
});
