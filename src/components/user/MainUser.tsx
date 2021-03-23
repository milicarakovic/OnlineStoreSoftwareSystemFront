import { Grid } from '@material-ui/core';
import React, { createContext, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Order } from '../../models/Order';
import { OrderItem } from '../../models/OrderItem';
import { User } from '../../models/User';
import { useStyles } from '../../syle/Style';
import Catalogue from './Catalogue';
import ContactAdmin from './ContactAdmin';
import MyCart from './MyCart';
import MyOrders from './MyOrders';
import Navigation from './Navigation';
import Profile from './Profile';

interface Props {
  user: User;
}
export const UserImageContext = createContext<string | null>(undefined!);
export default function MainUser(props: Props) {
  const classes = useStyles();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart = (item: OrderItem | null) => {
    if (item !== null) {
      let items2: OrderItem[] = [...items];
      items2.push(item);
      setItems(items2);
    }
  };

  const handleCancelOrder = (cancel: boolean) => {
    if (cancel) setItems([]);
  };

  const handleRemoveOrderItem = (productID: number) => {
    let orderToRemove: any = items.find((o) => o.product.id === productID);
    let items2: OrderItem[] = [...items];
    items2.splice(items2.indexOf(orderToRemove), 1);
    setItems(items2);
  };
  const handleChangeOrderItem = (productID: number, quantity: number) => {
    if (quantity && productID) {
      let items2: OrderItem[] = [...items];
      let index = items2.findIndex((x) => x.product.id === productID);
      items2[index].quantity = quantity;
      items2[index].orderItemPrice = quantity * items2[index].product.price;
      setItems(items2);
      console.log(items);
    }
  };

  const handleAddOrder = (order: Order) => {
    let orders2: any = [...orders];
    orders2.push(order);
    setOrders(orders2);
  };

  return (
    <>
      <BrowserRouter>
        <Grid item xs={2} className={classes.gridOne}>
          <Navigation user={props.user!} orders={items} />
        </Grid>
        <Grid item xs={12} className={classes.gridTwo}>
          <Switch>
            <Redirect exact from="/login" to="/profil" />
            <Route
              exact
              path="/profil"
              component={() => <Profile user={props.user} />}
            />
            <Route
              exact
              path="/katalog"
              component={() => <Catalogue onAddToCart={handleAddToCart} />}
            />
            <Route
              exact
              path="/mojakorpa"
              component={() => (
                <MyCart
                  user={props.user}
                  items={items}
                  onCancelOrder={handleCancelOrder}
                  onRemoveOrderItem={handleRemoveOrderItem}
                  onCreatedOrder={handleAddOrder}
                  onChangeOrderItem={handleChangeOrderItem}
                />
              )}
            />
            <Route
              exact
              path="/porudzbine"
              component={() => <MyOrders user={props.user} orders={orders} />}
            />
            <Route
              exact
              path="/kontakt"
              component={() => <ContactAdmin user={props.user} />}
            />
          </Switch>
        </Grid>
      </BrowserRouter>
    </>
  );
}
