import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import { FlexBetween, FlexStart } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { BackIcon } from '../components/Icons';
import { IconLink } from '../components/Links';
import List from '../components/List';
import ProjectList from '../components/ProjectList';
import Search from '../components/Search';
import { Content, Section } from '../components/Sections';
import { PageTitle, SectionTitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import SearchStore from '../stores/SearchStore';
import UiStore from '../stores/UiStore';
import { connect, loadAsync, localizeDate, pluralize } from '../utils/tools';
import { orgsPath } from '../utils/urls';

const DeleteOrgScreen = loadAsync(() => import('./DeleteOrgScreen'));
const NewProjectScreen = loadAsync(() => import('./NewProjectScreen'));

const Title = styled(PageTitle)`
  flex: 1;
  margin-left: var(--size-16);
  margin-right: var(--size-16);
`;

const NewButton = styled(RaisedButton)`
  margin-left: var(--size-16);
`;

const ProjectsHeader = styled(FlexBetween)`
  margin-bottom: var(--size-16);
`;

class OrgDetailsScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  search = SearchStore.create();

  deleteOrgUi = UiStore.create();

  newProjectUi = UiStore.create();

  componentDidMount() {
    this.props.viewOrg(this.props.orgId);
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { getOrgWithId, orgId, signOut } = this.props;
    const org = getOrgWithId(orgId);
    const title = org ? org.name : '';
    const projects = org ? org.getProjectsWithName(this.search.query) : [];
    return (
      <React.Fragment>
        <PageHeader>
          <FlexStart>
            <IconLink to={orgsPath} title="Back to all organizations">
              <BackIcon />
            </IconLink>
            <Title>{title}</Title>
            <Button onClick={signOut}>Sign out</Button>
          </FlexStart>
        </PageHeader>
        {org && (
          <React.Fragment>
            <Width640>
              <Section>
                <FlexBetween>
                  <SectionTitle>Overview</SectionTitle>
                  <RaisedButton onClick={this.deleteOrgUi.open} red>
                    Delete
                  </RaisedButton>
                </FlexBetween>
                <Content>
                  <List
                    items={[['Date Created', localizeDate(org.createdAt)]]}
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
                    description="The list of projects below will change to show only those with names matching the search query."
                    value={this.search.query}
                    onChange={this.search.setQuery}
                    placeholder="Search by project name"
                  />
                  <NewButton onClick={this.newProjectUi.open}>New</NewButton>
                </FlexBetween>
                <ProjectList projects={projects} />
              </Section>
            </Width640>
            {this.deleteOrgUi.isOpen && (
              <DeleteOrgScreen org={org} close={this.deleteOrgUi.close} />
            )}
            {this.newProjectUi.isOpen && (
              <NewProjectScreen org={org} close={this.newProjectUi.close} />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

OrgDetailsScreen.propTypes = {
  getOrgWithId: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  viewOrg: PropTypes.func.isRequired,
};

export default connect(
  OrgDetailsScreen,
  ({ authStore, orgStore }) => ({
    getOrgWithId: orgStore.getOrgWithId,
    signOut: authStore.signOut,
    viewOrg: orgStore.viewOrg,
  }),
);
