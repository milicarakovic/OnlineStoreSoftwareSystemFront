import {
  Button, Card,


  CardActions, CardContent,



  Grid, Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { User } from '../../models/User';
import { GetAllOrders } from '../../service/api';
import { useStylesMyOrdersStyle } from '../../syle/MyOrdersStyle';
import AboutOrder from './AboutOrder';

interface Props {
  user: User;
  orders: Order[];
}

export default function MyOrders(props: Props) {
  const classes = useStylesMyOrdersStyle();
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [orderAbout, setOrderAbout] = useState<Order | null>(null);

  const [ordersToShow, setOrdersToShow] = useState<Order[]>([]);

  useEffect(() => {
    getOrders();
  }, [props.orders]);

  const getOrders = async () => {
    const o = await GetAllOrders();
    let filteredOrders = o.filter((x) => x.user.id === props.user.id);
    setOrders(filteredOrders);
    setOrdersToShow(filteredOrders.slice(0, 4));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenOrder = (id: number) => {
    let order = orders.find((o) => o.id === id);
    setOrderAbout(order!);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setOrdersToShow(orders.slice((value - 1) * 4, value * 4));
  };


  return (
    <Grid container className={classes.gridContainer}>
      {orders.length !== 0 ? (
        ordersToShow.map((element) => {
          return (
            <Grid item xs={5} key={element.id} className={classes.gridItem}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Datum kreiranja porudzbine: </label>
                    <label>
                      {moment(element.dateOfMaking).format('DD-MM-YYYY')}
                    </label>
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Status porudzbine:{' '}
                    <label
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {element.status}
                    </label>
                  </Typography>
                  <Typography variant="body2" component="p">
                    <label>Iznos: </label>
                    <label>{element.sumPrice}</label>
                    <label> din</label>
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <label>Datum prispeca: </label>
                    <label>
                      {moment(element.deadine).format('DD-MM-YYYY')}
                    </label>
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    className={classes.btnMore}
                    onClick={() => {
                      handleOpenOrder(Number(element.id));
                      handleClickOpen();
                    }}
                  >
                    Detaljnije
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      ) : (
        <label className={classes.labelNoOrder}>
          Nema kreiranih porudzbina...
        </label>
      )}
      <AboutOrder
        onClose={handleClose}
        open={open}
        order={orderAbout ? orderAbout : null}
      />
      <Grid container style={{ margin: 'auto' }}>
        <Grid item style={{ margin: 'auto' }}>
          <Pagination
            count={Math.floor(orders.length / 4)}
            color="primary"
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
