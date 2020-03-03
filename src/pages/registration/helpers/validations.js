export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(String(password))
}

export function validateAdminPassword(password) {
  let re = /^[0-9a-zA-Z]{8,32}$/
  return re.test(String(password))
}

export function validateName(name) {
  let re = /^[a-zA-Z]{2,16}$/
  return re.test(String(name))
}

export function validateAddress(address) {
  let re = /^[a-zA-z0-9]+\s\d+/g
  return re.test(String(address))
}

export function validatePhoneNumber(number) {
  let re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
  return re.test(String(number))
}

export function validateTaxNumber(number) {
  let re = /^[0-9]{8}$/
  return re.test(String(number))
}

export function validateActivity(activity) {
  let re = /^[a-zA-Z0-9]{2,16}$/
  return re.test(String(activity))
}
