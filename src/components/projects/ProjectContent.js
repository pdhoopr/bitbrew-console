import PropTypes from "prop-types";
import React, { useContext } from "react";
import { localize } from "../../utils";
import Context from "../Context";
import { Button, IconButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { ContentHeader } from "../ui/Headers";
import { MoreIcon } from "../ui/Icons";
import { Link } from "../ui/Links";
import List from "../ui/List";
import Menu from "../ui/Menu";
import { Content } from "../ui/Sections";
import { ContentHeading, Text } from "../ui/Texts";
import DeleteProjectDialog from "./DeleteProjectDialog";
import EditProjectForm from "./EditProjectForm";

export default function ProjectContent({
  onDelete,
  onUpdate,
  project,
  showOrgOnForm,
}) {
  const { openDialog, openDrawer } = useContext(Context);

  const name = project.name.trim();
  return (
    <Content as="section">
      <ContentHeader>
        <FlexBetween>
          <div>
            <ContentHeading gray={!name}>
              <Link
                to={`/orgs/${project.orgId}/projects/${project.id}/devices`}
              >
                {name || "Unnamed project"}
              </Link>
            </ContentHeading>
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
                openDrawer(
                  <EditProjectForm
                    showOrgOnForm={showOrgOnForm}
                    project={project}
                    onUpdate={onUpdate}
                  />,
                );
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                openDialog(
                  <DeleteProjectDialog project={project} onDelete={onDelete} />,
                );
              }}
            >
              Delete
            </Button>
          </Menu>
        </FlexBetween>
      </ContentHeader>
      <List
        items={[
          ["ID", project.id],
          ["Created On", localize(project.createdAt)],
        ]}
      />
    </Content>
  );
}

ProjectContent.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
  }).isRequired,
  showOrgOnForm: PropTypes.bool,
};

ProjectContent.defaultProps = {
  showOrgOnForm: false,
};
