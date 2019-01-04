import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../Context";
import { Button } from "./Buttons";
import { FlexEnd } from "./Flexboxes";
import FocusTrap from "./FocusTrap";
import { ContentHeader } from "./Headers";
import { Dialog } from "./Modals";
import { ContentHeading } from "./Texts";

const Message = styled.div`
  padding-left: var(--size-24);
  padding-right: var(--size-24);
`;

const Actions = styled(FlexEnd)`
  color: var(--color-dark-gray);
  padding: var(--size-16) var(--size-16) var(--size-8);
`;

const DeleteButton = styled(Button)`
  color: var(--color-red);
  margin-left: var(--size-8);
`;

export default function DeleteDialog({ children, heading, onDelete }) {
  const { closeDialog, errorBoundary } = useContext(Context);

  const [isDeleting, setDeleting] = useState(false);

  return (
    <Dialog onRequestClose={closeDialog} contentLabel={heading}>
      <ContentHeader>
        <ContentHeading as="h2">{heading}</ContentHeading>
      </ContentHeader>
      <Message>{children}</Message>
      <Actions>
        <Button onClick={closeDialog}>Cancel</Button>
        <DeleteButton
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
        </DeleteButton>
      </Actions>
      {isDeleting && <FocusTrap label={`Processing ${heading} request`} />}
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
