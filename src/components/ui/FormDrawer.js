import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { summarize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import Banner from './Banner';
import { IconButton, RaisedButton } from './Buttons';
import { FlexEnd, FlexStart } from './Flexboxes';
import { Form } from './Forms';
import { PageHeader } from './Headers';
import { CloseIcon } from './Icons';
import { Drawer } from './Modals';
import { PageTitle } from './Texts';
import { Width320 } from './Widths';

const Title = styled(PageTitle)`
  margin-left: var(--size-16);
`;

function FormDrawer({
  buttonText,
  children,
  closeDrawer,
  onSubmit,
  openBanner,
  title,
}) {
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
            try {
              await onSubmit();
              closeDrawer();
            } catch (error) {
              openBanner(<Banner>{summarize(error)}</Banner>);
            }
          }}
        >
          {children}
          <FlexEnd>
            <RaisedButton type="submit">{buttonText}</RaisedButton>
          </FlexEnd>
        </Form>
      </Width320>
    </Drawer>
  );
}

FormDrawer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  closeDrawer: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  openBanner: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(
  FormDrawer,
  ({ uiStore }) => ({
    closeDrawer: uiStore.closeDrawer,
    openBanner: uiStore.openBanner,
  }),
);
