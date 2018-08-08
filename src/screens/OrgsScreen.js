import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, RaisedButton } from '../components/Buttons';
import Dropdown from '../components/Dropdown';
import { FlexBetween } from '../components/Flexboxes';
import { PageHeader } from '../components/Headers';
import { DropdownIcon } from '../components/Icons';
import { Link } from '../components/Links';
import Logo from '../components/Logo';
import ProjectList from '../components/ProjectList';
import Search from '../components/Search';
import { Section } from '../components/Sections';
import { PageTitle, SectionTitle, Subtitle, Text } from '../components/Texts';
import { Width640 } from '../components/Widths';
import SearchStore from '../stores/SearchStore';
import UiStore from '../stores/UiStore';
import { connect, loadAsync, localizeDate, pluralize } from '../utils/tools';
import { orgDetailsPath } from '../utils/urls';

const NewOrgScreen = loadAsync(() => import('./NewOrgScreen'));
const NewProjectScreen = loadAsync(() => import('./NewProjectScreen'));

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

const NewButtonIcon = styled(DropdownIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

class OrgsScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  search = SearchStore.create();

  newOrgUi = UiStore.create();

  newProjectUi = UiStore.create();

  componentDidMount() {
    this.props.listOrgs();
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { orgs, signOut } = this.props;
    return (
      <React.Fragment>
        <WelcomeHeader>
          <Width640>
            <FlexBetween>
              <Logo />
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
            <Dropdown
              triggerButton={
                <RaisedButton>
                  New <NewButtonIcon aria-hidden />
                </RaisedButton>
              }
            >
              <Button onClick={this.newOrgUi.open}>Organization</Button>
              <Button onClick={this.newProjectUi.open}>Project</Button>
            </Dropdown>
          </Actions>
          {orgs.map(org => {
            const projects = org.getProjectsWithName(this.search.query);
            const showOrg = this.search.isEmpty || projects.length > 0;
            return (
              showOrg && (
                <Section key={org.id}>
                  <SectionTitle>
                    <Link to={orgDetailsPath(org.id)}>{org.name}</Link>
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
        {this.newOrgUi.isOpen && <NewOrgScreen close={this.newOrgUi.close} />}
        {this.newProjectUi.isOpen && (
          <NewProjectScreen close={this.newProjectUi.close} />
        )}
      </React.Fragment>
    );
  }
}

OrgsScreen.propTypes = {
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
  OrgsScreen,
  ({ authStore, orgStore }) => ({
    listOrgs: orgStore.listOrgs,
    orgs: orgStore.orgs,
    signOut: authStore.signOut,
  }),
);
