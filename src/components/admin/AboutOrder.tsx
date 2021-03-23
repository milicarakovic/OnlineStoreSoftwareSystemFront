import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  MenuItem,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import moment from 'moment';
import React, { useState } from 'react';
import { Order } from '../../models/Order';
import { UpdateOrder } from '../../service/api';
import { useStylesOrders } from '../../syle/ManageOrdersStyles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  order: Order;
  onChangeOrder: (order: Order) => any;
}
export default function ABoutOrder(props: Props) {
  const classes = useStylesOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [disable, setDisable] = useState<boolean>(true);
  const availableStatus = ['Isporuceno', 'Prihvaceno', 'Odbijeno', 'Obrada'];
  const [status, setStatus] = useState<string | null>(null);
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);

  const handleOpenDetails = (orderID: number) => {
    setOpenDetails(true);
  };
  function determineStatus(status: string) {
    if (status === 'Isporuceno') return 0;
    if (status === 'Prihvaceno') return 1;
    if (status === 'Odbijeno') return 2;
    if (status === 'Obrada') return 3;
    return -1;
  }

  const handleUpdate = (status: string) => {
    let orderToUpdate = props.order;
    orderToUpdate.status = status;
    onUpdateStatus(orderToUpdate);
  };

  const onUpdateStatus = async (order: Order) => {
    try {
      const res = await UpdateOrder(order);
      console.log(res);
      if (res.error || res.status === 404) {
        handleClickAlertError();
      } else {
        handleClickAlert();
        props.onChangeOrder(order);
        // setDisable(true);
        setDisable(false);
      }
    } catch (e) {
      console.log('error in updating status');
      console.log(e);
      handleClickAlertError();
    }
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
    console.log('error');
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
    <Grid container className={classes.container}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Uspesno izmenjen status!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="warning">
          Nije moguce izmeniti status.
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Grid item xs={7} style={{ marginTop: '3%', float: 'left' }}>
          <label>Sifra porudzbine: </label>
          <label className={classes.label}>{props.order.id}</label>
        </Grid>
        <Grid item xs={4} style={{ overflow: 'hidden', maxWidth: '100%' }}>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => {
                  disable ? setDisable(false) : setDisable(true);
                }}
                name="checkedB"
                color="primary"
              />
            }
            label="Izmeni"
            className={classes.switch}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '2%',
        }}
      >
        <Grid item xs={5} className={classes.gridItem}>
          <label>Korisnik: </label>
          <label className={classes.label}>{props.order.user.email}</label>
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextField
            id="outlined-select-status"
            select
            disabled={disable}
            value={availableStatus[determineStatus(props.order?.status!)]}
            onChange={(e) => {
              console.log(status);
              console.log(e.target.value);
              handleUpdate(e.target.value);
            }}
            variant="outlined"
            style={{ width: '15vw' }}
          >
            {availableStatus.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <Button
            size="small"
            className={classes.btnMore}
            onClick={() => handleOpenDetails(props.order.id)}
            disabled={disable}
          >
            Detaljnije
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openDetails} className={classes.dialog}>
        <DialogActions>
          <label
            style={{ marginRight: '20%', fontWeight: 'bold', color: '#222431' }}
          >
            Detalji porudzbenice
          </label>
          <Button
            variant="outlined"
            onClick={() => setOpenDetails(false)}
            id="buttonIcon"
            color="primary"
            autoFocus
          >
            Zatvori
          </Button>
        </DialogActions>
        <DialogContent>
          <label style={{ fontWeight: 'bold', color: '#222431' }}>
            Datum kreiranja porudzbine:{' '}
          </label>
          <label>{moment(order?.dateOfMaking).format('DD-MM-YYYY')}</label>
          <br />
          <label style={{ fontWeight: 'bold', color: '#222431' }}>
            Zakazan datum isporuke:{' '}
          </label>
          <label>{moment(order?.deadine).format('DD-MM-YYYY')}</label>
        </DialogContent>
        <TableContainer className={classes.table}>
          <Table size="medium">
            <TableHead className={classes.thead} key="theadkey">
              <TableRow>
                <TableCell style={{ color: 'white' }}>
                  Naziv proizvoda
                </TableCell>
                <TableCell style={{ color: 'white' }}>Jedinicna cena</TableCell>
                <TableCell style={{ color: 'white' }}>Kolicina</TableCell>
                <TableCell style={{ color: 'white' }}>Iznos stavke</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tbody}>
              {props.order?.orderItems.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    className={classes.trow}
                    style={{ color: 'white' }}
                  >
                    <TableCell>{row.product.name}</TableCell>
                    <TableCell>{row.product.price}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.orderItemPrice}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogContent>
          <label style={{ fontWeight: 'bold', color: '#222431' }}>
            Ukupan iznos:{' '}
          </label>
          <label>{props.order?.sumPrice} din</label>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
