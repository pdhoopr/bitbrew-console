import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from '../components/Links';
import Nav from '../components/Nav';
import { devicesPath, projectDetailsPath } from '../utils/urls';

function ProjectScreens({ children, projectId }) {
  return (
    <React.Fragment>
      <Nav heading="Project Resources">
        <NavLink to={`${projectDetailsPath(projectId)}${devicesPath}`}>
          Devices
        </NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

ProjectScreens.propTypes = {
  children: PropTypes.element.isRequired,
  projectId: PropTypes.string,
};

ProjectScreens.defaultProps = {
  projectId: null,
};

export default observer(ProjectScreens);
