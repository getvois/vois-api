import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  Route,
  withRouter,
} from 'react-router-dom';

const stateOfState = localStorage.appState;
if (!stateOfState) {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.appState = JSON.stringify(appState);
}
const state = localStorage.appState;
const AppState = JSON.parse(state);

const Auth = {
  isLoggedIn: AppState.isLoggedIn,
  user: AppState,
};

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={
      (props) => (Auth.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: {
            prevLocation: path,
            error: 'You need to login first!',
          },
        }}
        />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(React.Component).isRequired,
  path: PropTypes.string.isRequired,
};

export default withRouter(PrivateRoute);
