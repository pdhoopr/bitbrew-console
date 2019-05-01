import PropTypes from "prop-types";
import React, { useRef } from "react";
import styled from "styled-components";
import { Button, Dialog, Heading3, Text } from "../../design-system";
import { generateId } from "../../utils";

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

const ConfirmButton = styled(Button)`
  color: var(--color-green);
  margin-left: var(--size-8);
`;

const WarningButton = styled(ConfirmButton)`
  color: var(--color-red);
`;

export default function AlertDialog({
  children,
  closeAction,
  confirmAction,
  heading,
  infoLevel,
  onClose,
  onConfirm,
}) {
  const headingIdRef = useRef(generateId(`${AlertDialog.name}__heading`));
  const messageIdRef = useRef(generateId(`${AlertDialog.name}__message`));

  return (
    <Dialog
      onClose={onClose || onConfirm}
      aria-labelledby={headingIdRef.current}
      aria-describedby={messageIdRef.current}
      role="alertdialog"
    >
      <section>
        <Heading as="h2" id={headingIdRef.current}>
          {heading}
        </Heading>
        <Message id={messageIdRef.current}>{children}</Message>
        <Actions>
          {closeAction && <Button onClick={onClose}>{closeAction}</Button>}
          {infoLevel === "info" && (
            <ConfirmButton onClick={onConfirm}>{confirmAction}</ConfirmButton>
          )}
          {infoLevel === "warning" && (
            <WarningButton onClick={onConfirm}>{confirmAction}</WarningButton>
          )}
        </Actions>
      </section>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  children: PropTypes.node.isRequired,
  closeAction: PropTypes.string,
  confirmAction: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  infoLevel: PropTypes.oneOf(["info", "warning"]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
};

AlertDialog.defaultProps = {
  closeAction: null,
  infoLevel: "info",
  onClose: null,
};
