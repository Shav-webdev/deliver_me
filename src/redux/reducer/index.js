import { combineReducers } from 'redux'
import usersReducer from './users.reducers'
import companiesReducer from './companies.reducers'

export default combineReducers({
  users: usersReducer,
  companies: companiesReducer,
})
