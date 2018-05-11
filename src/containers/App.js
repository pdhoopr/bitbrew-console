import PropTypes from 'prop-types';
import React from 'react';
import connect from '../utils/connect';
import ListOrgsPage from './ListOrgsPage';
import SignInPage from './SignInPage';

function App({ isSignedIn }) {
  return isSignedIn ? <ListOrgsPage /> : <SignInPage />;
}

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(App, (store) => ({
  isSignedIn: store.isSignedIn,
}));
