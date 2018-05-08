import { getSnapshot } from 'mobx-state-tree';
import { fixtures } from '../../test';
import Store from './Store';

test('initializes the store with the default values', () => {
  const model = Store.create();
  expect(getSnapshot(model)).toMatchSnapshot();
});

test('initializes the store with the defined values', () => {
  const data = {
    storageKey: 'bitbrew:auth:token',
  };
  const model = Store.create(data);
  expect(model).toMatchObject(data);
});

test("initializes the store with a token if there's one in localStorage", () => {
  const data = {
    storageKey: 'bitbrew:auth:token',
  };
  localStorage.setItem(data.storageKey, fixtures.accessToken);
  const model = Store.create(data);
  expect(model.token).toBe(fixtures.accessToken);
});

test('signs in by setting a token in the store and localStorage', () => {
  const data = {
    accessToken: fixtures.accessToken,
  };
  const model = Store.create();
  model.signIn(data);
  expect(model.token).toBe(data.accessToken);
  expect(localStorage.getItem(model.storageKey)).toBe(data.accessToken);
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
