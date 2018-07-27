import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect, loadAsync } from '../utils/tools';
import * as urls from '../utils/urls';

const OrgDetailsScreen = loadAsync(() => import('./OrgDetailsScreen'));
const OrgsScreen = loadAsync(() => import('./OrgsScreen'));
const SignInScreen = loadAsync(() => import('./SignInScreen'));

const Wrapper = styled.main`
  flex: 1;
`;

function RootScreen({ isSignedIn }) {
  return (
    <React.Fragment>
      <Wrapper>
        {isSignedIn ? (
          <Router>
            <Redirect from={urls.rootPath} to={urls.orgsPath} noThrow />
            <OrgsScreen path={urls.orgsPath} />
            <OrgDetailsScreen path={urls.orgDetailsPath()} />
          </Router>
        ) : (
          <SignInScreen />
        )}
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

RootScreen.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(
  RootScreen,
  ({ authStore }) => ({
    isSignedIn: authStore.isSignedIn,
  }),
);
