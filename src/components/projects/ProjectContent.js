import PropTypes from 'prop-types';
import React from 'react';
import { localize } from '../../utils/formatters';
import { connect } from '../../utils/helpers';
import { projectDevicesPath } from '../../utils/urls';
import { Button, IconButton } from '../ui/Buttons';
import { FlexBetween } from '../ui/Flexboxes';
import { ContentHeader } from '../ui/Headers';
import { MoreIcon } from '../ui/Icons';
import { Link } from '../ui/Links';
import List from '../ui/List';
import Menu from '../ui/Menu';
import { Content } from '../ui/Sections';
import { ContentTitle, Text } from '../ui/Texts';
import DeleteProjectDialog from './DeleteProjectDialog';
import EditProjectForm from './EditProjectForm';

function ProjectContent({ openDialog, openDrawer, project }) {
  const name = project.name.trim();
  return (
    <Content as="section">
      <ContentHeader>
        <FlexBetween>
          <div>
            <ContentTitle gray={!name}>
              <Link to={projectDevicesPath(project.id)}>
                {name || 'Untitled project'}
              </Link>
            </ContentTitle>
            <Text gray>{project.description}</Text>
          </div>
          <Menu
            control={
              <IconButton title="Show more project actions">
                <MoreIcon />
              </IconButton>
            }
          >
            <Button
              onClick={() => {
                openDrawer(<EditProjectForm project={project} />);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                openDialog(<DeleteProjectDialog project={project} />);
              }}
            >
              Delete
            </Button>
          </Menu>
        </FlexBetween>
      </ContentHeader>
      <List
        items={[
          ['ID', project.id],
          ['Date Created', localize(project.createdAt)],
        ]}
      />
    </Content>
  );
}

ProjectContent.propTypes = {
  openDialog: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
  project: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  ProjectContent,
  ({ uiStore }) => ({
    openDialog: uiStore.openDialog,
    openDrawer: uiStore.openDrawer,
  }),
);
