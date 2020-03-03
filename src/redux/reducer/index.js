import { combineReducers } from 'redux'
import usersReducer from './users.reducers'
import companiesReducer from './companies.reducers'
import signInAsUser from './signInAsUser.reducers'
import signInAsCompany from './signInAsCompany.reducers'

export default combineReducers({
  users: usersReducer,
  companies: companiesReducer,
  signInAsUser,
  signInAsCompany,
})
