import { shallow } from 'enzyme';
import React from 'react';
import ConnectedSignInPage from '../SignInPage';

const SignInPage = ConnectedSignInPage.wrappedComponent;

test('renders DOM for the sign in page', () => {
  const dom = shallow(<SignInPage signIn={jest.fn()} />);
  expect(dom).toMatchSnapshot();
});
