import { navigate, Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { LOGIN_URL, LOGOUT_URL } from '../../config/env';
import Footer from '../components/Footer';
import OrgNav from '../components/OrgNav';
import ProjectNav from '../components/ProjectNav';
import { connect, loadAsync, removeUrlParam } from '../utils/tools';
import * as urls from '../utils/urls';

const DevicesScreen = loadAsync(() => import('./DevicesScreen'));
const OrgDetailsScreen = loadAsync(() => import('./OrgDetailsScreen'));
const WelcomeScreen = loadAsync(() => import('./WelcomeScreen'));

const Wrapper = styled.main`
  flex: 1;
`;

class RootScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  async componentDidMount() {
    const { param, url } = removeUrlParam('access_token');
    await this.props.checkToken(param.value);
    this.loginIfRequired(url);
    if (param.wasFound) {
      navigate(url, {
        replace: true,
      });
    }
    await this.props.listOrgs();
    await Promise.all(this.props.orgsAtoZ.map(this.props.listProjects));
  }

  componentDidUpdate() {
    this.loginIfRequired();
  }

  loginIfRequired(referrer = window.location.origin) {
    if (!this.props.token) {
      const loginReferrer = `${LOGIN_URL}?redirect_uri=${referrer}`;
      navigate(`${LOGOUT_URL}?redirect_uri=${loginReferrer}`);
    }
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { orgsAtoZ, token } = this.props;
    return (
      token && (
        <React.Fragment>
          <Router primary={false} component={React.Fragment}>
            <OrgNav path={`${urls.orgsPath}/*`} orgs={orgsAtoZ} />
            <ProjectNav path={urls.devicesPath} />
          </Router>
          <Wrapper>
            <Router component="article">
              <WelcomeScreen path={urls.rootPath} />
              <Redirect from={urls.orgsPath} to={urls.rootPath} noThrow />
              <OrgDetailsScreen path={urls.orgDetailsPath()} />
              <DevicesScreen path={urls.devicesPath} />
            </Router>
          </Wrapper>
          <Footer />
        </React.Fragment>
      )
    );
  }
}

RootScreen.propTypes = {
  checkToken: PropTypes.func.isRequired,
  listOrgs: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  orgsAtoZ: PropTypes.array.isRequired,
  token: PropTypes.string,
};

RootScreen.defaultProps = {
  token: null,
};

export default connect(
  RootScreen,
  ({ authStore, orgStore, projectStore }) => ({
    checkToken: authStore.checkToken,
    listOrgs: orgStore.listOrgs,
    listProjects: projectStore.listProjects,
    orgsAtoZ: orgStore.orgsAtoZ,
    token: authStore.token,
  }),
);
