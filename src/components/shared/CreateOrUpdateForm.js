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
import { capitalize } from "../../utils";
import GlobalContext from "../GlobalContext";
import Main from "./Main";
import resourceTypes from "./resourceTypes";

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

export default function CreateOrUpdateForm({
  children,
  isUpdate,
  onSubmit,
  resource,
}) {
  const { closeDrawer, errorBoundary } = useContext(GlobalContext);

  const [isSubmitting, setSubmitting] = useState(false);

  const heading = `${isUpdate ? "Edit" : "New"} ${capitalize(resource)}`;
  const action = `${resource} ${isUpdate ? "changes" : "creation"}`;
  return (
    <Drawer onRequestClose={closeDrawer} contentLabel={heading}>
      <Wrapper as="section">
        <CloseButton onClick={closeDrawer} title={`Cancel ${action}`}>
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
            <SubmitButton type="submit">
              {isUpdate ? "Save" : "Create"}
            </SubmitButton>
          </Form>
        </Content>
      </Wrapper>
      {isSubmitting && <FocusTrap label={`Processing ${action}`} />}
    </Drawer>
  );
}

CreateOrUpdateForm.propTypes = {
  children: PropTypes.node.isRequired,
  isUpdate: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  resource: PropTypes.oneOf(Object.values(resourceTypes)).isRequired,
};

CreateOrUpdateForm.defaultProps = {
  isUpdate: false,
};
