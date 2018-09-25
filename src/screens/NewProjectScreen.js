import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label, ReadOnlyInput } from '../components/Forms';
import ModalForm from '../components/ModalForm';
import Select from '../components/Select';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class NewProjectScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      orgId: this.props.org ? this.props.org.id : '',
      name: '',
      description: '',
      usesSimulatedDevices: false,
    })
    .create();

  tryToCreateProject = async event => {
    event.preventDefault();
    await this.props.createProject(this.form.serialized);
    this.props.close();
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, org, orgsAtoZ } = this.props;
    return (
      <ModalForm
        title="New Project"
        buttonText="Create"
        onSubmit={this.tryToCreateProject}
        close={close}
      >
        <Label htmlFor="orgId">
          Organization
          {org ? (
            <ReadOnlyInput id="orgId" value={org.name} />
          ) : (
            <Select
              id="orgId"
              value={this.form.orgId}
              onChange={this.form.setValue}
            >
              {orgsAtoZ.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
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

NewProjectScreen.propTypes = {
  close: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  orgsAtoZ: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

NewProjectScreen.defaultProps = {
  org: null,
};

export default connect(
  NewProjectScreen,
  ({ orgStore, projectStore }) => ({
    createProject: projectStore.createProject,
    orgsAtoZ: orgStore.orgsAtoZ,
  }),
);
