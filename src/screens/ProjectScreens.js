import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import Nav from '../components/Nav';
import NavLink from '../components/NavLink';
import { projectDevicesPath } from '../utils/urls';

function ProjectScreens({ children, projectId }) {
  return (
    <React.Fragment>
      <Nav heading="Project Resources">
        <NavLink to={projectDevicesPath(projectId)}>Devices</NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

ProjectScreens.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  projectId: PropTypes.string,
};

ProjectScreens.defaultProps = {
  projectId: null,
};

export default observer(ProjectScreens);
