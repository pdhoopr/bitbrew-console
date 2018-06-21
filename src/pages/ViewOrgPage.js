import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexBetween, FlexStart } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { BackArrowIcon } from '../components/Icons';
import { IconLink } from '../components/Links';
import List from '../components/List';
import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';
import { Content, Section } from '../components/Sections';
import { PageTitle, SectionTitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import Search from '../models/Search';
import { connect, localizeDate, pluralize } from '../utils/tools';
import { goToDeleteOrg, listOrgsPath } from '../utils/urls';

const Title = styled(PageTitle)`
  flex: 1;
  margin-left: var(--size-16);
  margin-right: var(--size-16);
`;

const ProjectsHeader = styled(FlexBetween)`
  margin-bottom: var(--size-16);
`;

class ViewOrgPage extends React.Component {
  componentDidMount() {
    this.props.viewOrg(this.props.id);
  }

  goToDeleteOrg = () => {
    goToDeleteOrg(this.props.id);
  };

  search = Search
    // prettier-ignore
    .views(self => ({
      getResults(projects) {
        return projects.filter(project => self.matchesQuery(project.name));
      },
    }))
    .create();

  render() {
    const { id, orgsById, projectsByOrg, signOut } = this.props;
    const org = orgsById[id];
    const pageTitle = org ? org.name : '';
    const projects = projectsByOrg[id] || [];
    const results = this.search.getResults(projects);
    return (
      <>
        <PageHeader>
          <FlexStart>
            <IconLink to={listOrgsPath} title="Back to all organizations">
              <BackArrowIcon />
            </IconLink>
            <Title>{pageTitle}</Title>
            <Button onClick={signOut}>Sign out</Button>
          </FlexStart>
        </PageHeader>
        {org && (
          <Width640>
            <Section>
              <FlexBetween>
                <SectionTitle>Overview</SectionTitle>
                <RaisedButton onClick={this.goToDeleteOrg} red>
                  Delete
                </RaisedButton>
              </FlexBetween>
              <Content>
                <List items={[['Date Created', localizeDate(org.createdAt)]]} />
              </Content>
            </Section>
            <Section>
              <ProjectsHeader>
                <SectionTitle>Projects</SectionTitle>
                <Text gray>{pluralize('project', results.length)}</Text>
              </ProjectsHeader>
              <SearchBar
                description="The list of projects below will change to show only those with names matching the search query."
                value={this.search.query}
                onChange={this.search.change}
                placeholder="Search by project name"
              />
              <ProjectList projects={results} />
            </Section>
          </Width640>
        )}
      </>
    );
  }
}

ViewOrgPage.propTypes = {
  id: PropTypes.string.isRequired,
  orgsById: PropTypes.objectOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
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
  viewOrg: PropTypes.func.isRequired,
};

export default connect(
  ViewOrgPage,
  store => ({
    orgsById: store.orgsById,
    projectsByOrg: store.newestProjectsByOrg,
    signOut: store.signOut,
    viewOrg: store.viewOrg,
  }),
);
