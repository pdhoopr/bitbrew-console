import { navigate } from '@reach/router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { orgsPath } from '../utils/urls';
import { Button, RaisedButton } from './Buttons';
import { FlexEnd } from './Flexboxes';
import { ContentHeader } from './Headers';
import { Dialog } from './Modals';
import { ContentTitle, Text } from './Texts';

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

class DeleteOrgModal extends React.Component {
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

DeleteOrgModal.propTypes = {
  close: PropTypes.func.isRequired,
  deleteOrg: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(DeleteOrgModal);
