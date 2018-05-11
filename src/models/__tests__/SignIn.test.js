import { fixtures } from 'bitbrew-test-helpers';
import { getSnapshot } from 'mobx-state-tree';
import SignIn from '../SignIn';

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

test('updates the value of the access token', () => {
  const token = fixtures.accessToken;
  const model = SignIn.create();
  expect(model.accessToken).not.toBe(token);
  model.update({
    currentTarget: {
      id: 'accessToken',
      value: token,
    },
  });
  expect(model.accessToken).toBe(token);
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
