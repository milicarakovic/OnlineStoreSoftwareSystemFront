import { Button, Grid, TextField } from '@material-ui/core';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { User } from '../../models/User';
import { useStylesContactAdmin } from '../../syle/ContactAdminStyle';
import Alerts from '../Alerts';

interface Props {
  user: User;
}

export default function ContactAdmin(props: Props) {
  const classes = useStylesContactAdmin();
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  function sendEmail(e: any) {
    e.preventDefault();

    emailjs
      .sendForm('gmail', 'order', e.target, 'user_8vMoUjbD3IGRcOxqdxTfH')
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          console.log('success');
          handleClickAlert();
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
    e.target.reset();
  }
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  return (
    <div className={classes.root}>
      {openAlert ? (
        <Alerts
          text="Poruka je poslata!"
          type="succsess"
          setText={() => setOpenAlert(false)}
          setType={() => setOpenAlert(false)}
        />
      ) : null}
      <form onSubmit={sendEmail} className={classes.form}>
        <Grid container>
          <Grid item xs={12} className={classes.labelContactUs}>
            <label>Kontaktirajte nas </label>
          </Grid>
          <Grid item xs={12}>
            <label className={classes.label}>Ime i prezime: </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic-fullName"
              variant="outlined"
              value={props.user.name + ' ' + props.user.surname}
              name="fullName"
              required
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Email: </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic-email"
              variant="outlined"
              value={props.user.email}
              name="email"
              required
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Poruka: </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              variant="outlined"
              name="message"
              required
              className={classes.input}
            />
          </Grid>
          <input type="submit" id="submit-email" style={{ display: 'none' }} />
          <Grid item xs={12}>
            <label htmlFor="submit-email">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.input}
                style={{ backgroundColor: '#676d92' }}
              >
                Posalji
              </Button>
            </label>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
