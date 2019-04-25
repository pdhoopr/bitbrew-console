import PropTypes from "prop-types";
import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { Button, Dialog, Heading3, Text } from "../../design-system";
import { capitalize, generateId } from "../../utils";
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
  const { catchErrorsSendingResource, closeDialog } = useContext(AppContext);

  const headingIdRef = useRef(generateId(`${DeleteDialog.name}__heading`));
  const messageIdRef = useRef(generateId(`${DeleteDialog.name}__message`));

  const heading = `Delete ${capitalize(resource.impl)}`;
  return (
    <Dialog
      onClose={closeDialog}
      aria-labelledby={headingIdRef.current}
      aria-describedby={messageIdRef.current}
    >
      <section>
        <Heading as="h2" id={headingIdRef.current}>
          {heading}
        </Heading>
        <Message id={messageIdRef.current}>
          Are you sure you want to delete the {resource.impl}{" "}
          <strong>
            <Name resource={resource} />
          </strong>
          ? {children}
        </Message>
        <Actions>
          <Button onClick={closeDialog}>Cancel</Button>
          <DeleteButton
            onClick={() => {
              catchErrorsSendingResource(resource.impl, async () => {
                await onConfirm();
                closeDialog();
                return { status: 204 };
              });
            }}
          >
            Delete
          </DeleteButton>
        </Actions>
      </section>
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
