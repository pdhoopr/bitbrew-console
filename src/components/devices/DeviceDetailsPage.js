import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { capitalize, localize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import { projectDevicesPath } from '../../utils/urls';
import AppBar from '../ui/AppBar';
import { RaisedButton } from '../ui/Buttons';
import { FlexBetween } from '../ui/Flexboxes';
import { PageHeader } from '../ui/Headers';
import { BackIcon, SyncDisabledIcon, SyncIcon } from '../ui/Icons';
import { IconLink } from '../ui/Links';
import List from '../ui/List';
import { Content, Section } from '../ui/Sections';
import { Heading, PageTitle, SectionTitle } from '../ui/Texts';
import { Width640 } from '../ui/Widths';
import DeleteDeviceDialog from './DeleteDeviceDialog';
import EditDeviceForm from './EditDeviceForm';

const Title = styled(PageTitle)`
  margin-left: var(--size-16);
  margin-right: auto;
`;

const EditDeviceButton = styled(RaisedButton)`
  background-color: var(--color-black);
  margin-left: auto;
  margin-right: var(--size-16);
`;

function DeviceDetailsPage({
  deviceId,
  getDeviceWithId,
  openDialog,
  openDrawer,
  projectId,
}) {
  const device = getDeviceWithId(deviceId);
  return (
    <main>
      <PageHeader>
        <AppBar>
          <IconLink
            to={projectDevicesPath(projectId)}
            title="View all devices for this project"
          >
            <BackIcon />
          </IconLink>
          <Title>{device ? device.codename : ''}</Title>
        </AppBar>
      </PageHeader>
      {device && (
        <Width640>
          <Section>
            <FlexBetween>
              <SectionTitle>Overview</SectionTitle>
              <EditDeviceButton
                onClick={() => {
                  openDrawer(<EditDeviceForm device={device} />);
                }}
              >
                Edit
              </EditDeviceButton>
              <RaisedButton
                onClick={() => {
                  openDialog(<DeleteDeviceDialog device={device} />);
                }}
                red
              >
                Delete
              </RaisedButton>
            </FlexBetween>
            <Content>
              <List
                items={[
                  ['ID', device.id],
                  [
                    'Enabled',
                    device.enabled ? (
                      <span
                        title="This device is enabled"
                        aria-label="This device is enabled"
                      >
                        <SyncIcon />
                      </span>
                    ) : (
                      <span
                        title="This device is disabled"
                        aria-label="This device is disabled"
                      >
                        <SyncDisabledIcon />
                      </span>
                    ),
                  ],
                  ['Date Created', localize(device.createdAt)],
                  ['Type', capitalize(device.type)],
                ]}
              />
            </Content>
          </Section>
          <Section>
            <SectionTitle>{capitalize(device.type)} Settings</SectionTitle>
            <Heading gray>
              Additional details about your device that are relevant to its
              type.
            </Heading>
            <Content>
              <List
                items={[
                  ['Serial Number', device.serialNumber],
                  ['IMEI', device.imei],
                ]}
              />
            </Content>
          </Section>
        </Width640>
      )}
    </main>
  );
}

DeviceDetailsPage.propTypes = {
  deviceId: PropTypes.string.isRequired,
  getDeviceWithId: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default connect(
  DeviceDetailsPage,
  ({ deviceStore, uiStore }) => ({
    getDeviceWithId: deviceStore.getDeviceWithId,
    openDialog: uiStore.openDialog,
    openDrawer: uiStore.openDrawer,
  }),
);
