import React, { useState } from 'react';
import { Manufacturer } from '../../models/Manufacturer';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Tooltip,
  Snackbar,
} from '@material-ui/core';
import { useStylesManageManufacturers } from '../../syle/AuxiliaryElementsStyle';
import SaveIcon from '@material-ui/icons/Save';
import { validMail } from '../user/Functions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AddManufacturer } from '../../service/api';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  manufacturers: Manufacturer[];
  onAddManufacturer: (manufacturer: Manufacturer) => any;
}

export default function ManageManufacturers(props: Props) {
  const classes = useStylesManageManufacturers();
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [adress, setAdress] = useState<string | null>(null);

  const [openName, setOpenName] = useState<boolean>(false);
  const [openPhone, setOpenPhone] = useState<boolean>(false);
  const [openEmail, setOpenEmail] = useState<boolean>(false);
  const [openAdress, setOpenAdress] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleAddManufacturer = () => {
    let good: boolean = true;
    if (name === null || name === '') {
      setOpenName(true);
      good = false;
    }
    if (email === null || (email !== null && !validMail(email))) {
      setOpenEmail(true);
      good = false;
    }
    if (phone === null || phone === '') {
      setOpenPhone(true);
      good = false;
    }
    if (adress === null || adress === '') {
      setOpenAdress(true);
      good = false;
    }

    if (good) {
      let manu: Manufacturer = new Manufacturer(
        0,
        name!,
        phone!,
        email!,
        adress!
      );
      onAddManufacturer(manu);
    }
  };

  const onAddManufacturer = async (man: Manufacturer) => {
    try {
      const res = await AddManufacturer(man);
      if (res.status === 404) {
        handleClickAlertError();
      } else {
        handleClickAlert();
        handleCancel();
      }
    } catch (e) {
      console.log('error in adding manufacturer');
      console.log(e);
      handleClickAlertError();
    }
  };
  const handleCancel = () => {
    setName(null);
    setPhone(null);
    setEmail(null);
    setPhone(null);
    setAdress(null);
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleClickAlertError = () => {
    setOpenAlertError(true);
  };
  const handleCloseAlertError = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertError(false);
  };

  return (
    <Grid component={Paper} className={classes.root}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno kreiran proizvodjac!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error">
          Nije moguce kreirati proizvodjaca.
        </Alert>
      </Snackbar>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.labelMain}>Dodajte proizvodjaca...</label>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Naziv </label>
        <Tooltip
          open={openName}
          title="Unesite validan naziv."
          placement="right"
        >
          <TextField
            required
            id="standard-required-name-man"
            variant="outlined"
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
              setOpenName(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Telefon </label>
        <Tooltip
          open={openPhone}
          title="Unesite validan broj telefona."
          placement="right"
        >
          <TextField
            required
            id="standard-required-phone"
            variant="outlined"
            value={phone || ''}
            onChange={(e) => {
              setPhone(e.target.value);
              setOpenPhone(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Email </label>
        <Tooltip
          open={openEmail}
          title="Unesite validan email."
          placement="right"
        >
          <TextField
            required
            id="standard-required-email"
            variant="outlined"
            value={email || ''}
            onChange={(e) => {
              setEmail(e.target.value);
              setOpenEmail(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <label className={classes.label}>Adresa </label>
        <Tooltip
          open={openAdress}
          title="Unesite validnu adresu."
          placement="right"
        >
          <TextField
            required
            id="standard-required-adress"
            variant="outlined"
            value={adress || ''}
            onChange={(e) => {
              setAdress(e.target.value);
              setOpenAdress(false);
            }}
            className={classes.textFieldItem}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Grid item xs={6}>
          <Button
            id="removeMan"
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            onClick={handleCancel}
            style={{ backgroundColor: '#676d92', color: 'white' }}
            className={classes.btns}
          >
            Ponisti
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id="addMan"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleAddManufacturer}
            style={{ backgroundColor: '#222431', color: 'white' }}
            className={classes.btns}
          >
            Sacuvaj
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
