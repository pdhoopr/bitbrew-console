import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CloseIcon,
  Drawer,
  FocusTrap,
  Form,
  Heading1,
  IconButton,
  RaisedButton,
} from "../../design-system";
import AppContext from "../AppContext";
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
  action,
  children,
  closeTooltip,
  heading,
  onSubmit,
}) {
  const { closeDrawer, errorBoundary } = useContext(AppContext);

  const [isSubmitting, setSubmitting] = useState(false);

  const [, description] = closeTooltip.match(/^\w+\s+(.+)$/);
  return (
    <Drawer onRequestClose={closeDrawer} contentLabel={heading}>
      <Wrapper as="section">
        <CloseButton onClick={closeDrawer} title={closeTooltip}>
          <CloseIcon />
        </CloseButton>
        <Heading1 as="h2">{heading}</Heading1>
        <Content>
          <Form
            onSubmit={async event => {
              event.preventDefault();
              setSubmitting(true);
              const error = await errorBoundary(async () => {
                await onSubmit();
                closeDrawer();
              });
              if (error && error.response.status !== 408) {
                setSubmitting(false);
              }
            }}
          >
            {children}
            <SubmitButton type="submit">{action}</SubmitButton>
          </Form>
        </Content>
      </Wrapper>
      {isSubmitting && <FocusTrap label={`Processing ${description}`} />}
    </Drawer>
  );
}

FormDrawer.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closeTooltip: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
