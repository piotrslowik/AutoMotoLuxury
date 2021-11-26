import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import helpers from "../../../store/actions/helpers";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AppSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(state => state.helpers);
  const { open, message, time, type } = snackbar;

  const handleClose = () => {
    dispatch(helpers.resetSnackbar());
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={time}
      message={ type ? null : message}
      onClose={handleClose}
    >
      { type 
      ?  <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          { message }
        </Alert>
      : null
      }
    </Snackbar>
  );
}

export default AppSnackbar;
