/* eslint-disable */
export function validMail(mail: string | null) {
  if (mail === null) return false;
  let x = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
  return x;
}

export function validName(name: string | null) {
  if (name === null) return false;
  let x = /[a-zA-Z]{2,}/.test(name);
  return x;
}
export function validSurname(suranme: string | null) {
  if (suranme === null) return false;
  let x = /[a-zA-Z]{2,}/.test(suranme);
  return x;
}

export function validPhone(phone: string | null) {
  if (phone === null) return false;
  let x = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phone);
  return x;
}

export function validUsername(username: string | null) {
  if (username === null) return false;
  let x = /^[a-z0-9_-]{3,16}$/.test(username);
  return x;
}

export function validPassword(
  password1: string | null,
  password2: string | null
) {
  if (password1 === '' || password1 === null || password2 === null)
    return false;
  if (password1 !== password2) return false;
  return true;
}
