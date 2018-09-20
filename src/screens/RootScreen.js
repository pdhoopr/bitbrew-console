import { Redirect, Router } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import OrgNav from '../components/OrgNav';
import ProjectNav from '../components/ProjectNav';
import { connect } from '../utils/tools';
import * as urls from '../utils/urls';
import DevicesScreen from './DevicesScreen';
import OrgDetailsScreen from './OrgDetailsScreen';
import WelcomeScreen from './WelcomeScreen';

const Wrapper = styled.main`
  flex: 1;
`;

class RootScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  async componentDidMount() {
    await this.props.createToken();
    await this.props.listOrgs();
    await Promise.all(this.props.orgsAtoZ.map(this.props.listProjects));
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
  createToken: PropTypes.func.isRequired,
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
    createToken: authStore.createToken,
    listOrgs: orgStore.listOrgs,
    listProjects: projectStore.listProjects,
    orgsAtoZ: orgStore.orgsAtoZ,
    token: authStore.token,
  }),
);
