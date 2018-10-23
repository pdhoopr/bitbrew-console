import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SearchState from '../../models/ui/SearchState';
import { capitalize, localize, pluralize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import NewProjectForm from '../projects/NewProjectForm';
import ProjectContent from '../projects/ProjectContent';
import AppBar from '../ui/AppBar';
import { RaisedButton } from '../ui/Buttons';
import { FlexBetween } from '../ui/Flexboxes';
import { PageHeader } from '../ui/Headers';
import List from '../ui/List';
import Search from '../ui/Search';
import { Content, Section } from '../ui/Sections';
import Table, { Cell, Row } from '../ui/Table';
import { PageTitle, SectionTitle, Text } from '../ui/Texts';
import { Width640 } from '../ui/Widths';
import DeleteOrgDialog from './DeleteOrgDialog';
import EditOrgForm from './EditOrgForm';

const EditOrgButton = styled(RaisedButton)`
  background-color: var(--color-black);
  margin-left: auto;
  margin-right: var(--size-16);
`;

const NewProjectButton = styled(RaisedButton)`
  margin-left: var(--size-16);
`;

const SectionHeader = styled(FlexBetween)`
  margin-bottom: var(--size-16);
`;

class OrgDetailsPage extends React.Component {
  search = SearchState.create();

  render() {
    const { getOrgWithId, openDialog, openDrawer, orgId } = this.props;
    const org = getOrgWithId(orgId);
    const projects = org ? org.getProjectsWithName(this.search.term) : [];
    return (
      <main>
        <PageHeader>
          <AppBar>
            <PageTitle>{org ? org.name : ''}</PageTitle>
          </AppBar>
        </PageHeader>
        {org && (
          <Width640>
            <Section>
              <FlexBetween>
                <SectionTitle>Overview</SectionTitle>
                <EditOrgButton
                  onClick={() => {
                    openDrawer(<EditOrgForm org={org} />);
                  }}
                >
                  Edit
                </EditOrgButton>
                <RaisedButton
                  onClick={() => {
                    openDialog(<DeleteOrgDialog org={org} />);
                  }}
                  red
                >
                  Delete
                </RaisedButton>
              </FlexBetween>
              <Content>
                <List
                  items={[
                    ['ID', org.id],
                    ['Date Created', localize(org.createdAt)],
                  ]}
                />
              </Content>
            </Section>
            <Section>
              <SectionHeader>
                <SectionTitle>Members</SectionTitle>
              </SectionHeader>
              <Table columns={['Name', 'Email', 'Role']}>
                {org.members.map(member => (
                  <Row key={member.id}>
                    <Cell>{member.name}</Cell>
                    <Cell>{member.email}</Cell>
                    <Cell>{capitalize(member.role)}</Cell>
                  </Row>
                ))}
              </Table>
            </Section>
            <Section>
              <SectionHeader>
                <SectionTitle>Projects</SectionTitle>
                <Text gray>{pluralize('project', projects.length)}</Text>
              </SectionHeader>
              <FlexBetween>
                <Search
                  description="The list of projects below will change to show only those with names matching the search term."
                  value={this.search.term}
                  onChange={this.search.setTerm}
                  placeholder="Search by project name"
                />
                <NewProjectButton
                  onClick={() => {
                    openDrawer(<NewProjectForm org={org} />);
                  }}
                >
                  New
                </NewProjectButton>
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

OrgDetailsPage.propTypes = {
  getOrgWithId: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default connect(
  OrgDetailsPage,
  ({ orgStore, uiStore }) => ({
    getOrgWithId: orgStore.getOrgWithId,
    openDialog: uiStore.openDialog,
    openDrawer: uiStore.openDrawer,
  }),
);
