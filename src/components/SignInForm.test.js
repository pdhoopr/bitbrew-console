import React from 'react';
import { fixtures, shallow } from '../../test';
import SignInForm from './SignInForm';

test('renders DOM for the sign in form', () => {
  const dom = shallow(
    <SignInForm
      data={{
        accessToken: fixtures.accessToken,
        submit: jest.fn(),
        update: jest.fn(),
      }}
    />,
  );
  expect(dom).toMatchSnapshot();
});
