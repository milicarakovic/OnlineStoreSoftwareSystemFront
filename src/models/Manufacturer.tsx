export class Manufacturer {
  id: number;
  name: string;
  phone: string;
  email: string;
  adress: string;

  constructor(
    id: number,
    name: string,
    phone: string,
    email: string,
    adress: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.adress = adress;
  }
}
