import {
  Button, Container,


  Grid, TextField,


  Tooltip
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../models/User';
import { AddUser } from '../service/api';
import { useStylesCreateAccount } from '../syle/CreateAccountStyle';
import { useStyles } from '../syle/Style';
import Alerts from './Alerts';
import { validMail } from './user/Functions';

export default function CreateAccount() {
  const classes1 = useStyles();
  const classes = useStylesCreateAccount();

  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [pas, setPas] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setName(null);
    setSurname(null);
    setEmail(null);
    setPhone(null);
    setPas(null);
    setPassword(null);
    setUsername(null);
    setImage(null);
  }, []);

  const handleClear = (e: any) => {
    setName(null);
    setSurname(null);
    setEmail(null);
    setPhone(null);
    setPas(null);
    setPassword(null);
    setUsername(null);
    setImage(null);
  };

  function validation(): boolean {
    let final: boolean = true;

    if (email === null || !validMail(email)) {
      var elem = document.getElementById('outlined-basic-email');
      if (typeof elem !== 'undefined' && elem !== null) {
        elem.style.color = 'red';
      }
      final = false;
    }

    if (name === null || name === '') {
      var elem1 = document.getElementById('outlined-basic-name');
      if (typeof elem1 !== 'undefined' && elem1 !== null) {
        elem1.style.color = 'red';
      }
      final = false;
    }

    if (surname === null || surname === '') {
      var elem2 = document.getElementById('outlined-basic-surname');
      if (typeof elem2 !== 'undefined' && elem2 !== null) {
        elem2.style.color = 'red';
      }
      final = false;
    }

    if (phone === null || phone === '') {
      var elem3 = document.getElementById('outlined-basic-phone');
      if (typeof elem3 !== 'undefined' && elem3 !== null) {
        elem3.style.color = 'red';
      }
      final = false;
    }

    if (username === null || username === '') {
      var elem4 = document.getElementById('outlined-basic-username');
      if (typeof elem4 !== 'undefined' && elem4 !== null) {
        elem4.style.color = 'red';
      }
      final = false;
    }

    if (password !== pas) {
      var elem5 = document.getElementById('outlined-basic-password');
      var elem6 = document.getElementById('outlined-basic-pas');
      if (
        typeof elem5 !== 'undefined' &&
        elem5 !== null &&
        typeof elem6 !== 'undefined' &&
        elem6 !== null
      ) {
        elem5.style.color = 'red';
        elem6.style.color = 'red';
      }
      final = false;
    }

    return final;
  }

  const handleAdd = async (e: any) => {
    e.preventDefault();

    if (validation()) {
      if (image === null) setImage('');
      const user: User = new User(
        0,
        name!,
        surname!,
        phone!,
        email!,
        username!,
        password!,
        false,
        image!
      );
      try {
        const res = await AddUser(user);
        if (res.error || res.status === 404) {
          setText('Nije moguce kreirati korisnika sa datim korisnickim imenom.');
          handleClickAlertError();
        } else {
          setText('Uspesno kreiran nalog!');
          handleClickAlert();
          handleClear(e);
        }
      } catch {
        setText('Greska prilikom povezivanja sa serverom.');
        setOpenAlertError(true);
      }
    }
  };
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };

  return (
    <div className={classes1.loginBackground}>
      {openAlert ? (
        <Alerts
          text={text}
          type="succsess"
          setText={() => setOpenAlert(false)}
          setType={() => setOpenAlert(false)}
        />
      ) : null}
      {openAlertError ? (
        <Alerts
          text={text}
          type="error"
          setText={() => setOpenAlertError(false)}
          setType={() => setOpenAlertError(false)}
        />
      ) : null}
      <Container className={classes.container}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} className={classes.gridItem}>
            <label className={classes.createLabel}>Kreirajte nalog:</label>
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              required
              id="outlined-basic-name"
              label="Ime"
              variant="outlined"
              className={classes.elements}
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic-surname"
              label="Prezime"
              variant="outlined"
              className={classes.elements}
              value={surname || ''}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              required
              id="outlined-basic-telefon"
              label="Telefon"
              variant="outlined"
              className={classes.elements}
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic-email"
              label="E-mail"
              variant="outlined"
              className={classes.elements}
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              required
              id="outlined-basic-username"
              label="Korisnicko ime"
              variant="outlined"
              className={classes.elements}
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              required
              id="outlined-basic-password"
              label="Lozinka"
              variant="outlined"
              className={classes.elements}
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <TextField
              required
              id="outlined-basic-pas"
              label="Ponovljena lozinka"
              variant="outlined"
              className={classes.elements}
              value={pas || ''}
              onChange={(e) => setPas(e.target.value)}
              type="password"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Tooltip title="URL slike">
              <TextField
                id="outlined-basic-image"
                label="Slika"
                variant="outlined"
                className={classes.elements}
                value={image || ''}
                onChange={(e) => setImage(e.target.value)}
              />
            </Tooltip>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#4EB8CE',
                color: '#222431',
              }}
              className={classes.buttons}
              startIcon={<ArrowBackIosIcon />}
              component={Link}
              to="/login"
            >
              Nazad
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#222431',
                color: '#4EB8CE',
              }}
              className={classes.buttons}
              onClick={(e) => handleAdd(e)}
            >
              Kreiraj nalog
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
