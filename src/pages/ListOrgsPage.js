import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import Content from '../components/Content';
import { FlexBetween } from '../components/Flexboxes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SearchIcon } from '../components/Icons';
import { RaisedInput } from '../components/Inputs';
import { RaisedLink } from '../components/Links';
import { Logomark } from '../components/Logos';
import { PageTitle, SectionTitle } from '../components/Titles';
import FormValues from '../models/FormValues';
import connect from '../utils/connect';
import urls from '../utils/urls';
import CreateOrgPage from './CreateOrgPage';

const WelcomeHeader = Header.extend`
  background-color: var(--color-black);
  color: var(--color-white);
`;

const Width640 = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--size-640);
`;

const Title = PageTitle.extend`
  margin-top: var(--size-32);
`;

const IntroText = styled.p`
  font-size: var(--size-16);
  line-height: var(--size-24);
  margin-bottom: 0;
  margin-top: 0;
`;

const SearchHeader = FlexBetween.extend`
  margin-top: var(--size-32);
`;

const Bar = styled.label`
  display: block;
  flex: 1 0 auto;
  margin-right: var(--size-16);
  position: relative;
`;

const Icon = SearchIcon.extend`
  margin-bottom: var(--size-8);
  margin-left: var(--size-16);
  margin-top: var(--size-8);
  position: relative;
  z-index: 1;
`;

const Input = RaisedInput.extend`
  bottom: 0;
  left: 0;
  padding-left: var(--size-52);
  position: absolute;
  right: 0;
  top: 0;
`;

const Section = styled.section`
  margin-top: var(--size-32);
`;

class ListOrgsPage extends React.Component {
  componentDidMount() {
    this.props.listOrgs();
  }

  search = FormValues
    // prettier-ignore
    .props({
      query: '',
    })
    .views(self => {
      const component = this;
      return {
        get results() {
          return component.props.alphabetizedOrgs.filter(org =>
            new RegExp(self.query, 'i').test(org.properName),
          );
        },
      };
    })
    .create();

  render() {
    const { signOut } = this.props;
    return (
      <>
        <WelcomeHeader>
          <Width640>
            <FlexBetween>
              <Logomark />
              <Button onClick={signOut}>Sign out</Button>
            </FlexBetween>
            <Title>Welcome!</Title>
            <IntroText>
              Use the Dashboard to manage your data pipeline.
            </IntroText>
          </Width640>
        </WelcomeHeader>
        <Content>
          <Width640>
            <SearchHeader>
              <Bar htmlFor="search">
                <Icon />
                <Input
                  id="query"
                  value={this.search.query}
                  onChange={this.search.change}
                  type="search"
                  placeholder="Search by organization name"
                />
              </Bar>
              <RaisedLink to={urls.newOrg}>New</RaisedLink>
            </SearchHeader>
            {this.search.results.map(org => (
              <Section key={org.id}>
                <SectionTitle data-testid="org-name">
                  {org.properName}
                </SectionTitle>
              </Section>
            ))}
          </Width640>
        </Content>
        <Footer />
        <Route exact path={urls.newOrg} component={CreateOrgPage} />
      </>
    );
  }
}

ListOrgsPage.propTypes = {
  alphabetizedOrgs: PropTypes.array.isRequired,
  listOrgs: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(ListOrgsPage, store => ({
  alphabetizedOrgs: store.alphabetizedOrgs,
  listOrgs: store.listOrgs,
  signOut: store.signOut,
}));
