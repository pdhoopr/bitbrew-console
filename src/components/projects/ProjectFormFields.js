import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label, ReadOnlyInput } from '../ui/Forms';
import Select from '../ui/Select';

function ProjectFormFields({ form, org, selectOrgFrom }) {
  return (
    <React.Fragment>
      <Label htmlFor="orgId">
        Organization
        {org ? (
          <ReadOnlyInput id="orgId" value={org.name} />
        ) : (
          <Select id="orgId" value={form.orgId} onChange={form.setValue}>
            {selectOrgFrom.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        )}
      </Label>
      <Label htmlFor="name">
        Name
        <Input id="name" value={form.name} onChange={form.setValue} />
      </Label>
      <Label htmlFor="description">
        Description
        <Input
          id="description"
          value={form.description}
          onChange={form.setValue}
        />
      </Label>
    </React.Fragment>
  );
}

ProjectFormFields.propTypes = {
  form: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  selectOrgFrom: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

ProjectFormFields.defaultProps = {
  org: null,
  selectOrgFrom: [],
};

export default observer(ProjectFormFields);
