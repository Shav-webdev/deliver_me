export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(String(password))
}

export function validateAdminPassword(password) {
  const re = /^[0-9a-zA-Z]{8,32}$/
  return re.test(String(password))
}

export function validatePoint(point) {
  const re = /^[1-9]\d*(\d+)?$/
  return re.test(String(point))
}

export function validateName(name) {
  return name.length >= 2 && name.length < 32
}

export function validateAddress(address) {
  return address.length >= 2 && address.length < 32
}

export function validateComment(comment) {
  return comment.length >= 0 && comment.length < 256
}

export function validateOrderComment(comment) {
  return comment.length < 256
}

export function validatePhoneNumber(number) {
  const re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
  return re.test(String(number))
}

export function validateTaxNumber(number) {
  const re = /^[0-9]{8}$/
  return re.test(String(number))
}

export function validateActivity(activity) {
  return activity.length >= 2 && activity.length < 32
}
