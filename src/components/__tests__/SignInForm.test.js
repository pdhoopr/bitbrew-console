import { shallow } from 'enzyme';
import React from 'react';
import SignInForm from '../SignInForm';

test('renders DOM for the sign in form', () => {
  const dom = shallow(<SignInForm signIn={jest.fn()} />);
  expect(dom).toMatchSnapshot();
});
