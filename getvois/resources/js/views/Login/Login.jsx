import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: props.location,
    };
  }

  render() {
    return (
      <div className="content">
        <LoginContainer redirect={this.state.redirect} />
      </div>
    );
  }
}
export default withRouter(Login);
