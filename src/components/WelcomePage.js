import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SearchState from '../models/ui/SearchState';
import { localize, pluralize } from '../utils/formatters';
import { connect } from '../utils/helpers';
import { orgDetailsPath } from '../utils/urls';
import NewOrgForm from './orgs/NewOrgForm';
import NewProjectForm from './projects/NewProjectForm';
import ProjectContent from './projects/ProjectContent';
import AppBar from './ui/AppBar';
import { Button, RaisedButton } from './ui/Buttons';
import { FlexBetween, FlexCenter } from './ui/Flexboxes';
import { PageHeader } from './ui/Headers';
import { ArrowDownIcon } from './ui/Icons';
import { Link } from './ui/Links';
import Loading from './ui/Loading';
import Logo from './ui/Logo';
import Menu from './ui/Menu';
import Search from './ui/Search';
import { Section } from './ui/Sections';
import { Heading, PageTitle, SectionTitle, Text } from './ui/Texts';
import { Width640 } from './ui/Widths';

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

const NewButtonIcon = styled(ArrowDownIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

const LoadingWrapper = styled(FlexCenter)`
  margin-bottom: var(--size-32);
`;

class WelcomePage extends React.Component {
  search = SearchState.create();

  render() {
    const { isLoading, openDrawer, orgs } = this.props;
    return (
      <main>
        <WelcomeHeader>
          <Width640>
            <AppBar>
              <Logo />
            </AppBar>
            <Title>Welcome!</Title>
            <Heading>
              Use the BitBrew Console to manage your data pipeline.
            </Heading>
          </Width640>
        </WelcomeHeader>
        <Width640>
          <Actions>
            <Search
              description="The list of organizations below will change to show only those with project names matching the search term."
              value={this.search.term}
              onChange={this.search.setTerm}
              placeholder="Search by project name"
            />
            <Menu
              control={
                <RaisedButton>
                  New <NewButtonIcon aria-hidden />
                </RaisedButton>
              }
            >
              <Button
                onClick={() => {
                  openDrawer(<NewOrgForm />);
                }}
                disabled={isLoading}
              >
                Organization
              </Button>
              <Button
                onClick={() => {
                  openDrawer(<NewProjectForm />);
                }}
              >
                Project
              </Button>
            </Menu>
          </Actions>
          {isLoading && (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
          {orgs.map(org => {
            const projects = org.getProjectsWithName(this.search.term);
            const isVisible = this.search.isEmpty || projects.length > 0;
            return (
              isVisible && (
                <Section key={org.id}>
                  <SectionTitle>
                    <Link to={orgDetailsPath(org.id)}>{org.name}</Link>
                  </SectionTitle>
                  <FlexBetween>
                    <Text gray>Created on {localize(org.createdAt)}</Text>
                    <Text gray>{pluralize('project', projects.length)}</Text>
                  </FlexBetween>
                  {projects.map(project => (
                    <ProjectContent key={project.id} project={project} />
                  ))}
                </Section>
              )
            );
          })}
        </Width640>
      </main>
    );
  }
}

WelcomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      getProjectsWithName: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(
  WelcomePage,
  ({ orgStore, uiStore }) => ({
    isLoading: orgStore.isLoading,
    openDrawer: uiStore.openDrawer,
    orgs: orgStore.orgs,
  }),
);
