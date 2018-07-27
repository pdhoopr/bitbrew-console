import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import UiStore from '../stores/UiStore';
import { loadAsync, localizeDate } from '../utils/tools';
import { Button, IconButton } from './Buttons';
import Dropdown from './Dropdown';
import { FlexBetween } from './Flexboxes';
import { ContentHeader } from './Headers';
import { MoreIcon } from './Icons';
import List from './List';
import { Content } from './Sections';
import { ContentTitle, Text } from './Texts';

const DeleteProjectScreen = loadAsync(() =>
  import('../screens/DeleteProjectScreen'),
);
const EditProjectScreen = loadAsync(() =>
  import('../screens/EditProjectScreen'),
);

class ProjectList extends React.Component {
  editProjectUi = UiStore.create();

  deleteProjectUi = UiStore.create();

  render() {
    const { projects } = this.props;
    return (
      <React.Fragment>
        {projects.map(project => (
          <Content key={project.id}>
            <ContentHeader>
              <FlexBetween>
                <div>
                  <ContentTitle>{project.name}</ContentTitle>
                  <Text gray>{project.description}</Text>
                </div>
                <Dropdown
                  triggerButton={
                    <IconButton title="Show more project actions">
                      <MoreIcon />
                    </IconButton>
                  }
                >
                  <Button
                    onClick={() => {
                      this.editProjectUi.open({ project });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      this.deleteProjectUi.open({ project });
                    }}
                  >
                    Delete
                  </Button>
                </Dropdown>
              </FlexBetween>
            </ContentHeader>
            <List items={[['Date Created', localizeDate(project.createdAt)]]} />
          </Content>
        ))}
        {this.editProjectUi.isOpen && (
          <EditProjectScreen
            project={this.editProjectUi.metadata.project}
            close={this.editProjectUi.close}
          />
        )}
        {this.deleteProjectUi.isOpen && (
          <DeleteProjectScreen
            project={this.deleteProjectUi.metadata.project}
            close={this.deleteProjectUi.close}
          />
        )}
      </React.Fragment>
    );
  }
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
