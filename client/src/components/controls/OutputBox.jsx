import React from 'react';
import PropTypes from 'prop-types';

import { Textarea } from '@chakra-ui/react'

class OutputBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    if (this.props.show) {
      return (
        <Textarea
          name="code"
          type="textarea"
          componentClass="textarea"
          rows="8"
          readOnly
          value={this.props.message}
        />
      );
    }

    return (
      <Textarea
        name="code"
        type="textarea"
        componentClass="textarea"
        rows="8"
        readOnly
        value=""
      />
    );
  }
}

OutputBox.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default OutputBox;
