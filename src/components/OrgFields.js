import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from './Forms';

function OrgFields({ form }) {
  return (
    <Label htmlFor="name">
      Name
      <Input id="name" value={form.name} onChange={form.setValue} />
    </Label>
  );
}

OrgFields.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default observer(OrgFields);
