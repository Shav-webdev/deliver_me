import { combineReducers } from 'redux'
import usersReducer from './users.reducers'
import companiesReducer from './companies.reducers'
import ordersReducer from './orders.reducers'
import currentUserReducer from './currentUser.reducers'

export default combineReducers({
  users: usersReducer,
  companies: companiesReducer,
  orders: ordersReducer,
  currentUser: currentUserReducer,
})