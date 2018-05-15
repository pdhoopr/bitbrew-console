import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SignIn from '../models/SignIn';
import { RaisedButton } from './Buttons';
import { FlexEnd } from './Flexboxes';
import { Input } from './Inputs';

const Wrapper = styled.form`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  margin-left: auto;
  margin-right: auto;
  max-width: var(--size-320);
  padding: var(--size-16) var(--size-24);
`;

const Title = styled.h1`
  font-size: var(--size-20);
  font-weight: var(--weight-normal);
  line-height: var(--size-28);
  margin-bottom: var(--size-16);
  margin-top: 0;
`;

const Label = styled.label`
  display: block;
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-16);

  & ${/* sc-selector */ Input} {
    margin-top: var(--size-8);
  }
`;

class SignInForm extends React.Component {
  values = SignIn.create({}, { onSubmit: this.props.signIn });

  render() {
    return (
      <Wrapper
        onSubmit={this.values.submit}
        noValidate
        data-testid="sign-in-form"
      >
        <Title>Sign In</Title>
        <Label htmlFor="accessToken">
          <span>Access Token</span>
          <Input
            id="accessToken"
            value={this.values.accessToken}
            onChange={this.values.update}
            type="text"
          />
        </Label>
        <FlexEnd>
          <RaisedButton>Sign in</RaisedButton>
        </FlexEnd>
      </Wrapper>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default observer(SignInForm);
