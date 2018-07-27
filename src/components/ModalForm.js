import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton, RaisedButton } from './Buttons';
import { FlexEnd, FlexStart } from './Flexboxes';
import { Form } from './Forms';
import { PageHeader } from './Headers';
import { CloseIcon } from './Icons';
import { Drawer } from './Modals';
import { PageTitle } from './Texts';
import { Width320 } from './Widths';

const Title = styled(PageTitle.withComponent('h2'))`
  margin-left: var(--size-16);
`;

function ModalForm({ buttonText, children, close, onSubmit, title }) {
  return (
    <Drawer onRequestClose={close} contentLabel={title}>
      <PageHeader>
        <FlexStart>
          <IconButton
            onClick={close}
            title={`Close ${title.toLowerCase()} form`}
          >
            <CloseIcon />
          </IconButton>
          <Title>{title}</Title>
        </FlexStart>
      </PageHeader>
      <Width320>
        <Form onSubmit={onSubmit}>
          {children}
          <FlexEnd>
            <RaisedButton type="submit">{buttonText}</RaisedButton>
          </FlexEnd>
        </Form>
      </Width320>
    </Drawer>
  );
}

ModalForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default observer(ModalForm);
