import axios from 'axios'
import EndpointFactory from 'axios-endpoints'
import Storage from '../../services/localStorage/localStorage'

const axiosInstance = axios.create({
  baseURL: 'https://thawing-ravine-80499.herokuapp.com/',
  responseType: 'json',
})

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = Storage.get('deliver')
    ? Storage.get('deliver').token
    : null
  return config
})

const Endpoint = EndpointFactory(axiosInstance)

export default {
  users: new Endpoint('users'),
  companies: new Endpoint('companies'),
  deleteUpdateUser: id => new Endpoint('users/' + id),
  deleteUpdateCompany: id => new Endpoint('companies/' + id),
  login: new Endpoint('login'),
  loginAdmin: new Endpoint('admin'),
  createOrder: new Endpoint('orders'),
  getUserById: id => new Endpoint('users/' + id),
  getCompanyById: id => new Endpoint(`companies/${id}`),
  getAllActiveOrders: new Endpoint('active-orders'),
  getUserOrders: id => new Endpoint(`user-orders/${id}`),
  // getCompanyOrders: (id, type) =>
  //   new Endpoint(({ params: { type } }) => `company-orders/${id}`),

  getCompanyOrders: id => new Endpoint(`company-orders/${id}`),

  deleteUpdateOrder: id => new Endpoint(`orders/${id}`),
}
