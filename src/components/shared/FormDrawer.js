import PropTypes from "prop-types";
import React, { useRef } from "react";
import styled from "styled-components";
import {
  Card,
  CloseIcon,
  Drawer,
  Form,
  Heading1,
  IconButton,
  RaisedButton,
} from "../../design-system";
import { generateId } from "../../utils";
import Main from "./Main";

const Wrapper = styled(Main)`
  max-width: var(--size-320);
  padding-bottom: var(--size-32);
  padding-top: var(--size-32);
`;

const CloseButton = styled(IconButton)`
  left: calc(-1 * var(--size-52));
  position: absolute;
  top: var(--size-34);
`;

const Content = styled(Card)`
  margin-top: var(--size-32);
  padding-bottom: var(--size-16);
  padding-top: var(--size-16);
`;

const SubmitButton = styled(RaisedButton)`
  display: block;
  margin-left: auto;
  margin-right: var(--size-24);
  margin-top: var(--size-8);
`;

export default function FormDrawer({
  children,
  heading,
  onClose,
  onSubmit,
  submitAction,
}) {
  const headingIdRef = useRef(generateId(`${FormDrawer.name}__heading`));

  return (
    <Drawer onClose={onClose} aria-labelledby={headingIdRef.current}>
      <Wrapper as="section">
        <CloseButton onClick={onClose} title="Cancel">
          <CloseIcon />
        </CloseButton>
        <Heading1 as="h2" id={headingIdRef.current}>
          {heading}
        </Heading1>
        <Content>
          <Form onSubmit={onSubmit}>
            {children}
            <SubmitButton type="submit">{submitAction}</SubmitButton>
          </Form>
        </Content>
      </Wrapper>
    </Drawer>
  );
}

FormDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitAction: PropTypes.string.isRequired,
};
