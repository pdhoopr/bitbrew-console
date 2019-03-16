import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listOrgMembers, listProjects } from "../../api";
import AppContext from "../AppContext";
import { orgMemberType, projectType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import ViewPage from "../shared/ViewPage";
import DeleteOrgDialog from "./DeleteOrgDialog";
import OrgContext from "./OrgContext";
import UpdateOrgForm from "./UpdateOrgForm";

export default function ViewOrgPage({ navigate, orgId }) {
  const { openDialog, openDrawer } = useContext(AppContext);
  const { loadOrg, org, orgIsLoading } = useContext(OrgContext);

  const [numMembers, setNumMembers] = useState(0);
  const [numProjects, setNumProjects] = useState(0);

  async function loadMetrics() {
    const [
      { totalItems: totalMembers },
      { totalItems: totalProjects },
    ] = await Promise.all([listOrgMembers(orgId), listProjects(orgId)]);
    setNumMembers(totalMembers);
    setNumProjects(totalProjects);
  }

  const metricsAreLoading = useLoading(loadMetrics, [orgId]);

  return (
    <ViewPage
      isLoading={orgIsLoading || metricsAreLoading}
      resource={{
        ...org,
        updatedAt: null,
      }}
      metrics={[
        {
          label: orgMemberType,
          value: numMembers,
        },
        {
          label: projectType,
          value: numProjects,
        },
      ]}
      onOpenForm={() => {
        openDrawer(<UpdateOrgForm org={org} onUpdate={loadOrg} />);
      }}
      onOpenDialog={() => {
        openDialog(
          <DeleteOrgDialog
            org={org}
            onDelete={() => {
              navigate("/");
            }}
          />,
        );
      }}
    />
  );
}

ViewOrgPage.propTypes = {
  navigate: PropTypes.func,
  orgId: PropTypes.string,
};

ViewOrgPage.defaultProps = {
  navigate: null,
  orgId: null,
};
