import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Manufacturer } from '../../models/Manufacturer';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';
import { ProductType } from '../../models/ProductType';
import { User } from '../../models/User';
import {
  GetAllManufacturers,
  GetAllOrders,
  GetAllProductType,
} from '../../service/api';
import AuxiliaryElements from './AuxiliaryElements';
import ManageOrders from './ManageOrders';
import ManageProducts from './ManageProducts';
import NavigationAdmin from './NavigationAdmin';
import ViewProducts from './ViewProducts';

interface Props {
  user: User;
}
export default function MainAdmin(props: Props) {
  const [productType, setProductType] = useState<ProductType[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const getData = async () => {
    const types = await GetAllProductType();
    const manufacturers = await GetAllManufacturers();
    const orders = await GetAllOrders();
    setProductType(types);
    setManufacturers(manufacturers);
    setOrders(orders);
  };

  useEffect(() => {
    getData();
  }, [props.user]);

  const addManufacturer = (manufacturer: Manufacturer) => {
    let man: any = [...manufacturers];
    man.push(manufacturer);
    setManufacturers(man);
  };

  return (
    <>
      <BrowserRouter>
        <NavigationAdmin isThereToEdit={productToEdit ? true : false} />
        <Switch>
          <Redirect exact from="/profil" to="/proizvod" />
          <Route
            exact
            path="/proizvod"
            component={() => (
              <ManageProducts
                productTypes={productType}
                manufacturers={manufacturers}
                productToEdit={productToEdit}
                onCancel={() => setProductToEdit(null)}
              />
            )}
          />
          <Route
            exact
            path="/pregled"
            component={() => <ViewProducts onEditProduct={setProductToEdit} />}
          />
          <Route
            exact
            path="/pomocno"
            component={() => (
              <AuxiliaryElements
                manufacturers={manufacturers}
                productTypes={productType}
                onAddManufacturer={addManufacturer}
              />
            )}
          />
          <Route
            exact
            path="/porudzbine"
            component={() => <ManageOrders orders={orders} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}
