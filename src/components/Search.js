import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { createIdForA11y } from '../utils/tools';
import { Input } from './Forms';
import { SearchIcon } from './Icons';

const Wrapper = styled.div`
  display: block;
  flex: 1;
  position: relative;
`;

const Icon = styled(SearchIcon)`
  left: var(--size-14);
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const Field = styled(Input)`
  background-color: var(--color-white);
  border: none;
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  padding-bottom: var(--size-8);
  padding-left: var(--size-48);
  padding-top: var(--size-8);
  transition: box-shadow var(--duration-short);

  &:hover,
  &:focus {
    box-shadow: var(--elevation-low-darker);
  }
`;

class Search extends React.Component {
  descriptionId = createIdForA11y(`${Search.name}__description`);

  render() {
    const { description, onChange, placeholder, value } = this.props;
    return (
      <Wrapper>
        <label htmlFor="query">
          <Icon aria-hidden />
          <Field
            id="query"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby={this.descriptionId}
          />
        </label>
        <p id={this.descriptionId} hidden>
          {description}
        </p>
      </Wrapper>
    );
  }
}

Search.propTypes = {
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Search.defaultProps = {
  placeholder: '',
};

export default observer(Search);
