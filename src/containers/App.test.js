import React from 'react';
import shallowRender from '../../test/shallowRender';
import App from './App';

describe('<App />', () => {
  test('renders DOM for app', () => {
    const dom = shallowRender(<App />);
    expect(dom).toMatchSnapshot();
  });
});
