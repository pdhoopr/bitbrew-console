import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { IconButton } from './Buttons';
import { CloseIcon, ErrorIcon } from './Icons';
import { Text } from './Texts';

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--color-black);
  border-radius: var(--corner-radius);
  bottom: var(--size-24);
  box-shadow: var(--elevation-medium);
  color: var(--color-white);
  display: flex;
  left: 0;
  margin-left: var(--size-24);
  margin-right: var(--size-24);
  padding: var(--size-8) var(--size-16);
  position: fixed;
  z-index: 4;
`;

const Content = styled(Text)`
  flex: 1;
  margin-left: var(--size-8);
  margin-right: var(--size-16);
`;

const DismissIcon = styled(CloseIcon)`
  fill: var(--color-gray);
`;

class Banner extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  timeoutId = null;

  componentDidMount() {
    this.timeoutId = window.setTimeout(this.props.close, 5000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { children, close } = this.props;
    return (
      <Wrapper>
        <ErrorIcon aria-hidden />
        <Content>{children}</Content>
        <IconButton onClick={close} title="Close error banner">
          <DismissIcon />
        </IconButton>
      </Wrapper>
    );
  }
}

Banner.propTypes = {
  children: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default observer(Banner);
