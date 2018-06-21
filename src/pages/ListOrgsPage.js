import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { Link } from '../components/Links';
import { Logomark } from '../components/Logos';
import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';
import { Section } from '../components/Sections';
import { PageTitle, SectionTitle, Subtitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import Search from '../models/Search';
import { connect, localizeDate, pluralize } from '../utils/tools';
import { goToCreateOrg, viewOrgPath } from '../utils/urls';

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
  async componentDidMount() {
    await this.props.listOrgs();
    this.props.listProjects();
  }

  search = Search
    // prettier-ignore
    .views(self => ({
      getResults(projects) {
        return projects.filter(project => self.matchesQuery(project.name));
      },
    }))
    .create();

  render() {
    const { projectsByOrg, orgs, signOut } = this.props;
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
            <SearchBar
              description="The list of organizations below will change to show only those with project names matching the search query."
              value={this.search.query}
              onChange={this.search.change}
              placeholder="Search by project name"
            />
            <NewButton onClick={goToCreateOrg}>New</NewButton>
          </Actions>
          {orgs.map(org => {
            const projects = projectsByOrg[org.id];
            const results = this.search.getResults(projects);
            const showOrg = this.search.isEmpty || results.length > 0;
            return (
              showOrg && (
                <Section key={org.id}>
                  <SectionTitle>
                    <Link to={viewOrgPath(org.id)}>{org.name}</Link>
                  </SectionTitle>
                  <FlexBetween>
                    <Text gray>Created on {localizeDate(org.createdAt)}</Text>
                    <Text gray>{pluralize('project', results.length)}</Text>
                  </FlexBetween>
                  <ProjectList projects={results} />
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
  listProjects: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  projectsByOrg: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  ListOrgsPage,
  store => ({
    listOrgs: store.listOrgs,
    listProjects: store.listProjects,
    orgs: store.newestOrgs,
    projectsByOrg: store.newestProjectsByOrg,
    signOut: store.signOut,
  }),
);
