import React from 'react'
import AppRoute from './approute'
import { PrivateRoute } from './privateRoute'
import { Router, Switch } from 'react-router-dom'
import defaultLayout from '../hoc/layout/defaultLayout/defaultLayout'
import PageNotFound from '../pages/404/pageNotFound'
import notFoundLayout from '../hoc/layout/notFoundLayout'
import HomePage from '../pages/homePage/HomePage'
import registerLayout from '../hoc/layout/registerLayout/registerLayout'
import profileLayout from '../hoc/layout/profileLayout/profileLayout'
import RegisterAsCompany from '../pages/registration/registerAsCompany/registerAsCompany'
import AdminLoginForm from '../pages/adminLogin/adminLoginForm'
import AdminDashboard from '../pages/adminDashboard/adminDashboard'
import history from './history'
import ProfilePage from '../pages/profilePage/ProfilePage'

export default function Routes({ token, userType }) {
  const pathTo =
    userType === 'admin'
      ? '/admin/dashboard'
      : userType === 'company'
      ? '/company'
      : userType === 'user'
      ? '/profile/user'
      : ''

  return (
    <>
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            layout={defaultLayout}
            component={HomePage}
          />
          <AppRoute
            path="/register/company"
            layout={registerLayout}
            component={RegisterAsCompany}
          />
          <PrivateRoute
            path="/admin/dashboard"
            pathTo={pathTo}
            component={AdminDashboard}
            authenticated={token && userType === 'admin'}
          />
         
          <PrivateRoute
            path="/profile/user"
            pathTo={pathTo}
            component={'hj'}
            authenticated={token && userType === 'user'}
          />
          <PrivateRoute
            path="/company/active_orders"
            pathTo={pathTo}
            component={ProfilePage}
            authenticated={token && userType === 'company'}
          />
          <PrivateRoute
            path="/company/pending_orders"
            pathTo={pathTo}
            component={ProfilePage}
            authenticated={token && userType === 'company'}
          />
          <PrivateRoute
            path="/company/completed_orders"
            pathTo={pathTo}
            component={ProfilePage}
            authenticated={token && userType === 'company'}
          />
           <PrivateRoute
            path="/company"
            pathTo={pathTo}
            component={ProfilePage}
            authenticated={token && userType === 'company'}
          />
          <AppRoute
            path="/admin"
            layout={registerLayout}
            component={AdminLoginForm}
          />
          <AppRoute path="*" layout={notFoundLayout} component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}
