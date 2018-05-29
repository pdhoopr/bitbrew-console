import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { RaisedButton } from '../components/Buttons';
import Content from '../components/Content';
import { FlexCenter, FlexEnd } from '../components/Flexboxes';
import Footer from '../components/Footer';
import Form from '../components/Form';
import Header from '../components/Header';
import { Input, Label } from '../components/Inputs';
import { Link } from '../components/Links';
import { Logotype } from '../components/Logos';
import { ContentTitle } from '../components/Titles';
import FormValues from '../models/FormValues';
import connect from '../utils/connect';

const Title = ContentTitle.withComponent('h1').extend`
  margin-bottom: var(--size-16);
`;

const ContactUs = styled.p`
  color: var(--color-dark-grey);
  margin-bottom: 0;
  margin-top: var(--size-32);
  text-align: center;
  width: 100%;

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
        <Header>
          <FlexCenter>
            <Logotype />
          </FlexCenter>
        </Header>
        <Content>
          <Form onSubmit={this.formValues.submit} data-testid="sign-in-form">
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
          <ContactUs>
            Not a BitBrew customer yet?&nbsp;
            <Link to="mailto:hello@bitbrew.com">Contact us</Link>.
          </ContactUs>
        </Content>
        <Footer />
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
