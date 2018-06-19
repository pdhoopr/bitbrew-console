import PropTypes from 'prop-types';
import React from 'react';
import { ContentHeader } from '../components/Headers';
import List from '../components/List';
import { Content } from '../components/Sections';
import { ContentTitle, Text } from '../components/Texts';
import { localizeDate } from '../utils/tools';

export default function ProjectList({ projects }) {
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
