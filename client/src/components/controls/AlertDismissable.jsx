import React from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: this.props.show,
    };
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show });
    }
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log(this.state);
    if (this.state.show) {
      return (
        <Alert status='error' onDismiss={this.handleDismiss}>
          <AlertIcon />
          <AlertTitle>Oh snap! You got an error!</AlertTitle>
          <AlertDescription>
            <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.message}</p>
          </AlertDescription>
        </Alert>
      );
    }

    return '';
  }
}

AlertDismissable.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertDismissable;
