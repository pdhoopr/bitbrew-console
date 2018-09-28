import { Redirect, Router as ReachRouter } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import UiStore from '../stores/UiStore';
import { connect } from '../utils/tools';
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
import DeviceDetailsScreen from './DeviceDetailsScreen';
import DevicesScreen from './DevicesScreen';
import OrgDetailsScreen from './OrgDetailsScreen';
import OrgScreens from './OrgScreens';
import ProjectScreens from './ProjectScreens';
import WelcomeScreen from './WelcomeScreen';

const Router = styled(ReachRouter)`
  flex: 1;
`;

class RootScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  rootUi = UiStore.create({
    isLoading: true,
  });

  async componentDidMount() {
    await this.props.createToken();
    await this.props.listOrgs();
    await Promise.all(this.props.orgs.map(this.props.listProjects));
    await Promise.all(this.props.projects.map(this.props.listDevices));
    this.rootUi.setLoading(false);
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { token } = this.props;
    const isVisible = !this.rootUi.isLoading && token;
    return (
      isVisible && (
        <React.Fragment>
          <Router>
            <WelcomeScreen path={rootPath} />
            <Redirect from={orgsPath} to={rootPath} noThrow />
            <OrgScreens path={orgDetailsPath()}>
              <OrgDetailsScreen path={rootPath} />
            </OrgScreens>
            <Redirect from={projectsPath} to={rootPath} noThrow />
            <Redirect
              from={projectDetailsPath()}
              to={projectDevicesPath()}
              noThrow
            />
            <ProjectScreens path={projectDetailsPath()}>
              <DevicesScreen path={devicesPath} />
              <DeviceDetailsScreen path={deviceDetailsPath()} />
            </ProjectScreens>
          </Router>
          <Footer />
        </React.Fragment>
      )
    );
  }
}

RootScreen.propTypes = {
  createToken: PropTypes.func.isRequired,
  listDevices: PropTypes.func.isRequired,
  listOrgs: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  orgs: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  token: PropTypes.string,
};

RootScreen.defaultProps = {
  token: null,
};

export default connect(
  RootScreen,
  ({ authStore, deviceStore, orgStore, projectStore }) => ({
    createToken: authStore.createToken,
    listDevices: deviceStore.listDevices,
    listOrgs: orgStore.listOrgs,
    listProjects: projectStore.listProjects,
    orgs: orgStore.orgs,
    projects: projectStore.projects,
    token: authStore.token,
  }),
);
