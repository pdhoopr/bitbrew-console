import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect, loadAsync } from '../utils/tools';
import * as urls from '../utils/urls';

const CreateOrgPage = loadAsync(() => import('./CreateOrgPage'));
const DeleteOrgPage = loadAsync(() => import('./DeleteOrgPage'));
const ListOrgsPage = loadAsync(() => import('./ListOrgsPage'));
const SignInPage = loadAsync(() => import('./SignInPage'));
const ViewOrgPage = loadAsync(() => import('./ViewOrgPage'));

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
