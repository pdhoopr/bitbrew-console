import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import Content from '../components/Content';
import { FlexBetween, FlexStart } from '../components/Flexboxes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SearchIcon } from '../components/Icons';
import { RaisedInput } from '../components/Inputs';
import { RaisedLink } from '../components/Links';
import { Logomark } from '../components/Logos';
import {
  ContentTitle,
  PageTitle,
  SectionTitle,
  Subtitle,
  Text,
} from '../components/Typography';
import FormValues from '../models/FormValues';
import connect from '../utils/connect';
import formatDate from '../utils/formatDate';
import pluralize from '../utils/pluralize';
import urls from '../utils/urls';
import CreateOrgPage from './CreateOrgPage';

const WelcomeHeader = styled(Header)`
  background-color: var(--color-black);
  color: var(--color-white);
`;

const Width640 = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--size-640);
`;

const Title = styled(PageTitle)`
  margin-top: var(--size-32);
`;

const SearchHeader = styled(FlexBetween)`
  margin-top: var(--size-32);
`;

const Bar = styled.label`
  display: block;
  flex: 1;
  margin-right: var(--size-16);
  position: relative;
`;

const Icon = styled(SearchIcon)`
  margin-bottom: var(--size-8);
  margin-left: var(--size-16);
  margin-top: var(--size-8);
  position: relative;
  z-index: 1;
`;

const Input = styled(RaisedInput)`
  bottom: 0;
  left: 0;
  padding-left: var(--size-52);
  position: absolute;
  right: 0;
  top: 0;
`;

const OrgSection = styled.section`
  margin-top: var(--size-32);
`;

const ProjectSection = styled.section`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  margin-left: auto;
  margin-right: auto;
  margin-top: var(--size-16);
  max-width: var(--size-640);
`;

const ProjectHeader = styled.header`
  padding: var(--size-16) var(--size-24);
`;

const List = styled.dl`
  margin-bottom: 0;
  margin-top: 0;
`;

const ListRow = styled(FlexStart)`
  border-top: 1px solid var(--color-medium-gray);
  padding: var(--size-16) var(--size-24);
`;

const ListTerm = styled.dt`
  font-weight: var(--weight-bold);
  flex: 1;
`;

const ListDescription = styled.dd`
  margin-left: 0;
  flex: 1.5;
`;

class ListOrgsPage extends React.Component {
  async componentDidMount() {
    await this.props.listOrgs();
    this.props.listProjects();
  }

  search = FormValues
    // prettier-ignore
    .props({
      query: '',
    })
    .views(self => ({
      get isEmpty() {
        return self.query.trim() === '';
      },
      getResults: org =>
        this.props.newestProjects[org.id].filter(project =>
          new RegExp(self.query, 'i').test(project.name),
        ),
    }))
    .create();

  render() {
    const { alphabeticalOrgs, signOut } = this.props;
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
                  placeholder="Search by project name"
                />
              </Bar>
              <RaisedLink to={urls.newOrg}>New</RaisedLink>
            </SearchHeader>
            {alphabeticalOrgs.map(org => {
              const projects = this.search.getResults(org);
              const showOrg = this.search.isEmpty || projects.length > 0;
              return (
                showOrg && (
                  <OrgSection key={org.id}>
                    <FlexBetween>
                      <SectionTitle>{org.name}</SectionTitle>
                      <Subtitle gray>
                        {pluralize('project', projects.length)}
                      </Subtitle>
                    </FlexBetween>
                    {projects.map(project => (
                      <ProjectSection key={project.id}>
                        <ProjectHeader>
                          <ContentTitle>{project.name}</ContentTitle>
                          <Text gray>{project.description}</Text>
                        </ProjectHeader>
                        <List>
                          <ListRow>
                            <ListTerm>Date Created</ListTerm>
                            <ListDescription>
                              {formatDate(project.createdAt)}
                            </ListDescription>
                          </ListRow>
                        </List>
                      </ProjectSection>
                    ))}
                  </OrgSection>
                )
              );
            })}
          </Width640>
        </Content>
        <Footer />
        <Route exact path={urls.newOrg} component={CreateOrgPage} />
      </>
    );
  }
}

ListOrgsPage.propTypes = {
  alphabeticalOrgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  listOrgs: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  newestProjects: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  ListOrgsPage,
  store => ({
    alphabeticalOrgs: store.alphabeticalOrgs,
    listOrgs: store.listOrgs,
    listProjects: store.listProjects,
    newestProjects: store.newestProjects,
    signOut: store.signOut,
  }),
);
