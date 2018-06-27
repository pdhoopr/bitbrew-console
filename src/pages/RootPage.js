import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect } from '../utils/tools';
import * as urls from '../utils/urls';
import CreateOrgPage from './CreateOrgPage';
import DeleteOrgPage from './DeleteOrgPage';
import ListOrgsPage from './ListOrgsPage';
import SignInPage from './SignInPage';
import ViewOrgPage from './ViewOrgPage';

const Wrapper = styled.main`
  flex: 1;
`;

function addWildcardTo(path) {
  return `${path}/*`;
}

function RouterWithoutFocus(props) {
  return <Router primary={false} {...props} />;
}

function Subroutes({ Delete, View, '*': wildcard, ...props }) {
  return (
    <>
      <View {...props} path={urls.rootPath} />
      <RouterWithoutFocus>
        <Delete path={urls.deletePath} />
      </RouterWithoutFocus>
    </>
  );
}

function Routes({ Create, Delete, List, View, '*': wildcard, ...props }) {
  const path = `/${wildcard}`;
  const showList = path === urls.rootPath || path === urls.createPath;
  return (
    <>
      {showList && <List {...props} path={urls.rootPath} />}
      <RouterWithoutFocus>
        <Create path={urls.createPath} />
        <Subroutes
          path={addWildcardTo(urls.idPath)}
          View={View}
          Delete={Delete}
        />
      </RouterWithoutFocus>
    </>
  );
}

function RootPage({ isSignedIn }) {
  return isSignedIn ? (
    <>
      <RouterWithoutFocus component={Wrapper}>
        <Redirect from={urls.rootPath} to={urls.orgsPath} noThrow />
        <Routes
          path={addWildcardTo(urls.orgsPath)}
          List={ListOrgsPage}
          Create={CreateOrgPage}
          View={ViewOrgPage}
          Delete={DeleteOrgPage}
        />
      </RouterWithoutFocus>
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

RootPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(
  RootPage,
  ({ authStore }) => ({
    isSignedIn: authStore.isSignedIn,
  }),
);
