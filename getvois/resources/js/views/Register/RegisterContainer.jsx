import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import { Form, Button } from 'react-bootstrap';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      error: '',
      errorMessage: '',
      formSubmitting: false,
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
  }

  componentWillMount() {
    const state = localStorage.appState;
    if (state) {
      const AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
    }
    if (this.state.isRegistered) {
      return this.props.history.push('/dashboard');
    }

    return false;
  }

  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    ReactDOM.findDOMNode(this).scrollIntoView();
    const userData = this.state.user;
    axios.post('/api/auth/signup', userData)
      .then((response) => response).then((json) => {
        if (json.data.success) {
          const userData = {
            id: json.data.id,
            name: json.data.name,
            email: json.data.email,
            activation_token: json.data.activation_token,
          };
          const appState = {
            isRegistered: true,
            user: userData,
          };
          localStorage.appState = JSON.stringify(appState);
          this.setState({
            isRegistered: appState.isRegistered,
            user: appState.user,
          });
        } else {
          alert('Our System Failed To Register Your Account!');
        }
      }).catch((error) => {
        if (error.response) {
          const err = error.response.data;
          this.setState({
            error: err.message,
            errorMessage: err.errors,
            formSubmitting: false,
          });
        } else if (error.request) {
          const err = error.request;
          this.setState({
            error: err,
            formSubmitting: false,
          });
        } else {
        // Something happened in setting up the request that triggered an Error
          const err = error.message;
          this.setState({
            error: err,
            formSubmitting: false,
          });
        }
      })
      .finally(this.setState({ error: '' }));
  }

  handleName(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user, name: value,
      },
    }));
  }


  handleEmail(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user, email: value,
      },
    }));
  }

  handlePassword(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user, password: value,
      },
    }));
  }

  handlePasswordConfirm(e) {
    const { value } = e.target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user, password_confirmation: value,
      },
    }));
  }

  render() {
    const { errorMessage } = this.state;
    const arr = [];
    Object.values(errorMessage).forEach((value) => (
      arr.push(value)
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
            <h2>Create Your Account</h2>
            {this.state.isRegistered ? (
              <FlashMessage duration={60000} persistOnHover>
                <h5 className="alert alert-success">Registration successful, redirecting...</h5>
              </FlashMessage>
            ) : ''}
            {this.state.error ? (
              <FlashMessage duration={900000} persistOnHover>
                <h5 className="alert alert-danger">
                  Error:
                  {this.state.error}
                </h5>
                <ul>
                  {arr.map((item, i) => (
                    <li key={i}><h5 style={{ color: 'red' }}>{item}</h5></li>
                  ))}
                </ul>
              </FlashMessage>
            ) : ''}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Name" onChange={this.handleName} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="email" placeholder="E-mail" onChange={this.handleEmail} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="Confirm Password" onChange={this.handlePasswordConfirm} />
              </Form.Group>
              <Button variant="warning" type="submit" disabled={this.state.formSubmitting ? 'disabled' : ''}>
                Create Account
              </Button>
            </Form>
            <p className="text-white">
              Already have an account?
              <Link to="/login" className="text-yellow"> Log In</Link>
              <span className="pull-right"><Link to="/" className="text-white">Back to Home</Link></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterContainer);
