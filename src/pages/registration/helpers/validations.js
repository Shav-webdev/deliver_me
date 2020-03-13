export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(String(password))
}

export function validatePoint(point) {
  const re = /^[1-9]\d*(\d+)?$/
  return re.test(String(point))
}

export function validateName(name) {
  return name.length >= 1 && name.length <= 64 
}
export function validateLastName(lastName){
  return lastName.length>=1 && lastName.length <= 64 
}
export function validateAddress(address) {
  return address.length >= 1 && address.length <= 64 
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
  return activity.length >= 1  && activity.length <= 64
}
