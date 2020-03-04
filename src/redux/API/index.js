import axios from 'axios'
import EndpointFactory from 'axios-endpoints'
const axiosInstance = axios.create({
  baseURL: 'https://thawing-ravine-80499.herokuapp.com/',
  responseType: 'json',
})
const Endpoint = EndpointFactory(axiosInstance)
export default {
  users: new Endpoint('users'),
  companies: new Endpoint('companies'),
  login: new Endpoint('login'),
  createOrder: new Endpoint('create-order'),
  getUserById: id => new Endpoint('users/' + id),
  getCompanyById: id => new Endpoint(`companies/${id}`),
  deleteUpdateUser: id => new Endpoint('users/' + id),
  deleteUpdateCompany: id => new Endpoint('companies/' + id),
}
