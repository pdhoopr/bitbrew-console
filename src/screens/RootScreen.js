import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect, loadAsync } from '../utils/tools';
import * as urls from '../utils/urls';

const OrgDetailsScreen = loadAsync(() => import('./OrgDetailsScreen'));
const OrgsScreen = loadAsync(() => import('./OrgsScreen'));

const Wrapper = styled.main`
  flex: 1;
`;

function RootScreen({ token }) {
  return (
    token && (
      <React.Fragment>
        <Wrapper>
          <Router>
            <Redirect from={urls.rootPath} to={urls.orgsPath} noThrow />
            <OrgsScreen path={urls.orgsPath} />
            <OrgDetailsScreen path={urls.orgDetailsPath()} />
          </Router>
        </Wrapper>
        <Footer />
      </React.Fragment>
    )
  );
}

RootScreen.propTypes = {
  token: PropTypes.string,
};

RootScreen.defaultProps = {
  token: null,
};

export default connect(
  RootScreen,
  ({ authStore }) => ({
    token: authStore.token,
  }),
);
