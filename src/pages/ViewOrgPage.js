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
import Search from '../components/Search';
import { Content, Section } from '../components/Sections';
import { PageTitle, SectionTitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import SearchStore from '../stores/SearchStore';
import { connect, localizeDate, pluralize } from '../utils/tools';
import { goToDeleteOrg, orgsPath } from '../utils/urls';

const Title = styled(PageTitle)`
  flex: 1;
  margin-left: var(--size-16);
  margin-right: var(--size-16);
`;

const ProjectsHeader = styled(FlexBetween)`
  margin-bottom: var(--size-16);
`;

class ViewOrgPage extends React.Component {
  search = SearchStore.create();

  componentDidMount() {
    this.props.viewOrg(this.props.id);
  }

  openDeleteOrg = () => {
    goToDeleteOrg(this.props.id);
  };

  render() {
    const { getOrgWithId, id, signOut } = this.props;
    const org = getOrgWithId(id);
    const pageTitle = org ? org.name : '';
    const projects = org ? org.getProjectsWithName(this.search.query) : [];
    return (
      <>
        <PageHeader>
          <FlexStart>
            <IconLink to={orgsPath} title="Back to all organizations">
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
                <RaisedButton onClick={this.openDeleteOrg} red>
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
                <Text gray>{pluralize('project', projects.length)}</Text>
              </ProjectsHeader>
              <Search
                description="The list of projects below will change to show only those with names matching the search query."
                value={this.search.query}
                onChange={this.search.setQuery}
                placeholder="Search by project name"
              />
              <ProjectList projects={projects} />
            </Section>
          </Width640>
        )}
      </>
    );
  }
}

ViewOrgPage.propTypes = {
  getOrgWithId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  viewOrg: PropTypes.func.isRequired,
};

export default connect(
  ViewOrgPage,
  ({ authStore, orgStore }) => ({
    getOrgWithId: orgStore.getOrgWithId,
    signOut: authStore.signOut,
    viewOrg: orgStore.viewOrg,
  }),
);
