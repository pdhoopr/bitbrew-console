import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton, RaisedButton } from '../components/Buttons';
import { FlexEnd, FlexStart } from '../components/Flexboxes';
import Form from '../components/Form';
import { CloseIcon } from '../components/Icons';
import { Input, Label } from '../components/Inputs';
import Modal from '../components/Modal';
import { PageTitle } from '../components/Typography';
import FormValues from '../models/FormValues';
import { connect } from '../utils/tools';
import { goToOrgs } from '../utils/urls';

const Header = styled(FlexStart)`
  margin-bottom: var(--size-32);
`;

const Title = styled(PageTitle.withComponent('h2'))`
  margin-left: var(--size-20);
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
          goToOrgs();
        } catch (error) {
          console.log(error);
        }
      },
    }))
    .create();

  render() {
    const pageTitle = 'New Organization';
    return (
      <Modal isOpen onRequestClose={goToOrgs} contentLabel={pageTitle}>
        <Header>
          <IconButton onClick={goToOrgs}>
            <CloseIcon />
          </IconButton>
          <Title>{pageTitle}</Title>
        </Header>
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
