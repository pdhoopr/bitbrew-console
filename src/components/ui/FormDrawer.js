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
import { PageTitle } from "./Texts";
import { Width320 } from "./Widths";

const Title = styled(PageTitle)`
  margin-left: var(--size-16);
`;

export default function FormDrawer({ buttonText, children, onSubmit, title }) {
  const { closeDrawer, errorBoundary } = useContext(Context);

  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <Drawer onRequestClose={closeDrawer} contentLabel={title}>
      <PageHeader>
        <FlexStart>
          <IconButton
            onClick={closeDrawer}
            title={`Cancel ${title.toLowerCase()}`}
          >
            <CloseIcon />
          </IconButton>
          <Title as="h2">{title}</Title>
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
      {isSubmitting && <FocusTrap label={`Processing ${title} request`} />}
    </Drawer>
  );
}

FormDrawer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
