import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexEnd } from '../components/Flexboxes';
import { ContentHeader } from '../components/Headers';
import { Dialog } from '../components/Modals';
import { ContentTitle, Text } from '../components/Texts';
import { connect } from '../utils/tools';
import { orgsPath } from '../utils/urls';

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

class DeleteOrgScreen extends React.Component {
  tryToDeleteOrg = async () => {
    await this.props.deleteOrg(this.props.org);
    navigate(orgsPath);
  };

  render() {
    const { close, org } = this.props;
    const title = 'Delete Organization';
    return (
      <Dialog onRequestClose={close} contentLabel={title}>
        <ContentHeader>
          <Title>{title}</Title>
        </ContentHeader>
        <Message>
          Are you sure you want to delete the <strong>{org.name} </strong>
          organization? All projects and other data associated with this
          organization will be permanently deleted.
        </Message>
        <Actions>
          <CancelButton onClick={close}>Cancel</CancelButton>
          <RaisedButton onClick={this.tryToDeleteOrg} red>
            Delete
          </RaisedButton>
        </Actions>
      </Dialog>
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
