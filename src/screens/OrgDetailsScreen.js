import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import List from '../components/List';
import ProjectContent from '../components/ProjectContent';
import Search from '../components/Search';
import { Content, Section } from '../components/Sections';
import { PageTitle, SectionTitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import SearchStore from '../stores/SearchStore';
import UiStore from '../stores/UiStore';
import { connect, localizeDate, pluralize } from '../utils/tools';
import DeleteOrgScreen from './DeleteOrgScreen';
import EditOrgScreen from './EditOrgScreen';
import NewProjectScreen from './NewProjectScreen';

const EditOrgButton = styled(RaisedButton)`
  background-color: var(--color-black);
  margin-left: auto;
  margin-right: var(--size-16);
`;

const NewProjectButton = styled(RaisedButton)`
  margin-left: var(--size-16);
`;

const ProjectsHeader = styled(FlexBetween)`
  margin-bottom: var(--size-16);
`;

class OrgDetailsScreen extends React.Component {
  search = SearchStore.create();

  editOrgUi = UiStore.create();

  deleteOrgUi = UiStore.create();

  newProjectUi = UiStore.create();

  render() {
    const { getOrgWithId, orgId, signOut } = this.props;
    const org = getOrgWithId(orgId);
    const title = org ? org.name : '';
    const projects = org ? org.getProjectsWithName(this.search.term) : [];
    return (
      <main>
        <PageHeader>
          <FlexBetween>
            <PageTitle>{title}</PageTitle>
            <Button onClick={signOut}>Sign out</Button>
          </FlexBetween>
        </PageHeader>
        {org && (
          <Width640>
            <Section>
              <FlexBetween>
                <SectionTitle>Overview</SectionTitle>
                <EditOrgButton onClick={this.editOrgUi.open}>
                  Edit
                </EditOrgButton>
                {this.editOrgUi.isOpen && (
                  <EditOrgScreen org={org} close={this.editOrgUi.close} />
                )}
                <RaisedButton onClick={this.deleteOrgUi.open} red>
                  Delete
                </RaisedButton>
                {this.deleteOrgUi.isOpen && (
                  <DeleteOrgScreen org={org} close={this.deleteOrgUi.close} />
                )}
              </FlexBetween>
              <Content>
                <List
                  items={[
                    ['ID', org.id],
                    ['Date Created', localizeDate(org.createdAt)],
                  ]}
                />
              </Content>
            </Section>
            <Section>
              <ProjectsHeader>
                <SectionTitle>Projects</SectionTitle>
                <Text gray>{pluralize('project', projects.length)}</Text>
              </ProjectsHeader>
              <FlexBetween>
                <Search
                  description="The list of projects below will change to show only those with names matching the search term."
                  value={this.search.term}
                  onChange={this.search.setTerm}
                  placeholder="Search by project name"
                />
                <NewProjectButton onClick={this.newProjectUi.open}>
                  New
                </NewProjectButton>
                {this.newProjectUi.isOpen && (
                  <NewProjectScreen org={org} close={this.newProjectUi.close} />
                )}
              </FlexBetween>
              {projects.map(project => (
                <ProjectContent key={project.id} project={project} />
              ))}
            </Section>
          </Width640>
        )}
      </main>
    );
  }
}

OrgDetailsScreen.propTypes = {
  getOrgWithId: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  OrgDetailsScreen,
  ({ authStore, orgStore }) => ({
    getOrgWithId: orgStore.getOrgWithId,
    signOut: authStore.signOut,
  }),
);
