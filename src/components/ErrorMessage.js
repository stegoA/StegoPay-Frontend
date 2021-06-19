import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const ErrorMessageComponent = ({ message }) => {
    if (message) {
        return <Alert variant='danger'>{message}</Alert>;
    }

    return <div></div>;
};

const mapStateToProps = ({ error }) => {
    return {
        message: error.message
    };
};
const ErrorMessage = connect(mapStateToProps)(ErrorMessageComponent);
export { ErrorMessage };