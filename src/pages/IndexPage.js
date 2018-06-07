import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../utils/tools';
import * as urls from '../utils/urls';
import CreateOrgPage from './CreateOrgPage';
import ListOrgsPage from './ListOrgsPage';
import SignInPage from './SignInPage';

function IndexPage({ isSignedIn }) {
  return isSignedIn ? (
    <Router primary={false}>
      <Redirect from={urls.basePath} to={urls.orgsPath} />
      <ListOrgsPage path={urls.orgsPath}>
        <CreateOrgPage path={urls.newPath} />
      </ListOrgsPage>
    </Router>
  ) : (
    <SignInPage />
  );
}

IndexPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(
  IndexPage,
  store => ({
    isSignedIn: store.isSignedIn,
  }),
);
