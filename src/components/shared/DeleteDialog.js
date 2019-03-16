import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button, Dialog, FocusTrap, Heading3, Text } from "../../design-system";
import { capitalize } from "../../utils";
import AppContext from "../AppContext";
import Name from "./Name";
import resourceTypes from "./resourceTypes";

const Heading = styled(Heading3)`
  padding: var(--size-16) var(--size-24);
`;

const Message = styled(Text)`
  padding-left: var(--size-24);
  padding-right: var(--size-24);
`;

const Actions = styled.div`
  color: var(--color-dark-gray);
  display: flex;
  justify-content: flex-end;
  padding: var(--size-16) var(--size-16) var(--size-8);
`;

const DeleteButton = styled(Button)`
  color: var(--color-red);
  margin-left: var(--size-8);
`;

export default function DeleteDialog({ children, onConfirm, resource }) {
  const { closeDialog, errorBoundary } = useContext(AppContext);

  const [isDeleting, setDeleting] = useState(false);

  const heading = `Delete ${capitalize(resource.impl)}`;
  return (
    <Dialog onRequestClose={closeDialog} contentLabel={heading}>
      <section>
        <Heading as="h2">{heading}</Heading>
        <Message>
          Are you sure you want to delete the {resource.impl}{" "}
          <strong>
            <Name resource={resource} />
          </strong>
          ? {children}
        </Message>
        <Actions>
          <Button onClick={closeDialog}>Cancel</Button>
          <DeleteButton
            onClick={async () => {
              setDeleting(true);
              const error = await errorBoundary(async () => {
                await onConfirm();
                closeDialog();
              });
              if (error && error.response.status !== 408) {
                setDeleting(false);
              }
            }}
          >
            Delete
          </DeleteButton>
        </Actions>
      </section>
      {isDeleting && (
        <FocusTrap label={`Processing ${resource.impl} deletion`} />
      )}
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    impl: PropTypes.oneOf(resourceTypes).isRequired,
  }).isRequired,
};

DeleteDialog.defaultProps = {
  children: null,
};
