import {
  Button, Container,

  FormControlLabel,

  Grid, Switch,

  TextField
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import React, { useEffect, useState } from 'react';
import { User } from '../../models/User';
import { UpdateUser } from '../../service/api';
import { useStylesProfile } from '../../syle/UserStyles';
import Alerts from '../Alerts';
import { validMail } from './Functions';

interface Props {
  user: User | null;
}

export default function Profile(props: Props) {
  const classes = useStylesProfile();
  const [disable, setDisable] = useState<boolean>(true);

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
  const [serverAlert, setServerAlert] = useState<boolean>(false);
  useEffect(() => {
    if (props.user !== null) {
      setName(props.user.name);
      setSurname(props.user.surname);
      setEmail(props.user.email);
      setPhone(props.user.phone);
      setUsername(props.user.username);
      setPassword(props.user.password);
      setPas(props.user.password);
      setImage(props.user.image);
    }
  }, [props.user]);

  const handleClear = () => {
    if (props.user !== null) {
      setName(props.user.name);
      setSurname(props.user.surname);
      setEmail(props.user.email);
      setPhone(props.user.phone);
      setUsername(props.user.username);
      setPassword(props.user.password);
      setPas(props.user.password);
      setDisable(true);
    }
  };

  function validation(): boolean {
    let final: boolean = true;

    if (email === null || !validMail(email)) {
      var elem = document.getElementById('label-email');
      if (typeof elem !== 'undefined' && elem !== null) {
        elem.style.color = 'red';
      }
      final = false;
    }

    if (name === null || name === '') {
      var elem1 = document.getElementById('label-name');
      if (typeof elem1 !== 'undefined' && elem1 !== null) {
        elem1.style.color = 'red';
      }
      final = false;
    }

    if (surname === null || surname === '') {
      var elem2 = document.getElementById('label-surname');
      if (typeof elem2 !== 'undefined' && elem2 !== null) {
        elem2.style.color = 'red';
      }
      final = false;
    }

    if (phone === null || phone === '') {
      var elem3 = document.getElementById('label-phone');
      if (typeof elem3 !== 'undefined' && elem3 !== null) {
        elem3.style.color = 'red';
      }
      final = false;
    }

    if (username === null || username === '') {
      var elem4 = document.getElementById('label-username');
      if (typeof elem4 !== 'undefined' && elem4 !== null) {
        elem4.style.color = 'red';
      }
      final = false;
    }

    if (password !== pas) {
      var elem5 = document.getElementById('label-password1');
      var elem6 = document.getElementById('label-password2');
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

  const handleUpdate = () => {
    let valid: boolean = validation();
    let newUser: User;
    if (
      valid &&
      props.user !== null &&
      name !== null &&
      surname !== null &&
      phone !== null &&
      username !== null &&
      email !== null &&
      password !== null
    ) {
      var elem5 = document.getElementById('label-password1');
      var elem6 = document.getElementById('label-password2');
      if (
        typeof elem5 !== 'undefined' &&
        elem5 !== null &&
        typeof elem6 !== 'undefined' &&
        elem6 !== null
      ) {
        elem5.style.color = 'black';
        elem6.style.color = 'black';
      }

      newUser = new User(
        props.user.id,
        name,
        surname,
        phone,
        email,
        username,
        password,
        props.user.isAdmin,
        props.user.image
      );
      updateUser(newUser);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const res = await UpdateUser(user);
      if (res.error) {
        handleClickAlertError();
      } else {
        handleClickAlert();
        setName(name);
        setSurname(surname);
        setEmail(email);
        setPhone(phone);
        setUsername(username);
        setPassword(password);
        setPas(password);
        setImage(image);
        setDisable(true);
      }
    } catch (error) {
      setServerAlert(true);
    }
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleClickAlertError = () => {
    setOpenAlertError(true);
    console.log('error');
  };

  return (
    <Container className={classes.root}>
      {openAlert ? (
        <Alerts
          text="Uspesno izmenjen nalog!"
          type="succsess"
          setText={() => setOpenAlert(false)}
          setType={() => setOpenAlert(false)}
        />
      ) : null}
      {openAlertError ? (
        <Alerts
          text="Nije moguce izmeniti nalog!"
          type="error"
          setText={() => setOpenAlertError(false)}
          setType={() => setOpenAlertError(false)}
        />
      ) : null}
      {serverAlert ? (
        <Alerts
          text="Nije moguce povezati se sa serverom!"
          type="error"
          setText={() => setServerAlert(false)}
          setType={() => setServerAlert(false)}
        />
      ) : null}
      <FormControlLabel
        control={
          <Switch
            onChange={(e) => setDisable(disable ? false : true)}
            name="checkedB"
            color="primary"
          />
        }
        label="Omoguci izmene"
        className={classes.switch}
        checked={!disable}
      />

      <form className={classes.container}>
        <Grid container className={classes.con}>
          <Grid item xs={4}>
            <Grid item xs={6} className={classes.gridItem}>
              <label className={classes.label} id="label-name">
                Ime:
              </label>
              <TextField
                required
                id="standard-required-ime"
                disabled={disable}
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <label id="label-surname" className={classes.label}>
                Prezime:
              </label>
              <TextField
                required
                id="standard-required-prezime"
                disabled={disable}
                value={surname || ''}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <label id="label-phone" className={classes.label}>
                Telefon:
              </label>
              <TextField
                required
                id="standard-required-telefon"
                disabled={disable}
                value={phone || ''}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <label id="label-email" className={classes.label}>
                Email:
              </label>
              <TextField
                required
                id="standard-required-email"
                disabled={disable}
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={6} className={classes.gridItem2}>
              <label id="label-username" className={classes.label2}>
                Korisnicko ime:
              </label>
              <TextField
                required
                id="standard-required-korisnickoIme"
                disabled={disable}
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem2}>
              <label id="label-password1" className={classes.label2}>
                Lozinka:
              </label>
              <br />
              <TextField
                required
                id="standard-required-lozinka"
                disabled={disable}
                value={password || ''}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem2}>
              <label id="label-password2" className={classes.label2}>
                Ponovljena lozinka:
              </label>
              <TextField
                required
                id="standard-required-lozinka2"
                disabled={disable}
                value={pas || ''}
                type="password"
                onChange={(e) => setPas(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.rightElements}>
            <Grid item>
              <img
                src={
                  image
                    ? image
                    : 'https://image.flaticon.com/icons/svg/21/21104.svg'
                }
                style={{
                  maxWidth: '70%',
                  maxHeight: '30vh',
                  borderRadius: '2px',
                  marginLeft: '10%',
                }}
                alt="user"
              ></img>
            </Grid>
            <Grid item xs={3} className={classes.btnsFinal}>
              <Button
                id="delete"
                variant="contained"
                startIcon={<DeleteForeverIcon />}
                disabled={disable}
                className={classes.btnFinal}
                onClick={handleClear}
              >
                Odustani
              </Button>
            </Grid>
            <Grid item xs={3} className={classes.btnsFinal}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={disable}
                className={classes.btnFinal}
                onClick={handleUpdate}
              >
                Sacuvaj
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
