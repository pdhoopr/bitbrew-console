import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Input } from './Forms';
import { SearchIcon } from './Icons';

const Wrapper = styled(Card)`
  display: block;
  flex: 1;
  position: relative;
`;

const Icon = styled(SearchIcon)`
  margin-bottom: var(--size-8);
  margin-left: var(--size-16);
  margin-top: var(--size-8);
  position: relative;
  z-index: 1;
`;

const Query = styled(Input)`
  border: none;
  bottom: 0;
  left: 0;
  padding-left: var(--size-52);
  position: absolute;
  right: 0;
  top: 0;
`;

export default function Search({ description, onChange, placeholder, value }) {
  return (
    <Wrapper>
      <label htmlFor="query">
        <Icon />
        <Query
          id="query"
          value={value}
          onChange={onChange}
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="searchDescription"
        />
      </label>
      <p id="searchDescription" hidden>
        {description}
      </p>
    </Wrapper>
  );
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
