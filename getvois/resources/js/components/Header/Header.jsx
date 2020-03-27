import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Navbar, Nav, NavDropdown, Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userData,
      isLoggedIn: props.userIsLoggedIn,
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    const appState = {
      isLoggedIn: false,
      user: {},
    };
    localStorage.appState = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }

  render() {
    const aStyle = {
      cursor: 'pointer',
    };

    const { isLoggedIn, user } = this.state;

    return (
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              color: '#f1d204',
              fontSize: '60px',
              transition: 'all 0.3s',
              lineHeight: '75px',
              fontWeight: '700',
            }}
          >
            VOIS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="vois-nav"/>
          <Navbar.Collapse id="vois-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Index</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {
                isLoggedIn
                  ? (
                    <LinkContainer to="/dashboard">
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                  )
                  : ''
              }
              {!isLoggedIn
                ? (
                  <NavDropdown title="Account" id="collapsible-nav-dropdown" className="justify-self-end pl-lg-5">
                    <LinkContainer to="/login">
                      <NavDropdown.Item>Login</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                    <LinkContainer to="/register">
                      <NavDropdown.Item>Register</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                ) : ''}
            </Nav>
            {
              isLoggedIn
                ? (
                  <Navbar.Text>
                    Signed in as:
                    {' '}
                    <Link to="/login">
                      {user.name}
                    </Link>
                  </Navbar.Text>
                )
                : ''
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  userData: PropTypes.object,
  userIsLoggedIn: PropTypes.bool,
};

export default withRouter(Header);
