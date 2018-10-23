import { Redirect, Router as ReachRouter } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { summarize } from '../utils/formatters';
import { connect } from '../utils/helpers';
import {
  deviceDetailsPath,
  devicesPath,
  orgDetailsPath,
  orgsPath,
  projectDetailsPath,
  projectDevicesPath,
  projectsPath,
  rootPath,
} from '../utils/urls';
import DeviceDetailsPage from './devices/DeviceDetailsPage';
import DevicesPage from './devices/DevicesPage';
import OrgDetailsPage from './orgs/OrgDetailsPage';
import WithOrgNav from './orgs/WithOrgNav';
import WithProjectNav from './projects/WithProjectNav';
import Banner from './ui/Banner';
import Footer from './ui/Footer';
import GlobalStyle from './ui/GlobalStyle';
import WelcomePage from './WelcomePage';

const Router = styled(ReachRouter)`
  flex: 1;
`;

class App extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  async componentDidMount() {
    this.props.setLoading(true);
    try {
      await this.props.createToken();
      await this.props.listOrgs();
      await Promise.all([
        ...this.props.orgs.map(org => org.listMembers()),
        ...this.props.orgs.map(this.props.listProjects),
      ]);
      await Promise.all(this.props.projects.map(this.props.listDevices));
      this.props.setLoading(false);
    } catch (error) {
      this.props.openBanner(<Banner>{summarize(error)}</Banner>);
    }
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { banner, drawer, dialog, isLoading, token } = this.props;
    const isVisible = !isLoading && token;
    return (
      <React.Fragment>
        <GlobalStyle />
        {isVisible && (
          <React.Fragment>
            <Router>
              <WelcomePage path={rootPath} />
              <Redirect from={orgsPath} to={rootPath} noThrow />
              <WithOrgNav path={orgDetailsPath()}>
                <OrgDetailsPage path={rootPath} />
              </WithOrgNav>
              <Redirect from={projectsPath} to={rootPath} noThrow />
              <Redirect
                from={projectDetailsPath()}
                to={projectDevicesPath()}
                noThrow
              />
              <WithProjectNav path={projectDetailsPath()}>
                <DevicesPage path={devicesPath} />
                <DeviceDetailsPage path={deviceDetailsPath()} />
              </WithProjectNav>
            </Router>
            <Footer />
            {drawer}
            {dialog}
          </React.Fragment>
        )}
        <div role="alert" aria-live="assertive">
          {banner}
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  banner: PropTypes.element,
  createToken: PropTypes.func.isRequired,
  dialog: PropTypes.element,
  drawer: PropTypes.element,
  isLoading: PropTypes.bool.isRequired,
  listDevices: PropTypes.func.isRequired,
  listOrgs: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  openBanner: PropTypes.func.isRequired,
  orgs: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  token: PropTypes.string,
};

App.defaultProps = {
  banner: null,
  dialog: null,
  drawer: null,
  token: null,
};

export default connect(
  App,
  ({ deviceStore, orgStore, projectStore, uiStore, userStore }) => ({
    banner: uiStore.banner,
    createToken: userStore.createToken,
    dialog: uiStore.dialog,
    drawer: uiStore.drawer,
    isLoading: uiStore.isLoading,
    listDevices: deviceStore.listDevices,
    listOrgs: orgStore.listOrgs,
    listProjects: projectStore.listProjects,
    openBanner: uiStore.openBanner,
    orgs: orgStore.orgs,
    projects: projectStore.projects,
    setLoading: uiStore.setLoading,
    token: userStore.token,
  }),
);
