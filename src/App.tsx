import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { useStyles } from './syle/Style';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import {
  GetAllProductType,
  GetAllManufacturers,
  GetAllProduct,
} from './service/api';
import { ProductType } from './models/ProductType';
import { Manufacturer } from './models/Manufacturer';
import { Product } from './models/Product';


export const ProductContext = createContext<Product[]>(undefined!);
export const ProductTypeContext = createContext<ProductType[]>(undefined!);
export const ManufacturerContext = createContext<Manufacturer[]>(undefined!);

function App() {
  const classes = useStyles();

  const [productType, setProductType] = useState<ProductType[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const getData = async () => {
    const types = await GetAllProductType();
    const manufacturers = await GetAllManufacturers();
    const products = await GetAllProduct();

    setProductType(types);
    setManufacturers(manufacturers);
    setProducts(products);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className={classes.container}>
      <BrowserRouter>
        <ProductContext.Provider value={products}>
          <ProductTypeContext.Provider value={productType}>
            <ManufacturerContext.Provider value={manufacturers}>
              <Switch>
                <Redirect exact from="/" to="login" />
                <Route exact path="/login" component={() => <Login />} />
                <Route
                  exact
                  path="/kreirajnalog"
                  component={() => <CreateAccount />}
                />
              </Switch>
            </ManufacturerContext.Provider>
          </ProductTypeContext.Provider>
        </ProductContext.Provider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
