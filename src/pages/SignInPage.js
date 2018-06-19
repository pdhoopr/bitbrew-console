import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { RaisedButton } from '../components/Buttons';
import { FlexCenter, FlexEnd } from '../components/Flexboxes';
import { Form, Input, Label } from '../components/Forms';
import { PageHeader } from '../components/Headers';
import { Link } from '../components/Links';
import { Logotype } from '../components/Logos';
import { ContentTitle, Text } from '../components/Texts';
import { Width320 } from '../components/Widths';
import FormValues from '../models/FormValues';
import { connect } from '../utils/tools';

const Title = styled(ContentTitle.withComponent('h1'))`
  margin-bottom: var(--size-16);
`;

const ContactUs = styled(Text)`
  margin-top: var(--size-32);
  text-align: center;

  ${/* sc-selector */ Link} {
    color: var(--color-green);
  }
`;

class SignInPage extends React.Component {
  formValues = FormValues
    // prettier-ignore
    .props({
      accessToken: '',
    })
    .actions(self => ({
      submit: event => {
        event.preventDefault();
        this.props.signIn(self.serialized);
      },
    }))
    .create();

  render() {
    return (
      <>
        <PageHeader>
          <FlexCenter>
            <Logotype />
          </FlexCenter>
        </PageHeader>
        <Width320>
          <Form onSubmit={this.formValues.submit}>
            <Title>Sign In</Title>
            <Label htmlFor="accessToken">
              Access Token
              <Input
                id="accessToken"
                value={this.formValues.accessToken}
                onChange={this.formValues.change}
                type="text"
              />
            </Label>
            <FlexEnd>
              <RaisedButton>Sign in</RaisedButton>
            </FlexEnd>
          </Form>
          <ContactUs gray>
            Not a BitBrew customer yet?&nbsp;
            <Link to="mailto:hello@bitbrew.com">Contact us</Link>.
          </ContactUs>
        </Width320>
      </>
    );
  }
}

SignInPage.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(
  SignInPage,
  store => ({
    signIn: store.signIn,
  }),
);
