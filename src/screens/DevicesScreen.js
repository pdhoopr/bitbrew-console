import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { PageTitle } from '../components/Texts';
import { connect } from '../utils/tools';

function DevicesScreen({ signOut }) {
  return (
    <PageHeader>
      <FlexBetween>
        <PageTitle>Devices</PageTitle>
        <Button onClick={signOut}>Sign out</Button>
      </FlexBetween>
    </PageHeader>
  );
}

DevicesScreen.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default connect(
  DevicesScreen,
  ({ authStore }) => ({
    signOut: authStore.signOut,
  }),
);
