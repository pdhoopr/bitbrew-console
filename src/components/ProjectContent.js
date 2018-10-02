import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteProjectScreen from '../screens/DeleteProjectScreen';
import EditProjectScreen from '../screens/EditProjectScreen';
import UiStore from '../stores/UiStore';
import { localizeDate } from '../utils/tools';
import { projectDevicesPath } from '../utils/urls';
import { Button, IconButton } from './Buttons';
import Dropdown from './Dropdown';
import { FlexBetween } from './Flexboxes';
import { ContentHeader } from './Headers';
import { MoreIcon } from './Icons';
import { Link } from './Links';
import List from './List';
import { Content } from './Sections';
import { ContentTitle, Text } from './Texts';

const Wrapper = Content.withComponent('section');

class ProjectContent extends React.Component {
  editProjectUi = UiStore.create();

  deleteProjectUi = UiStore.create();

  render() {
    const { project } = this.props;
    return (
      <Wrapper>
        <ContentHeader>
          <FlexBetween>
            <div>
              <ContentTitle gray={!project.hasName}>
                <Link to={projectDevicesPath(project.id)}>{project.title}</Link>
              </ContentTitle>
              <Text gray>{project.description}</Text>
            </div>
            <Dropdown
              triggerButton={
                <IconButton title="Show more project actions">
                  <MoreIcon />
                </IconButton>
              }
            >
              <Button onClick={this.editProjectUi.open}>Edit</Button>
              <Button onClick={this.deleteProjectUi.open}>Delete</Button>
            </Dropdown>
            {this.editProjectUi.isOpen && (
              <EditProjectScreen
                project={project}
                close={this.editProjectUi.close}
              />
            )}
            {this.deleteProjectUi.isOpen && (
              <DeleteProjectScreen
                project={project}
                close={this.deleteProjectUi.close}
              />
            )}
          </FlexBetween>
        </ContentHeader>
        <List
          items={[
            ['ID', project.id],
            ['Date Created', localizeDate(project.createdAt)],
          ]}
        />
      </Wrapper>
    );
  }
}

ProjectContent.propTypes = {
  project: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(ProjectContent);
