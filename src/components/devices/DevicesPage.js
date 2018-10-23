import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { capitalize, localize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import { projectDeviceDetailsPath } from '../../utils/urls';
import AppBar from '../ui/AppBar';
import { IconButton } from '../ui/Buttons';
import { PageHeader } from '../ui/Headers';
import { AddIcon } from '../ui/Icons';
import { Link } from '../ui/Links';
import Table, { Cell, Row } from '../ui/Table';
import { PageTitle } from '../ui/Texts';
import { Width640 } from '../ui/Widths';
import NewDeviceForm from './NewDeviceForm';

const AddIconWrapper = styled.span`
  display: block;
  margin-bottom: calc(-1 * var(--size-8));
  margin-top: calc(-1 * var(--size-8));
  text-align: right;
`;

function DevicesPage({ getProjectWithId, openDrawer, projectId }) {
  const project = getProjectWithId(projectId);
  const devices = project ? project.devices : [];
  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageTitle>Devices</PageTitle>
        </AppBar>
      </PageHeader>
      {project && (
        <Width640>
          <Table
            columns={[
              'Codename',
              'Date Created',
              'Type',
              <AddIconWrapper key="New Device">
                <IconButton
                  onClick={() => {
                    openDrawer(<NewDeviceForm project={project} />);
                  }}
                  title="Open new device form"
                >
                  <AddIcon />
                </IconButton>
              </AddIconWrapper>,
            ]}
            emptyState="There are no devices in this project yet."
          >
            {devices.map(device => {
              const codename = device.codename.trim();
              return (
                <Row key={device.id} italic={!device.enabled}>
                  <Cell gray={!codename}>
                    <Link to={projectDeviceDetailsPath(project.id, device.id)}>
                      {codename || 'Untitled device'}
                      {!device.enabled && ' (disabled)'}
                    </Link>
                  </Cell>
                  <Cell>{localize(device.createdAt)}</Cell>
                  <Cell>{capitalize(device.type)}</Cell>
                  <Cell />
                </Row>
              );
            })}
          </Table>
        </Width640>
      )}
    </main>
  );
}

DevicesPage.propTypes = {
  getProjectWithId: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default connect(
  DevicesPage,
  ({ projectStore, uiStore }) => ({
    getProjectWithId: projectStore.getProjectWithId,
    openDrawer: uiStore.openDrawer,
  }),
);
