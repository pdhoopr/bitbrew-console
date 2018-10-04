import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import AppBar from '../components/AppBar';
import { IconButton } from '../components/Buttons';
import { PageHeader } from '../components/Headers';
import { AddIcon } from '../components/Icons';
import { Link } from '../components/Links';
import Table, { Cell, Row } from '../components/Table';
import { PageTitle } from '../components/Texts';
import { Width640 } from '../components/Widths';
import UiStore from '../stores/UiStore';
import { capitalize, connect, localizeDate } from '../utils/tools';
import { projectDeviceDetailsPath } from '../utils/urls';
import NewDeviceScreen from './NewDeviceScreen';

const AddIconWrapper = styled.span`
  display: block;
  margin-bottom: calc(-1 * var(--size-8));
  margin-top: calc(-1 * var(--size-8));
  text-align: right;
`;

class DevicesScreen extends React.Component {
  newDeviceUi = UiStore.create();

  render() {
    const { getProjectWithId, projectId } = this.props;
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
                </AddIconWrapper>,
              ]}
              emptyState="There are no devices in this project yet."
            >
              {devices.map(device => {
                const codename = device.codename.trim();
                return (
                  <Row key={device.id} italic={!device.enabled}>
                    <Cell gray={!codename}>
                      <Link
                        to={projectDeviceDetailsPath(project.id, device.id)}
                      >
                        {codename || 'Untitled device'}
                        {!device.enabled && ' (disabled)'}
                      </Link>
                    </Cell>
                    <Cell>{localizeDate(device.createdAt)}</Cell>
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
}

DevicesScreen.propTypes = {
  getProjectWithId: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default connect(
  DevicesScreen,
  ({ projectStore }) => ({
    getProjectWithId: projectStore.getProjectWithId,
  }),
);
