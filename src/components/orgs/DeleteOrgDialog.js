import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../../utils/helpers';
import { orgsPath } from '../../utils/urls';
import DeleteDialog from '../ui/DeleteDialog';
import Panel from '../ui/Panel';
import { Text } from '../ui/Texts';

function DeleteOrgDialog({ deleteOrg, org }) {
  return (
    <DeleteDialog
      title="Delete Organization"
      onDelete={async () => {
        await deleteOrg(org);
        navigate(orgsPath);
      }}
    >
      <Text>The following organization will be permanently deleted:</Text>
      <Panel items={[['Organization', org.name]]} />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteOrgDialog.propTypes = {
  deleteOrg: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  DeleteOrgDialog,
  ({ orgStore }) => ({
    deleteOrg: orgStore.deleteOrg,
  }),
);
