import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Form from './shared/Form';

const Login = () => {
  return (
    <Fragment>
      <Form header='Login' />
      <div>
        Dont have an account.
        <Link to='/signup'>Sign up here</Link>
      </div>
    </Fragment>
  );
}

export default Login;
