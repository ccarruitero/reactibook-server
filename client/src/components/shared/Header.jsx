import React from 'react';
import {
  AppBar,
  Typography,
} from '@material-ui/core';

const Header = ({ title }) => {
  return (
    <AppBar position='static'>
      <Typography variant='h4'>
        { title }
      </Typography>
    </AppBar>
  );
}

export default Header;
