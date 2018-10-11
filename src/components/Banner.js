import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../utils/tools';
import Message from './Message';

function Banner({ clearErrorMessage, errorMessage }) {
  return (
    <div role="alert" aria-live="assertive">
      {errorMessage && (
        <Message close={clearErrorMessage}>{errorMessage}</Message>
      )}
    </div>
  );
}

Banner.propTypes = {
  clearErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

Banner.defaultProps = {
  errorMessage: null,
};

export default connect(
  Banner,
  ({ uiStore }) => ({
    clearErrorMessage: uiStore.clearErrorMessage,
    errorMessage: uiStore.errorMessage,
  }),
);
