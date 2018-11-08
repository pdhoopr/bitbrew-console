import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import Context from "../Context";
import { Button, RaisedButton } from "./Buttons";
import { FlexEnd } from "./Flexboxes";
import FocusTrap from "./FocusTrap";
import { ContentHeader } from "./Headers";
import { Dialog } from "./Modals";
import { ContentTitle } from "./Texts";

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

export default function DeleteDialog({ children, onDelete, title }) {
  const { closeDialog, errorBoundary } = useContext(Context);

  const [isDeleting, setDeleting] = useState(false);

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
            setDeleting(true);
            const error = await errorBoundary(async () => {
              await onDelete();
              closeDialog();
            });
            if (error && error.response.status !== 408) {
              setDeleting(false);
            }
          }}
          red
        >
          Delete
        </RaisedButton>
      </Actions>
      {isDeleting && <FocusTrap label={`Processing ${title} request`} />}
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
