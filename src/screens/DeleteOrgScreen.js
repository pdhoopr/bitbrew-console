import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../components/DeleteModal';
import { connect } from '../utils/tools';
import { orgsPath } from '../utils/urls';

class DeleteOrgScreen extends React.Component {
  tryToDeleteOrg = async () => {
    await this.props.deleteOrg(this.props.org);
    navigate(orgsPath);
  };

  render() {
    const { close, org } = this.props;
    return (
      <DeleteModal
        title="Delete Organization"
        onDelete={this.tryToDeleteOrg}
        close={close}
      >
        Are you sure you want to delete the <strong>{org.name}</strong>{' '}
        organization? All projects and other data associated with this
        organization will be permanently deleted.{' '}
      </DeleteModal>
    );
  }
}

DeleteOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  DeleteOrgScreen,
  ({ orgStore }) => ({
    deleteOrg: orgStore.deleteOrg,
  }),
);
