import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, RaisedButton } from '../components/Buttons';
import { FlexEnd, FlexStart } from '../components/Flexboxes';
import Form from '../components/Form';
import { CloseIcon } from '../components/Icons';
import { Input, Label } from '../components/Inputs';
import Modal from '../components/Modal';
import { PageTitle } from '../components/Titles';
import FormValues from '../models/FormValues';
import connect from '../utils/connect';
import urls from '../utils/urls';

const Header = FlexStart.extend`
  margin-bottom: var(--size-32);
`;

const Title = PageTitle.withComponent('h2').extend`
  margin-left: var(--size-20);
`;

class CreateOrgPage extends React.Component {
  goToOrgs = () => {
    this.props.history.push(urls.orgs);
  };

  formValues = FormValues
    // prettier-ignore
    .props({
      name: '',
      properName: '',
    })
    .actions(self => ({
      submit: async event => {
        event.preventDefault();
        try {
          await this.props.createOrg(self.serialized);
          this.goToOrgs();
          this.props.signOut();
        } catch (error) {
          console.log(error);
        }
      },
    }))
    .create();

  render() {
    const pageTitle = 'New Organization';
    return (
      <Modal isOpen onRequestClose={this.goToOrgs} contentLabel={pageTitle}>
        <Header>
          <IconButton onClick={this.goToOrgs}>
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
          <Label htmlFor="properName">
            Display Name
            <Input
              id="properName"
              value={this.formValues.properName}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  CreateOrgPage,
  store => ({
    createOrg: store.createOrg,
    signOut: store.signOut,
  }),
);
