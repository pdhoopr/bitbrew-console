import { PropTypes as MobxPropTypes, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../graphics/search-icon.svg';
import Search from '../models/Search';
import { RaisedInput } from './Inputs';

const SearchBar = styled.label`
  display: block;
  margin-top: var(--size-32);
  position: relative;
`;

const Icon = styled(SearchIcon)`
  fill: var(--color-dark-grey);
  height: var(--size-24);
  margin-left: var(--size-16);
  margin-top: 6px;
  position: relative;
  width: var(--size-24);
  z-index: 1;
`;

const Input = RaisedInput.extend`
  left: 0;
  padding-left: calc(var(--size-16) + var(--size-24) + var(--size-16));
  position: absolute;
  top: 0;
`;

const Section = styled.section`
  margin-top: var(--size-32);
`;

const Title = styled.h2`
  font-size: var(--size-24);
  font-weight: var(--weight-normal);
  line-height: var(--size-32);
`;

const searchByOrgName = orgs => query =>
  orgs.filter(org => new RegExp(query, 'i').test(org.properName));

class OrgList extends React.Component {
  search = Search.create({}, { onSearch: searchByOrgName(this.props.orgs) });

  render() {
    return (
      <>
        <SearchBar htmlFor="search">
          <Icon />
          <Input
            id="search"
            value={this.search.query}
            onChange={this.search.update}
            type="search"
            placeholder="Search by organization name"
          />
        </SearchBar>
        {this.search.results.map(org => (
          <Section key={org.id}>
            <Title data-testid="org-name">{org.properName}</Title>
          </Section>
        ))}
      </>
    );
  }
}

OrgList.propTypes = {
  orgs: MobxPropTypes.arrayOrObservableArrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      properName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default observer(OrgList);
