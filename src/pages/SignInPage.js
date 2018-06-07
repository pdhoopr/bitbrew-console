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
import { ContentTitle, Text } from '../components/Typography';
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
        <Header>
          <FlexCenter>
            <Logotype />
          </FlexCenter>
        </Header>
        <Content>
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
