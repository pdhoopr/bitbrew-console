import { observer } from 'mobx-react';
import React from 'react';
import { devicesPath } from '../utils/urls';
import Nav from './Nav';

function ProjectNav() {
  return (
    <Nav
      heading="Project Resources"
      links={[
        {
          text: 'Devices',
          to: devicesPath,
        },
      ]}
    />
  );
}

export default observer(ProjectNav);
