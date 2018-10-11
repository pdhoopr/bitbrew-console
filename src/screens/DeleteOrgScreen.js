import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../components/DeleteModal';
import Panel from '../components/Panel';
import { Text } from '../components/Texts';
import { connect } from '../utils/tools';
import { orgsPath } from '../utils/urls';

class DeleteOrgScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  tryToDeleteOrg = () => {
    this.props.errorBoundary(async () => {
      await this.props.deleteOrg(this.props.org);
      this.props.close();
      navigate(orgsPath);
    });
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, org } = this.props;
    return (
      <DeleteModal
        title="Delete Organization"
        onDelete={this.tryToDeleteOrg}
        close={close}
      >
        <Text>The following organization will be permanently deleted:</Text>
        <Panel items={[['Organization', org.name]]} />
        <Text>Are you sure you want to continue?</Text>
      </DeleteModal>
    );
  }
}

DeleteOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  DeleteOrgScreen,
  ({ orgStore, uiStore }) => ({
    deleteOrg: orgStore.deleteOrg,
    errorBoundary: uiStore.errorBoundary,
  }),
);
