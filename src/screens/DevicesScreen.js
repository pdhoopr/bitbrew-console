import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, IconButton } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { AddIcon } from '../components/Icons';
import { Link } from '../components/Links';
import { PageTitle } from '../components/Texts';
import { Width640 } from '../components/Widths';
import UiStore from '../stores/UiStore';
import { capitalize, connect, localizeDate } from '../utils/tools';
import { projectDeviceDetailsPath } from '../utils/urls';
import NewDeviceScreen from './NewDeviceScreen';

const Table = styled.table`
  background-color: var(--color-white);
  border-collapse: collapse;
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  font-size: var(--size-14);
  line-height: var(--size-20);
  width: 100%;
`;

const TableRow = styled.tr`
  border-top: 1px solid var(--color-medium-gray);
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
`;

const TableCell = styled.td`
  padding: var(--size-16) var(--size-24);
  text-align: left;
  white-space: nowrap;
`;

const TableHeaderCell = styled(TableCell.withComponent('th'))`
  font-weight: var(--weight-bold);
  padding-bottom: var(--size-8);
  padding-top: var(--size-8);

  &:last-of-type {
    text-align: right;
  }
`;

const EmptyState = styled(TableCell)`
  color: var(--color-dark-gray);
  text-align: center;
`;

class DevicesScreen extends React.Component {
  newDeviceUi = UiStore.create();

  render() {
    const { getProjectWithId, projectId, signOut } = this.props;
    const project = getProjectWithId(projectId);
    const devices = project ? project.devices : [];
    return (
      <main>
        <PageHeader>
          <FlexBetween>
            <PageTitle>Devices</PageTitle>
            <Button onClick={signOut}>Sign out</Button>
          </FlexBetween>
        </PageHeader>
        {project && (
          <Width640>
            <Table>
              <thead>
                <tr>
                  <TableHeaderCell>Codename</TableHeaderCell>
                  <TableHeaderCell>Date Created</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>
                    <IconButton
                      onClick={this.newDeviceUi.open}
                      title="Open new device form"
                    >
                      <AddIcon />
                    </IconButton>
                    {this.newDeviceUi.isOpen && (
                      <NewDeviceScreen
                        project={project}
                        close={this.newDeviceUi.close}
                      />
                    )}
                  </TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {devices.length > 0 ? (
                  devices.map(device => (
                    <TableRow key={device.id} disabled={!device.enabled}>
                      <TableCell>
                        <Link
                          to={projectDeviceDetailsPath(project.id, device.id)}
                        >
                          {device.codename}
                          {!device.enabled && ' (disabled)'}
                        </Link>
                      </TableCell>
                      <TableCell>{localizeDate(device.createdAt)}</TableCell>
                      <TableCell>{capitalize(device.type)}</TableCell>
                      <TableCell />
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <EmptyState colSpan={4}>
                      There are no devices in this project yet.
                    </EmptyState>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </Width640>
        )}
      </main>
    );
  }
}

DevicesScreen.propTypes = {
  getProjectWithId: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  DevicesScreen,
  ({ authStore, projectStore }) => ({
    getProjectWithId: projectStore.getProjectWithId,
    signOut: authStore.signOut,
  }),
);
