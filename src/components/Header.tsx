import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import { useStyles } from '../syle/Style';
import { Link } from 'react-router-dom';

export default function Header() {
  const classes = useStyles();
  const signOut = () => {
    localStorage.clear();
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar style={{ marginLeft: 'auto' }}>
        <label>Odjavi se</label>
        <IconButton
          edge="end"
          color="inherit"
          onClick={signOut}
          component={Link}
          to="/"
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
