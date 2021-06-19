import React, { Component } from 'react';
import { Button, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signIn } from '../actions';


class LoginPage extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentDidUpdate() {
        const { error, isAuth } = this.props;
        if (error && this.bag) {
            //console.log(error);
            this.bag.setSubmitting(false);
        }

        if (isAuth) {
            this.props.history.push('/');
        }
    }

    _handleFormSubmit(values, bag) {
        this.props.signIn(values);
        this.bag = bag;
        //console.log(values);
    }


    _renderErrorIfAny() {
        const { error } = this.props;
        if (error) {
            return (
                <Alert variant="danger">
                    {error}
                </Alert>
            );
        }
    }

    render() {
        return (
            <div style={{ padding: 20 }}>

                <h3 align="center"> Log In </h3>


                {this._renderErrorIfAny()}


                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={this._handleFormSubmit.bind(this)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().min(8).required()
                    })}
                    render={({
                        handleChange,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                        handleBlur,
                        errors,
                        touched
                    }) => (
                        <div>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormControl isInvalid={errors.email && touched.email} name="email" type="email" placeholder="someone@email.com" onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? <FormControl.Feedback>{errors.email}</FormControl.Feedback> : null}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl isInvalid={errors.password && touched.password} name="password" type="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} />
                                {errors.password && touched.password ? <FormControl.Feedback>{errors.password}</FormControl.Feedback> : null}
                            </FormGroup>
                            <Button style={{ backgroundColor: "#6441A5", borderColor: "#6441A5" }} block onClick={handleSubmit} disabled={!isValid || isSubmitting || this.props.cookies.get("connect.sid") == null}>Log In</Button>
                            {/* || this.props.cookies.get("connect.sid") == null */}
                        </div>
                    )}
                />
                <Link to='/download-stegopay'> Don't have an account? Download StegoPay!</Link>
            </div >
        );
    }
}

const mapStateToProps = ({ auth, order }) => {
    return {
        attempting: auth.attempting,
        error: auth.error,
        isAuth: auth.isAuth,
        error_fetching: order.error_fetching
    };
};

const Login = connect(
    mapStateToProps,
    { signIn }
)(withCookies(LoginPage));
export { Login };