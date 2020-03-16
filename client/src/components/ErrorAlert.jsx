import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ErrorAlert = (props) => {
  const [open, setOpen] = useState(true);

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.onClose();
  };

  return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
	    <MuiAlert elevation={6} variant="filled" severity='error' {...props}>
				{props.message}
			</MuiAlert>
		</Snackbar>
  );
}

export default ErrorAlert;
