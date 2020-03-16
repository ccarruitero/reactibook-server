import React, { Fragment, useState } from 'react';
import {
  TextField,
  FormControl,
  AppBar,
  Typography,
  Button,
} from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import isValid from '../../utils/validation';

const StyledFormControl = styled(FormControl) ({
  width: '50%',
  'margin-top': '10px',
});

const useInvalidStyles = makeStyles({
  root: {
    '& input + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },

    '& p': {
      color: 'red',
    }
  }
});

const StyledTextField = styled(TextField)({
  margin: '5px 0',
});

const InputField = ({ name, handleChange, error, ...rest}) => {
  const [showError, setShowError] = useState(false);

  const onChangeFn = (event) => {
    setShowError(true);
    handleChange(name)(event);
  }

  const isInvalid = showError && error;
  const classes = useInvalidStyles();
  return (
    <StyledTextField
      id={name}
      label={name}
      variant='outlined'
      fullWidth
      onChange={onChangeFn}
      required
      helperText={isInvalid && 'Invalid field'}
      className={isInvalid ? classes.root : ''}
      {...rest}
    />
  );
};

const PasswordField = ({ name, handleChange, ...rest}) => (
  <InputField
    name={name}
    handleChange={handleChange}
    type='password'
    {...rest}
  />
);

const Form = ({ confirmation, header }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState(() => {
    const initialState = {};
    Object.entries(values).forEach(([key, value]) => {
      if ((key === 'passwordConfirmation') & !confirmation) {
        return;
      }
      if (!isValid(key, value, values)) {
        initialState[key] = true
      }
    });
    return initialState;
  });

  const validate = (field, fieldValue) => {
    if (isValid(field, fieldValue, values)) {
      const newErrors = Object.assign(
        {},
        ...Object.entries(errors)
          .filter(([key, value]) => key !== field)
          .map(([key, value]) => ({[key]: value}))
      );
      setErrors(newErrors);
    } else {
      setErrors({ ...errors, [field]: true});
    }
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    validate(prop, event.target.value);
  };

  const errorsCount = () => {
    return Object.keys(errors).length;
  }

  const handleSubmit = (event) => {
    if (errorsCount() === 0) {
      // call to api
    }
  };

  return (
    <Fragment>
      <AppBar position='static'>
        <Typography variant='h4'>
          { header }
        </Typography>
      </AppBar>
      <StyledFormControl>
        <InputField
          name='email'
          handleChange={handleChange}
          error={errors['email']}
        />
        <PasswordField
          name='password'
          handleChange={handleChange}
          error={errors['password']}
        />
        { confirmation &&
          <PasswordField
            name='passwordConfirmation'
            handleChange={handleChange}
            error={errors['passwordConfirmation']}
          />
        }
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          disabled={errorsCount() > 0 ? true : false}
        >
          Send
        </Button>
      </StyledFormControl>
    </Fragment>
  );
}

export default Form;
