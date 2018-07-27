import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { localizeDate } from '../utils/tools';
import { ContentHeader } from './Headers';
import List from './List';
import { Content } from './Sections';
import { ContentTitle, Text } from './Texts';

function ProjectList({ projects }) {
  return projects.map(project => (
    <Content key={project.id}>
      <ContentHeader>
        <ContentTitle>{project.name}</ContentTitle>
        <Text gray>{project.description}</Text>
      </ContentHeader>
      <List items={[['Date Created', localizeDate(project.createdAt)]]} />
    </Content>
  ));
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default observer(ProjectList);
