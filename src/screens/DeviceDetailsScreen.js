import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import {
  BackIcon,
  DisabledSyncIcon,
  EnabledSyncIcon,
} from '../components/Icons';
import { IconLink } from '../components/Links';
import List from '../components/List';
import { Content, Section } from '../components/Sections';
import { Heading, PageTitle, SectionTitle } from '../components/Texts';
import { Width640 } from '../components/Widths';
import { capitalize, connect, localizeDate } from '../utils/tools';
import { projectDevicesPath } from '../utils/urls';

const Title = styled(PageTitle)`
  margin-left: var(--size-16);
  margin-right: auto;
`;

function DeviceDetailsScreen({
  deviceId,
  getDeviceWithId,
  projectId,
  signOut,
}) {
  const device = getDeviceWithId(deviceId);
  const title = device ? device.codename : '';
  return (
    <main>
      <PageHeader>
        <FlexBetween>
          <IconLink
            to={projectDevicesPath(projectId)}
            title="View all devices for this project"
          >
            <BackIcon />
          </IconLink>
          <Title>{title}</Title>
          <Button onClick={signOut}>Sign out</Button>
        </FlexBetween>
      </PageHeader>
      {device && (
        <Width640>
          <Section>
            <SectionTitle>Overview</SectionTitle>
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
                        <EnabledSyncIcon />
                      </span>
                    ) : (
                      <span
                        title="This device is disabled"
                        aria-label="This device is disabled"
                      >
                        <DisabledSyncIcon />
                      </span>
                    ),
                  ],
                  ['Date Created', localizeDate(device.createdAt)],
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

DeviceDetailsScreen.propTypes = {
  deviceId: PropTypes.string.isRequired,
  getDeviceWithId: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  DeviceDetailsScreen,
  ({ authStore, deviceStore }) => ({
    getDeviceWithId: deviceStore.getDeviceWithId,
    signOut: authStore.signOut,
  }),
);
