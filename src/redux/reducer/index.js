import { combineReducers } from 'redux'
import usersReducer from './users.reducers'
import companiesReducer from './companies.reducers'
import ordersReducer from './orders.reducers'

export default combineReducers({
  users: usersReducer,
  companies: companiesReducer,
  orders:ordersReducer
})
