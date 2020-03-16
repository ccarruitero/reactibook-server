import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Form from './shared/Form';
import { signUp } from '../api/reactibookAPI';

const SignUp = () => {
  return (
    <Fragment>
      <Form
        confirmation={true}
        header='Sign Up'
        onSubmit={signUp}
      />
      <div>
        Already have an account.
        <Link to='/login'>Login here</Link>
      </div>
    </Fragment>
  );
}

export default SignUp;
