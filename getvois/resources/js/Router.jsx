import React, { Component } from 'react';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound';
// User is LoggedIn
import PrivateRoute from './PrivateRoute';
import Dashboard from './views/user/Dashboard/Dashboard';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    const state = localStorage.appState;
    if (state) {
      const AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
    }
  }

  render() {
    const { user, isLoggedIn } = this.state;

    return (
      <div>
        <Header userData={user} userIsLoggedIn={isLoggedIn} />
        <Container style={{ minHeight: 'calc( 100vh - 174px )' }} className="py-4">
          <Row>
            <Col>
              <Switch>
                {/* User might LogIn */}
                <Route exact path="/" component={Home} />
                {/* User will LogIn */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                {/* User is LoggedIn */}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                {/* Page Not Found */}
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Main;
