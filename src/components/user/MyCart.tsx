import DateFnsUtils from '@date-io/date-fns';
import {
  Button,


  Dialog,


  DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { OrderItem } from '../../models/OrderItem';
import { User } from '../../models/User';
import { AddOrder } from '../../service/api';
import { useStylesMyCart } from '../../syle/MyCartStyle';
import Alerts from '../Alerts';

interface Props {
  user: User;
  items: OrderItem[];
  onCancelOrder: (cancel: boolean) => any;
  onRemoveOrderItem: (productID: number) => any;
  onCreatedOrder: (order: Order) => any;
  onChangeOrderItem: (productID: number, quantity: number) => any;
}

export default function MyCart(props: Props) {
  const classes = useStylesMyCart();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const minDate = new Date(new Date().getTime() + 86400000 * 7);

  const [selectedDate, setSelectedDate] = useState<Date>(minDate);
  const [sum, setSum] = useState<number>(0);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertError, setOpenAlertError] = useState<boolean>(false);
  const [serverAlert, setServerAlert] = useState<boolean>(false);

  const [editable, setEditable] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [productToEdit, setProductToEdit] = useState<number>(0);

  useEffect(() => {
    setOrderItems(props.items);
    calculateTotalPrice();
    console.log(orderItems);
    console.log(props.items);
  }, [props.items, props.onChangeOrderItem]);

  function calculateTotalPrice() {
    let sum = 0;
    props.items.forEach((element) => {
      sum = sum + element.orderItemPrice;
    });
    setSum(sum);
  }

  const generateKey = (pre: String) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const handleRemoveOrderItem = (id: number) => {
    props.onRemoveOrderItem(id);
  };

  const handleCancelOrder = () => {
    props.onCancelOrder(true);
  };

  const handleDateChange = (date: Date | null) => {
    if (date !== null) setSelectedDate(date);
  };

  const handleAddOrder = () => {
    let order: Order;
    if (
      selectedDate !== null ||
      sum !== 0 ||
      props.user !== null ||
      orderItems.length !== 0
    ) {
      let deadline: Date = new Date();

      deadline = new Date(
        Date.UTC(
          selectedDate!.getFullYear(),
          selectedDate!.getMonth(),
          selectedDate!.getDate()
        )
      );
      order = new Order(
        0,
        new Date(),
        deadline,
        sum,
        props.user,
        orderItems,
        'Obrada'
      );
      onAddOrder(order);
      // handleCancelOrder();
    }
  };

  const onAddOrder = (order: Order) => {
    handleClickAlert();
    setTimeout(() => {
      const res = AddOrder(order);
      handleClickAlert();
      props.onCreatedOrder(order);
      handleCancelOrder();
    }, 1000);
  };
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  return (
    <div className={classes.myCart}>
      {openAlert ? (
        <Alerts
          text="Uspesno kreirana porudzbina!"
          type="succsess"
          setText={() => setOpenAlert(false)}
          setType={() => setOpenAlert(false)}
        />
      ) : null}
      {openAlertError ? (
        <Alerts
          text="Nije moguce kreirati porudzbinu!"
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
      <Grid container className={classes.gridContainer}>
        <Grid item xs={5}>
          <label className={classes.label}>Datum porudzbine:</label>
          <label>{moment(new Date()).format('DD-MM-YYYY')}</label>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <label className={classes.label}>Zeljeni datum pristizanja:</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd-MM-yyyy"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ width: '200px' }}
              minDate={minDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <TableContainer className={classes.table}>
        <Table size="medium">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Naziv proizvoda</TableCell>
              <TableCell style={{ color: 'white' }}>Jedinicna cena</TableCell>
              <TableCell style={{ color: 'white' }}>Kolicina</TableCell>
              <TableCell style={{ color: 'white' }}>Iznos stavke</TableCell>
              <TableCell style={{ color: 'white' }}>
                Izmeni/Obrisi stavku
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {orderItems?.map((row) => {
              return (
                <TableRow
                  key={generateKey(String(row.id))}
                  className={classes.trow}
                  style={{ color: 'white' }}
                >
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.product.price}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.orderItemPrice}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<CreateIcon />}
                      onClick={() => {
                        setNewQuantity(row.quantity);
                        setEditable(true);
                        setProductToEdit(row.product.id);
                      }}
                    />
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveOrderItem(row.product.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={7}></Grid>
        <Grid item xs={2}>
          <label className={classes.label}>Ukupan iznos:</label>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            margin="dense"
            InputProps={{
              readOnly: true,
            }}
            value={sum}
            name="message"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={5} style={{ textAlign: 'left' }}>
          <Button className={classes.btnReject} onClick={handleCancelOrder}>
            Odustani
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5} style={{ textAlign: 'right' }}>
          <Button
            className={classes.btnConfirm}
            endIcon={<Icon>send</Icon>}
            onClick={handleAddOrder}
          >
            Potvrdi
          </Button>
        </Grid>
      </Grid>
      <Dialog open={editable}>
        <DialogTitle>Izmenite kolicinu...</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-number-quantity"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ maxWidth: '25%', marginLeft: '2%', marginRight: '5%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onChangeOrderItem(productToEdit, newQuantity);
              setEditable(false);
            }}
            color="primary"
          >
            Potvrdi
          </Button>
          <Button onClick={() => setEditable(false)} color="primary">
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
