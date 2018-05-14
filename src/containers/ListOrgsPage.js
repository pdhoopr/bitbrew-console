import { PropTypes as MobxPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import OrgList from '../components/OrgList';
import { TextButton } from '../styles/Buttons';
import Content from '../styles/Content';
import { FlexBetween } from '../styles/Flexboxes';
import Header from '../styles/Header';
import { Logomark } from '../styles/Logos';
import connect from '../utils/connect';

const WelcomeHeader = Header.extend`
  background-color: var(--color-black);
  color: var(--color-white);
`;

const MaxWidth960 = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--size-960);
`;

const Title = styled.h1`
  font-size: var(--size-32);
  font-weight: var(--weight-normal);
  line-height: var(--size-40);
  margin-bottom: 0;
  margin-top: var(--size-32);
`;

const IntroText = styled.p`
  font-size: var(--size-16);
  line-height: var(--size-24);
  margin-bottom: 0;
  margin-top: 0;
`;

class ListOrgsPage extends React.Component {
  componentDidMount() {
    this.props.listOrgs();
  }

  render() {
    const { orgs, signOut } = this.props;
    return (
      <>
        <WelcomeHeader>
          <MaxWidth960>
            <FlexBetween>
              <Logomark />
              <TextButton onClick={signOut}>Sign out</TextButton>
            </FlexBetween>
            <Title>Welcome!</Title>
            <IntroText>
              Use the Dashboard to manage your data pipeline.
            </IntroText>
          </MaxWidth960>
        </WelcomeHeader>
        <Content>
          <MaxWidth960>
            <OrgList orgs={orgs} />
          </MaxWidth960>
        </Content>
        <Footer />
      </>
    );
  }
}

ListOrgsPage.propTypes = {
  listOrgs: PropTypes.func.isRequired,
  orgs: MobxPropTypes.arrayOrObservableArray.isRequired, // eslint-disable-line react/no-typos
  signOut: PropTypes.func.isRequired,
};

export default connect(ListOrgsPage, store => ({
  listOrgs: store.listOrgs,
  orgs: store.orgs,
  signOut: store.signOut,
}));
