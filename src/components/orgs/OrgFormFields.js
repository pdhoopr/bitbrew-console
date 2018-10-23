import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from '../ui/Forms';

function OrgFormFields({ form }) {
  return (
    <Label htmlFor="name">
      Name
      <Input id="name" value={form.name} onChange={form.setValue} />
    </Label>
  );
}

OrgFormFields.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default observer(OrgFormFields);
