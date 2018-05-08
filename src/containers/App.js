import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import SignIn from '../models/SignIn';
import Button from '../styles/Button';
import Flex from '../styles/Flex';
import connect from '../utils/connect';

const Content = styled.main`
  flex: 1 0 auto;
`;

class App extends React.Component {
  signInData = SignIn.create({}, { onSubmit: this.props.signIn });

  render() {
    const { isSignedIn, signOut } = this.props;
    return (
      <>
        <Header />
        <Content>
          {isSignedIn ? (
            <Flex>
              <Button onClick={signOut}>Sign out</Button>
            </Flex>
          ) : (
            <SignInForm data={this.signInData} />
          )}
        </Content>
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(App, (store) => ({
  isSignedIn: store.isSignedIn,
  signIn: store.signIn,
  signOut: store.signOut,
}));
