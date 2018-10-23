import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { projectDevicesPath } from '../../utils/urls';
import Nav from '../ui/Nav';
import NavLink from '../ui/NavLink';

function WithProjectNav({ children, projectId }) {
  return (
    <React.Fragment>
      <Nav heading="Project Resources">
        <NavLink to={projectDevicesPath(projectId)}>Devices</NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

WithProjectNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  projectId: PropTypes.string,
};

WithProjectNav.defaultProps = {
  projectId: null,
};

export default observer(WithProjectNav);
