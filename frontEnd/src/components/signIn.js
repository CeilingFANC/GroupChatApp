import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

}));



export default function TextFields() {
  const classes = useStyles();


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        margin="normal"
      />
  )
}