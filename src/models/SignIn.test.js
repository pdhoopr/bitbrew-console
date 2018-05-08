import { getSnapshot } from 'mobx-state-tree';
import { fixtures } from '../../test';
import SignIn from './SignIn';

test('initializes sign in with the default values', () => {
  const model = SignIn.create();
  expect(getSnapshot(model)).toMatchSnapshot();
});

test('initializes sign in with the defined values', () => {
  const data = {
    accessToken: fixtures.accessToken,
  };
  const model = SignIn.create(data);
  expect(model).toMatchObject(data);
});

test('updates the value of an individual piece of sign in data', () => {
  const model = SignIn.create();
  expect(model.accessToken).not.toBe(fixtures.accessToken);
  model.update({
    currentTarget: {
      id: 'accessToken',
      value: fixtures.accessToken,
    },
  });
  expect(model.accessToken).toBe(fixtures.accessToken);
});

test('submits sign in data to the callback defined in the environment', () => {
  const env = {
    onSubmit: jest.fn(),
  };
  const event = {
    preventDefault: jest.fn(),
  };
  const model = SignIn.create({}, env);
  model.update({
    currentTarget: {
      id: 'accessToken',
      value: fixtures.accessToken,
    },
  });
  model.submit(event);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(env.onSubmit).toHaveBeenCalledWith(getSnapshot(model));
});
