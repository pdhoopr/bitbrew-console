import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import connect from '../utils/connect';
import urls from '../utils/urls';
import ListOrgsPage from './ListOrgsPage';
import SignInPage from './SignInPage';

const IndexPage = ({ isSignedIn }) =>
  isSignedIn ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {() => <Redirect to={urls.orgs} />}
        </Route>
        <Route path={urls.orgs} component={ListOrgsPage} />
      </Switch>
    </BrowserRouter>
  ) : (
    <SignInPage />
  );

IndexPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default connect(IndexPage, store => ({
  isSignedIn: store.isSignedIn,
}));
