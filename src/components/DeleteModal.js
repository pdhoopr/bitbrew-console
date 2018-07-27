import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
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

function DeleteModal({ children, close, onDelete, title }) {
  return (
    <Dialog onRequestClose={close} contentLabel={title}>
      <ContentHeader>
        <Title>{title}</Title>
      </ContentHeader>
      <Message>{children}</Message>
      <Actions>
        <CancelButton onClick={close}>Cancel</CancelButton>
        <RaisedButton onClick={onDelete} red>
          Delete
        </RaisedButton>
      </Actions>
    </Dialog>
  );
}

DeleteModal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default observer(DeleteModal);
