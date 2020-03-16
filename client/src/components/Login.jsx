import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Form from './shared/Form';
import { login } from '../api/reactibookAPI';

const Login = () => {
  return (
    <Fragment>
      <Form
        header='Login'
        onSubmit={login}
      />
      <div>
        Dont have an account.
        <Link to='/signup'>Sign up here</Link>
      </div>
    </Fragment>
  );
}

export default Login;
