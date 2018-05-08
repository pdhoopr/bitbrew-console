import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../styles/Button';
import Flex from '../styles/Flex';
import Link from '../styles/Link';

const Element = styled.form`
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
`;

const Input = styled.input`
  border-radius: var(--corner-radius);
  border: 1px solid var(--color-medium-grey);
  color: var(--color-black);
  display: block;
  font-family: var(--font-roboto);
  font-size: var(--size-14);
  line-height: var(--size-20);
  padding: calc(var(--size-8) - 1px) var(--size-16);
  width: 100%;

  ${/* sc-selector */ Label} & {
    margin-top: var(--size-8);
  }
`;

const SignInButton = Button.extend`
  background-color: var(--color-green);
  color: var(--color-white);
`;

const ContactUs = styled.p`
  color: var(--color-dark-grey);
  margin-top: var(--size-32);
  text-align: center;
  width: 100%;
`;

function SignInForm({ data }) {
  return (
    <>
      <Element onSubmit={data.submit} noValidate data-testid="sign-in-form">
        <Title>Sign In</Title>
        <Label htmlFor="accessToken">
          <span>Access Token</span>
          <Input
            id="accessToken"
            value={data.accessToken}
            onChange={data.update}
            type="text"
          />
        </Label>
        <Flex justifyContent="flex-end">
          <SignInButton>Sign in</SignInButton>
        </Flex>
      </Element>
      <ContactUs>
        Not a BitBrew customer yet?&nbsp;
        <Link href="mailto:hello@bitbrew.com">Contact us</Link>.
      </ContactUs>
    </>
  );
}

SignInForm.propTypes = {
  data: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }).isRequired,
};

export default observer(SignInForm);
