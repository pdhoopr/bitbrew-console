import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { summarize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import Banner from './Banner';
import { Button, RaisedButton } from './Buttons';
import { FlexEnd } from './Flexboxes';
import { ContentHeader } from './Headers';
import { Dialog } from './Modals';
import { ContentTitle } from './Texts';

const padding = css`
  padding-bottom: var(--size-16);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
`;

const Message = styled.div`
  ${padding};
`;

const Actions = styled(FlexEnd)`
  ${padding};
`;

const CancelButton = styled(Button)`
  color: var(--color-dark-gray);
  margin-right: var(--size-16);
`;

function DeleteDialog({ children, closeDialog, onDelete, openBanner, title }) {
  return (
    <Dialog onRequestClose={closeDialog} contentLabel={title}>
      <ContentHeader>
        <ContentTitle as="h2">{title}</ContentTitle>
      </ContentHeader>
      <Message>{children}</Message>
      <Actions>
        <CancelButton onClick={closeDialog}>Cancel</CancelButton>
        <RaisedButton
          onClick={async () => {
            try {
              await onDelete();
              closeDialog();
            } catch (error) {
              openBanner(<Banner>{summarize(error)}</Banner>);
            }
          }}
          red
        >
          Delete
        </RaisedButton>
      </Actions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.node.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  openBanner: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(
  DeleteDialog,
  ({ uiStore }) => ({
    closeDialog: uiStore.closeDialog,
    openBanner: uiStore.openBanner,
  }),
);
