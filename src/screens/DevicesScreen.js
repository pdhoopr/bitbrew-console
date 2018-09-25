import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { PageTitle } from '../components/Texts';
import { Width640 } from '../components/Widths';
import { capitalize, connect, localizeDate } from '../utils/tools';

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

  &:last-of-type {
    width: 100%;
  }
`;

const TableHeaderCell = styled(TableCell.withComponent('th'))`
  font-weight: var(--weight-bold);
`;

const EmptyState = styled(TableCell)`
  color: var(--color-dark-gray);
  text-align: center;
`;

function DevicesScreen({ getProjectWithId, projectId, signOut }) {
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
              </tr>
            </thead>
            <tbody>
              {devices.length > 0 ? (
                devices.map(device => (
                  <TableRow key={device.id} disabled={!device.enabled}>
                    <TableCell>
                      {device.codename}
                      {!device.enabled && ' (disabled)'}
                    </TableCell>
                    <TableCell>{localizeDate(device.createdAt)}</TableCell>
                    <TableCell>{capitalize(device.type)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <EmptyState colSpan={3}>
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
