import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect, loadAsync } from '../utils/tools';
import * as urls from '../utils/urls';

const OrgDetailsPage = loadAsync(() => import('./OrgDetailsPage'));
const OrgsPage = loadAsync(() => import('./OrgsPage'));
const SignInPage = loadAsync(() => import('./SignInPage'));

const Wrapper = styled.main`
  flex: 1;
`;

function RootPage({ isSignedIn }) {
  return (
    <React.Fragment>
      <Wrapper>
        {isSignedIn ? (
          <Router>
            <Redirect from={urls.rootPath} to={urls.orgsPath} noThrow />
            <OrgsPage path={urls.orgsPath} />
            <OrgDetailsPage path={urls.orgDetailsPath()} />
          </Router>
        ) : (
          <SignInPage />
        )}
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

RootPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(
  RootPage,
  ({ authStore }) => ({
    isSignedIn: authStore.isSignedIn,
  }),
);
