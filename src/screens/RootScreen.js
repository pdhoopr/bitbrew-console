import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { connect } from '../utils/tools';
import {
  devicesPath,
  orgDetailsPath,
  orgsPath,
  projectDetailsPath,
  projectsPath,
  rootPath,
} from '../utils/urls';
import DevicesScreen from './DevicesScreen';
import OrgDetailsScreen from './OrgDetailsScreen';
import OrgScreens from './OrgScreens';
import ProjectScreens from './ProjectScreens';
import WelcomeScreen from './WelcomeScreen';

const Screens = styled(Router)`
  flex: 1;
`;

class RootScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  async componentDidMount() {
    await this.props.createToken();
    await this.props.listOrgs();
    await Promise.all(this.props.orgs.map(this.props.listProjects));
    await Promise.all(this.props.projects.map(this.props.listDevices));
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { token } = this.props;
    return (
      token && (
        <React.Fragment>
          <Screens>
            <WelcomeScreen path={rootPath} />
            <Redirect from={orgsPath} to={rootPath} noThrow />
            <OrgScreens path={orgDetailsPath()}>
              <OrgDetailsScreen path={rootPath} />
            </OrgScreens>
            <Redirect from={projectsPath} to={rootPath} noThrow />
            <Redirect
              from={projectDetailsPath()}
              to={`${projectDetailsPath()}${devicesPath}`}
              noThrow
            />
            <ProjectScreens path={projectDetailsPath()}>
              <DevicesScreen path={devicesPath} />
            </ProjectScreens>
          </Screens>
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
