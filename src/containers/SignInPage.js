import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Content from '../components/Content';
import { FlexCenter } from '../components/Flexboxes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Link from '../components/Link';
import { Logotype } from '../components/Logos';
import SignInForm from '../components/SignInForm';
import connect from '../utils/connect';

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

const SignInPage = ({ signIn }) => (
  <>
    <Header>
      <FlexCenter>
        <Logotype />
      </FlexCenter>
    </Header>
    <Content>
      <SignInForm signIn={signIn} />
      <ContactUs>
        Not a BitBrew customer yet?&nbsp;
        <Link href="mailto:hello@bitbrew.com">Contact us</Link>.
      </ContactUs>
    </Content>
    <Footer />
  </>
);

SignInPage.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(SignInPage, store => ({
  signIn: store.signIn,
}));