import { Button, Container, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RequestUser } from '../models/RequestUser';
import { User } from '../models/User';
import { useStyles } from '../syle/Style';
import MainAdmin from './admin/MainAdmin';
import Alerts from './Alerts';
import Header from './Header';
import MainUser from './user/MainUser';

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  useEffect(() => {
    storeCollector();
    const data = JSON.parse(localStorage.getItem('login')!);
    if (data) {
      setUser(JSON.parse(data.user));
    }
  }, []);

  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem('login')!);
    if (store && store.loggedIn) {
      setLoggedIn(true);
      setUser(store.user);
    }
  };

  const login = () => {
    let requestUser: RequestUser = new RequestUser('', '');
    if (username !== null && password !== null) {
      requestUser.username = username;
      requestUser.password = password;
      fetch('http://localhost:61860/api/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(requestUser),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 404) {
          response.json().then((result) => {
            console.log(result);
            console.warn('result', result);
            let u: User = new User(
              result.id,
              result.name,
              result.surname,
              result.phone,
              result.email,
              result.username,
              result.password,
              result.isAdmin,
              result.image
            );
            localStorage.setItem(
              'login',
              JSON.stringify({
                loggedIn: true,
                token: result.token,
                user: JSON.stringify(u),
              })
            );
            storeCollector();

            setUser(u);
          });
        } else {
          handleClickAlert();
          setUsername(null);
          setPassword(null);
        }
      });
    }
  };
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  return (
    <>
      {!loggedIn ? (
        <div className={classes.loginBackground}>
          <Container className={classes.loginContainer}>
            <label className={classes.loginLabel}>Dobrodosli!</label>
            <TextField
              id="outlined-basic-username"
              label="Korisnicko ime"
              variant="outlined"
              className={classes.loginElements}
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="outlined-basic-password"
              label="Lozinka"
              variant="outlined"
              className={classes.loginElements}
              type="password"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              className={classes.loginButton}
              onClick={login}
            >
              Prijavi se
            </Button>
            <Button
              variant="contained"
              className={classes.loginButton}
              style={{ backgroundColor: '#222431', color: '#4EB8CE' }}
              component={Link}
              to="/kreirajnalog"
            >
              Kreiraj nalog
            </Button>
            {openAlert ? (
              <Alerts
                text="Ne postoji korisnik sa unetim korisnickim imenom i lozinkom."
                type="info"
                setText={() => setOpenAlert(false)}
                setType={() => setOpenAlert(false)}
              />
            ) : null}
          </Container>
        </div>
      ) : (
        <>
          <Container className={classes.container}>
            <Header />
            {user?.isAdmin ? (
              <MainAdmin user={user} />
            ) : (
              <MainUser user={user!} />
            )}
          </Container>
        </>
      )}
    </>
  );
}
