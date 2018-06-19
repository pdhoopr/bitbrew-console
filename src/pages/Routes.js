import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect } from '../utils/tools';
import * as urls from '../utils/urls';
import CreateOrgPage from './CreateOrgPage';
import ListOrgsPage from './ListOrgsPage';
import SignInPage from './SignInPage';
import ViewOrgPage from './ViewOrgPage';

const Wrapper = styled.main`
  flex: 1;
`;

const wildcardPath = path => `${path}/*`;

function NestedRoutes({ render, '*': wildcard, ...props }) {
  const matchedPath = `/${wildcard}`;
  return render({
    listProps: {
      ...props,
      path: urls.listPath,
    },
    showList: matchedPath === urls.listPath || matchedPath === urls.createPath,
  });
}

function Routes({ isSignedIn }) {
  return isSignedIn ? (
    <>
      <Router component={Wrapper} primary={false}>
        <Redirect from={urls.listPath} to={urls.listOrgsPath} noThrow />
        <NestedRoutes
          path={wildcardPath(urls.listOrgsPath)}
          render={({ listProps, showList }) => (
            <>
              {showList && <ListOrgsPage {...listProps} />}
              <Router>
                <CreateOrgPage path={urls.createPath} />
                <ViewOrgPage path={urls.viewPath} />
              </Router>
            </>
          )}
        />
      </Router>
      <Footer />
    </>
  ) : (
    <>
      <Wrapper>
        <SignInPage />
      </Wrapper>
      <Footer />
    </>
  );
}

Routes.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(
  Routes,
  store => ({
    isSignedIn: store.isSignedIn,
  }),
);
