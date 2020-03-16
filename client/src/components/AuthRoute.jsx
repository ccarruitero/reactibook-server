import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (localStorage.getItem('authToken') ? (
      children
    ) : (
      <Redirect
        to={{ pathname: '/login', state: { from: props.location } }}
      />
    ))}
  />
);

export default AuthRoute;
