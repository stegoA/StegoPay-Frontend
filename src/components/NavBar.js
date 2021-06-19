import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logOut } from '../actions'
import logo from '../StegoPay_logo_128.png'

class NavBarComponent extends Component {

    // Conditional rendering
    _renderLoginOrLogout() {
        const { isAuth, logOut, profile } = this.props;

        if (isAuth) {
            return (
                <Button style={{ backgroundColor: "#6441A5", borderColor: "#6441A5" }} onClick={() => logOut()}> Logout</ Button>
            );
        }

    }


    render() {
        return (
            <Navbar style={{ backgroundColor: "white" }} variant="light" expand="lg">
                <Navbar.Brand>
                    <img
                        src={logo}
                    />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {this._renderLoginOrLogout()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile
    };
};

const NavBar = connect(mapStateToProps, { logOut })(NavBarComponent);
export { NavBar };