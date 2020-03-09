export const setCookie = (name, value) => {
  Cookies.set(name, value, { path: '' })
}

export const getCookie = async name => {
  await Cookies.getJSON(name)
}

export const removeCookie = name => {
  Cookies.remove(name, { path: '' })
}
