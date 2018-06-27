import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexEnd } from '../components/Flexboxes';
import { ContentHeader } from '../components/Headers';
import { Dialog } from '../components/Modals';
import { ContentTitle, Text } from '../components/Texts';
import { connect } from '../utils/tools';
import { goToOrgs, goToOrgWithId } from '../utils/urls';

const Title = ContentTitle.withComponent('h2');

const padding = css`
  padding-bottom: var(--size-16);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
`;

const Message = styled(Text)`
  ${padding};
`;

const Actions = styled(FlexEnd)`
  ${padding};
`;

const CancelButton = styled(Button)`
  color: var(--color-dark-gray);
  margin-right: var(--size-16);
`;

class DeleteOrgPage extends React.Component {
  closeDeleteOrg = () => {
    goToOrgWithId(this.props.id);
  };

  tryToDeleteOrg = async () => {
    await this.props.deleteOrg(this.props.id);
    goToOrgs();
  };

  render() {
    const { getOrgWithId, id } = this.props;
    const pageTitle = 'Delete Organization';
    const org = getOrgWithId(id);
    return (
      org && (
        <Dialog onRequestClose={this.closeDeleteOrg} contentLabel={pageTitle}>
          <ContentHeader>
            <Title>{pageTitle}</Title>
          </ContentHeader>
          <Message>
            Are you sure you want to delete the <strong>{org.name} </strong>
            organization? All projects and other data associated with this
            organization will be permanently deleted.
          </Message>
          <Actions>
            <CancelButton onClick={this.closeDeleteOrg}>Cancel</CancelButton>
            <RaisedButton onClick={this.tryToDeleteOrg} red>
              Delete
            </RaisedButton>
          </Actions>
        </Dialog>
      )
    );
  }
}

DeleteOrgPage.propTypes = {
  deleteOrg: PropTypes.func.isRequired,
  getOrgWithId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(
  DeleteOrgPage,
  ({ orgStore }) => ({
    deleteOrg: orgStore.deleteOrg,
    getOrgWithId: orgStore.getOrgWithId,
  }),
);
