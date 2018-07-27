import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import FormStore from '../stores/FormStore';
import { Input, Label, ReadOnlyInput } from './Forms';
import ModalForm from './ModalForm';
import Select from './Select';

class CreateProjectModal extends React.Component {
  form = FormStore
    // prettier-ignore
    .props({
      name: '',
      orgId: this.props.scopeToOrg ? this.props.scopeToOrg.id : '',
      description: '',
      usesSimulatedDevices: false,
    })
    .create();

  tryToCreateProject = async event => {
    event.preventDefault();
    await this.props.createProject(this.form.serialized);
    this.props.close();
  };

  render() {
    const { close, orgs, scopeToOrg } = this.props;
    return (
      <ModalForm
        close={close}
        title="New Project"
        buttonText="Create"
        submit={this.tryToCreateProject}
      >
        <Label htmlFor="orgId">
          Organization
          {scopeToOrg ? (
            <ReadOnlyInput id="orgId" value={scopeToOrg.name} />
          ) : (
            <Select
              id="orgId"
              value={this.form.orgId}
              onChange={this.form.setValue}
            >
              {orgs.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Select>
          )}
        </Label>
        <Label htmlFor="name">
          Name
          <Input
            id="name"
            value={this.form.name}
            onChange={this.form.setValue}
          />
        </Label>
        <Label htmlFor="description">
          Description
          <Input
            id="description"
            value={this.form.description}
            onChange={this.form.setValue}
          />
        </Label>
      </ModalForm>
    );
  }
}

CreateProjectModal.propTypes = {
  close: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  scopeToOrg: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

CreateProjectModal.defaultProps = {
  orgs: undefined,
  scopeToOrg: undefined,
};

export default observer(CreateProjectModal);
