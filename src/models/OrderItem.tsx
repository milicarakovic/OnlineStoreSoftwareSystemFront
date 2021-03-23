import { Product } from './Product';

export class OrderItem {
  id: number;
  quantity: number;
  orderItemPrice: number;
  product: Product;

  constructor(
    id: number,
    quantity: number,
    orderItemPrice: number,
    product: Product
  ) {
    this.id = id;
    this.quantity = quantity;
    this.orderItemPrice = orderItemPrice;
    this.product = product;
  }
}
