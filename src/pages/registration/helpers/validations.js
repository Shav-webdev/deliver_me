export function validateEmail(email) {
  console.log(email);
  // eslint-disable-next-line no-useless-escape
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(String(email).toLowerCase()));
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  console.log(password);
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  console.log(re.test(String(password)));
  return re.test(String(password));
}

export function validateName(name) {
  console.log(name);
  let re = /^[a-zA-Z]{2,16}$/;
  console.log();
  return re.test(String(name));
}

export function validateAddress(address) {
  console.log(address);
  let re = /[a-zA-z0-9]+\s[a-zA-z0-9]\d+/g;
  console.log();
  return re.test(String(address));
}

export function validatePhoneNumber(number) {
  console.log(number);
  let re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
  console.log();
  return re.test(String(number));
}

export function validateTaxNumber(number) {
  console.log(number);
  let re = /^[0-9]{8}$/;
  console.log();
  return re.test(String(number));
}

export function validateActivity(activity) {
  console.log(activity);
  let re = /^[a-zA-Z0-9]{2,16}$/;
  console.log();
  return re.test(String(activity));
}
