import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { Link } from '../components/Links';
import { Logomark } from '../components/Logos';
import ProjectList from '../components/ProjectList';
import Search from '../components/Search';
import { Section } from '../components/Sections';
import { PageTitle, SectionTitle, Subtitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import SearchStore from '../stores/SearchStore';
import { connect, localizeDate, pluralize } from '../utils/tools';
import { goToCreateOrg, orgWithIdPath } from '../utils/urls';

const WelcomeHeader = styled(PageHeader)`
  background-color: var(--color-black);
  color: var(--color-white);
`;

const Title = styled(PageTitle)`
  margin-top: var(--size-32);
`;

const Actions = styled(FlexBetween)`
  margin-bottom: var(--size-32);
  margin-top: var(--size-32);
`;

const NewButton = styled(RaisedButton)`
  margin-left: var(--size-16);
`;

class ListOrgsPage extends React.Component {
  search = SearchStore.create();

  componentDidMount() {
    this.props.listOrgs();
  }

  render() {
    const { orgs, signOut } = this.props;
    return (
      <>
        <WelcomeHeader>
          <Width640>
            <FlexBetween>
              <Logomark />
              <Button onClick={signOut}>Sign out</Button>
            </FlexBetween>
            <Title>Welcome!</Title>
            <Subtitle>
              Use the BitBrew Console to manage your data pipeline.
            </Subtitle>
          </Width640>
        </WelcomeHeader>
        <Width640>
          <Actions>
            <Search
              description="The list of organizations below will change to show only those with project names matching the search query."
              value={this.search.query}
              onChange={this.search.setQuery}
              placeholder="Search by project name"
            />
            <NewButton onClick={goToCreateOrg}>New</NewButton>
          </Actions>
          {orgs.map(org => {
            const projects = org.getProjectsWithName(this.search.query);
            const showOrg = this.search.isEmpty || projects.length > 0;
            return (
              showOrg && (
                <Section key={org.id}>
                  <SectionTitle>
                    <Link to={orgWithIdPath(org.id)}>{org.name}</Link>
                  </SectionTitle>
                  <FlexBetween>
                    <Text gray>Created on {localizeDate(org.createdAt)}</Text>
                    <Text gray>{pluralize('project', projects.length)}</Text>
                  </FlexBetween>
                  <ProjectList projects={projects} />
                </Section>
              )
            );
          })}
        </Width640>
      </>
    );
  }
}

ListOrgsPage.propTypes = {
  listOrgs: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      getProjectsWithName: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  ListOrgsPage,
  ({ authStore, orgStore }) => ({
    listOrgs: orgStore.listOrgs,
    orgs: orgStore.orgs,
    signOut: authStore.signOut,
  }),
);
