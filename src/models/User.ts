export class User {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  image: string;

  constructor(
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.image = image;
  }
}
