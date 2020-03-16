import React, { Fragment, useState } from 'react';
import {
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { isNotEmpty } from '../utils/validation';

const EditablePost = () => {
  const [values, setValues] = useState({
    text: '',
    sharedWith: 'public',
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  return (
    <div>
      <TextareaAutosize
        rowsMin={10}
        placeholder='What happening?'
        onChange={handleChange('text')}
      />
      <Select
        value={values.sharedWith}
        onChange={handleChange('sharedWith')}
      >
        <MenuItem value={'public'}>Public</MenuItem>
        <MenuItem value={'friends'}>Friends</MenuItem>
      </Select>
      <Button
        variant='contained'
        color='primary'
        disabled={isNotEmpty(values.text) ? false : true}
      >
        Publish
      </Button>
    </div>
  );
};

export default EditablePost;
