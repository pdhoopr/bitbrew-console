import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../Context";
import { IconButton, RaisedButton } from "./Buttons";
import { FlexEnd, FlexStart } from "./Flexboxes";
import FocusTrap from "./FocusTrap";
import { Form } from "./Forms";
import { PageHeader } from "./Headers";
import { CloseIcon } from "./Icons";
import { Drawer } from "./Modals";
import { PageHeading } from "./Texts";
import { Width320 } from "./Widths";

const Heading = styled(PageHeading)`
  margin-left: var(--size-16);
`;

export default function FormDrawer({
  buttonText,
  children,
  heading,
  onSubmit,
}) {
  const { closeDrawer, errorBoundary } = useContext(Context);

  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <Drawer onRequestClose={closeDrawer} contentLabel={heading}>
      <PageHeader>
        <FlexStart>
          <IconButton
            onClick={closeDrawer}
            title={`Cancel ${heading.toLowerCase()}`}
          >
            <CloseIcon />
          </IconButton>
          <Heading as="h2">{heading}</Heading>
        </FlexStart>
      </PageHeader>
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
      {isSubmitting && <FocusTrap label={`Processing ${heading} request`} />}
    </Drawer>
  );
}

FormDrawer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
