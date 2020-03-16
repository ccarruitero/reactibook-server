import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Form from './shared/Form';

const SignUp = () => {
  return (
    <Fragment>
      <Form
        confirmation={true}
        header='Sign Up'
      />
      <div>
        Already have an account.
        <Link to='/login'>Login here</Link>
      </div>
    </Fragment>
  );
}

export default SignUp;
