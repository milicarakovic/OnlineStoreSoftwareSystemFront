import {
  FormControl,

  FormControlLabel, Paper,




  Radio, RadioGroup
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { Order } from '../../models/Order';
import { useStylesOrders } from '../../syle/ManageOrdersStyles';
import AboutOrder from './AboutOrder';
interface Props {
  orders: Order[];
}

export default function ManageOrders(props: Props) {
  const classes = useStylesOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [value, setValue] = React.useState('datum');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (value === 'datum') {
      setOrders(
        props.orders.sort((a, b) => (a.dateOfMaking < b.dateOfMaking ? 1 : -1))
      );
    }
    if (value === 'status') {
      var result1 = [],
        result2 = [];
      for (var i = 0; i < props.orders.length; i++) {
        if (props.orders[i].status === 'Obrada') result1.push(props.orders[i]);
        else result2.push(props.orders[i]);
      }
      setOrders(result1.concat(result2));
    }
    if (value === 'obrada') {
      let result: Order[] = [];
      props.orders.forEach((element) => {
        if (element.status === 'Obrada') result.push(element);
      });
      console.log(result);
      setOrders(result);
    }
    if (value === 'prihvaceno') {
      let result: Order[] = [];
      props.orders.forEach((element) => {
        if (element.status === 'Prihvaceno') result.push(element);
      });
      console.log(result);
      setOrders(result);
    }
    if (value === 'odbijeno') {
      let result: Order[] = [];
      props.orders.forEach((element) => {
        if (element.status === 'Odbijeno') result.push(element);
      });
      console.log(result);
      setOrders(result);
    }
    if (value === 'isporuceno') {
      let result: Order[] = [];
      props.orders.forEach((element) => {
        if (element.status === 'Isporuceno') result.push(element);
      });
      console.log(result);
      setOrders(result);
    }
  }, [props.orders, value]);

  const handleChangeOrder = (order: Order) => {
    let orders2: Order[] = [...orders];
    let index = orders2.findIndex((x) => x.id === order.id);
    orders2[index].status = order.status;
    setOrders(orders2);
  };

  return (
    <Grid component={Paper}>
      <Grid item xs={12} style={{ marginTop: '1%' }}>
        <label className={classes.mainLabel}>Prikaz porudzbina</label>
      </Grid>
      <Grid item xs={12} className={classes.radioButtonContainer}>
        <FormControl component="fieldset">
          <RadioGroup onChange={handleChange} row>
            <FormControlLabel
              value="datum"
              control={<Radio style={{ color: '#676d92' }} />}
              label="Sortiraj prema datumu kreiranja"
              checked={value === 'datum'}
            />
            <FormControlLabel
              value="obrada"
              control={<Radio style={{ color: '#676d92' }} />}
              label="U obradi"
              checked={value === 'obrada'}
            />
            <FormControlLabel
              value="prihvaceno"
              control={<Radio style={{ color: '#676d92' }} />}
              label="Prihvacene"
              checked={value === 'prihvaceno'}
            />
            <FormControlLabel
              value="isporuceno"
              control={<Radio style={{ color: '#676d92' }} />}
              label="Isporucene"
              checked={value === 'isporuceno'}
            />
            <FormControlLabel
              value="odbijeno"
              control={<Radio style={{ color: '#676d92' }} />}
              label="Odbijene"
              checked={value === 'odbijeno'}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container>
        {orders.map((element) => {
          return (
            <AboutOrder order={element} onChangeOrder={handleChangeOrder} />
          );
        })}
      </Grid>
    </Grid>
  );
}
