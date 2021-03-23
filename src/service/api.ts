import { User } from '../models/User';
import { ProductType } from '../models/ProductType';
import { Manufacturer } from '../models/Manufacturer';
import { RequestUser } from '../models/RequestUser';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

export const baseUrl = 'http://localhost:61860/api';

export async function GetUser(id: number): Promise<User[]> {
  const res = await fetch(baseUrl + `/user/${id}`);
  var user = await res.json();
  return user;
}

export async function UpdateUser(user: User) {
  const res = await fetch(baseUrl + `/user/${user?.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await res.json();
}

export async function AddUser(user: User) {
  const res = await fetch(baseUrl + `/user`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export async function AddProduct(product: Product) {
  const res = await fetch(baseUrl + `/product`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
export async function UpdateProduct(product: Product) {
  const res = await fetch(baseUrl + `/product/${product?.id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await res.json();
}

export async function GetAllProduct(): Promise<Product[]> {
  const res = await fetch(baseUrl + '/product');
  var products = await res.json();
  return products;
}

export async function DeleteProduct(id: number) {
  const res = await fetch(baseUrl + `/product/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
}

export async function GetAllProductType(): Promise<ProductType[]> {
  const res = await fetch(baseUrl + '/producttype');
  var productTpe = await res.json();
  return productTpe;
}
export async function GetAllManufacturers(): Promise<Manufacturer[]> {
  const res = await fetch(baseUrl + '/manufacturer');
  var man = await res.json();
  return man;
}

export async function LogIn(user: RequestUser) {
  const res = await fetch(baseUrl + `/user/authenticate`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return await res;
}

export async function AddOrder(order: Order) {
  const res = await fetch(baseUrl + `/order`, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export async function GetAllOrders(): Promise<Order[]> {
  const res = await fetch(baseUrl + `/order`);
  var user = await res.json();
  return user;
}

export async function AddManufacturer(manufacturer: Manufacturer) {
  console.log('api');
  console.log(manufacturer);
  const res = await fetch(baseUrl + `/manufacturer`, {
    method: 'POST',
    body: JSON.stringify(manufacturer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export async function AddProductType(type: ProductType) {
  const res = await fetch(baseUrl + `/productType`, {
    method: 'POST',
    body: JSON.stringify(type),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}
export async function UpdateOrder(order: Order) {
  const res = await fetch(baseUrl + `/order/${order?.id}`, {
    method: 'PUT',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await res.json();
}
