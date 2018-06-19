import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton, RaisedButton } from '../components/Buttons';
import { FlexEnd, FlexStart } from '../components/Flexboxes';
import { Form, Input, Label } from '../components/Forms';
import { PageHeader } from '../components/Headers';
import { CloseIcon } from '../components/Icons';
import Modal from '../components/Modal';
import { PageTitle } from '../components/Texts';
import { Width320 } from '../components/Widths';
import FormValues from '../models/FormValues';
import { connect } from '../utils/tools';
import { goToListOrgs } from '../utils/urls';

const Title = styled(PageTitle.withComponent('h2'))`
  margin-left: var(--size-16);
`;

class CreateOrgPage extends React.Component {
  formValues = FormValues
    // prettier-ignore
    .props({
      name: '',
    })
    .actions(self => ({
      submit: async event => {
        event.preventDefault();
        try {
          await this.props.createOrg(self.serialized);
          this.props.signOut();
          goToListOrgs();
        } catch (error) {
          console.log(error);
        }
      },
    }))
    .create();

  render() {
    const pageTitle = 'New Organization';
    return (
      <Modal isOpen onRequestClose={goToListOrgs} contentLabel={pageTitle}>
        <PageHeader>
          <FlexStart>
            <IconButton onClick={goToListOrgs}>
              <CloseIcon />
            </IconButton>
            <Title>{pageTitle}</Title>
          </FlexStart>
        </PageHeader>
        <Width320>
          <Form onSubmit={this.formValues.submit}>
            <Label htmlFor="name">
              Name
              <Input
                id="name"
                value={this.formValues.name}
                onChange={this.formValues.change}
                type="text"
              />
            </Label>
            <FlexEnd>
              <RaisedButton>Create</RaisedButton>
            </FlexEnd>
          </Form>
        </Width320>
      </Modal>
    );
  }
}

CreateOrgPage.propTypes = {
  createOrg: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  CreateOrgPage,
  store => ({
    createOrg: store.createOrg,
    signOut: store.signOut,
  }),
);
