import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton, RaisedButton } from '../components/Buttons';
import { FlexEnd, FlexStart } from '../components/Flexboxes';
import { Form, Input, Label } from '../components/Forms';
import { PageHeader } from '../components/Headers';
import { CloseIcon } from '../components/Icons';
import { Drawer } from '../components/Modals';
import { PageTitle } from '../components/Texts';
import { Width320 } from '../components/Widths';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';
import { goToOrgs } from '../utils/urls';

const Title = styled(PageTitle.withComponent('h2'))`
  margin-left: var(--size-16);
`;

class CreateOrgPage extends React.Component {
  form = FormStore
    // prettier-ignore
    .props({
      name: '',
    })
    .create();

  tryToCreateOrg = async event => {
    event.preventDefault();
    await this.props.createOrg(this.form.serialized);
    this.props.signOut();
    goToOrgs();
  };

  render() {
    const pageTitle = 'New Organization';
    return (
      <Drawer onRequestClose={goToOrgs} contentLabel={pageTitle}>
        <PageHeader>
          <FlexStart>
            <IconButton
              onClick={goToOrgs}
              title={`Close ${pageTitle.toLowerCase()} form`}
            >
              <CloseIcon />
            </IconButton>
            <Title>{pageTitle}</Title>
          </FlexStart>
        </PageHeader>
        <Width320>
          <Form onSubmit={this.tryToCreateOrg}>
            <Label htmlFor="name">
              Name
              <Input
                id="name"
                value={this.form.name}
                onChange={this.form.setValue}
                type="text"
              />
            </Label>
            <FlexEnd>
              <RaisedButton>Create</RaisedButton>
            </FlexEnd>
          </Form>
        </Width320>
      </Drawer>
    );
  }
}

CreateOrgPage.propTypes = {
  createOrg: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  CreateOrgPage,
  ({ authStore, orgStore }) => ({
    createOrg: orgStore.createOrg,
    signOut: authStore.signOut,
  }),
);
