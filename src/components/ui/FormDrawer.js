import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import GlobalContext from "../GlobalContext";
import { IconButton, RaisedButton } from "./Buttons";
import { FlexEnd, FlexStart } from "./Flexboxes";
import FocusTrap from "./FocusTrap";
import { Form } from "./Forms";
import { PageHeader } from "./Headers";
import { CloseIcon } from "./Icons";
import { Drawer } from "./Modals";
import { PageHeading } from "./Texts";
import { Width320 } from "./Widths";

const Header = styled(PageHeader)`
  padding-left: var(--size-24);
  padding-right: var(--size-24);
`;

const Heading = styled(PageHeading)`
  margin-left: var(--size-16);
`;

export default function FormDrawer({
  buttonText,
  children,
  heading,
  onSubmit,
}) {
  const { closeDrawer, errorBoundary } = useContext(GlobalContext);

  const [isSubmitting, setSubmitting] = useState(false);

  const [, method, resource] = heading.match(/^([^\s]+)\s(.+)/);
  const action = method.toUpperCase().trim() === "NEW" ? "creation" : "changes";
  const request = `${resource.toLowerCase().trim()} ${action}`;
  return (
    <Drawer onRequestClose={closeDrawer} contentLabel={heading}>
      <Header>
        <FlexStart>
          <IconButton onClick={closeDrawer} title={`Cancel ${request}`}>
            <CloseIcon />
          </IconButton>
          <Heading as="h2">{heading}</Heading>
        </FlexStart>
      </Header>
      <Width320>
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
          <FlexEnd>
            <RaisedButton type="submit">{buttonText}</RaisedButton>
          </FlexEnd>
        </Form>
      </Width320>
      {isSubmitting && <FocusTrap label={`Processing ${request}`} />}
    </Drawer>
  );
}

FormDrawer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
