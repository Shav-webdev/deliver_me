import React from 'react'
import AppRoute from './approute'
import { Router, Switch } from 'react-router-dom'
import defaultLayout from '../hoc/layout/defaultLayout/defaultLayout'
import PageNotFound from '../pages/404/pageNotFound'
import notFoundLayout from '../hoc/layout/notFoundLayout'
import HomePage from '../pages/homePage/HomePage'
import registerLayout from '../hoc/layout/registerLayout/registerLayout'
import profileLayout from '../hoc/layout/profileLayout/profileLayout'
import adminDashboardLayout from '../hoc/layout/adminDashboardLayout/adminDashboardLayout'
import RegisterAsCompany from '../pages/registration/registerAsCompany/registerAsCompany'
import RegisterAsCourier from '../pages/registration/registerAsCourier'
import AdminLoginForm from '../pages/adminLogin/adminLoginForm'
import AdminDashboard from '../pages/adminDashboard/adminDashboard'
import history from './history'
import ProfilePage from '../pages/profilePage/ProfilePage'

export default function Routes() {
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
          <AppRoute
            path="/admin/dashboard"
            layout={adminDashboardLayout}
            component={AdminDashboard}
          />
          <AppRoute
            path="/profile/company"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />

          <AppRoute
            path="/profile/company/orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />
          <AppRoute
            path="/profile/company/active_orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />
          <AppRoute
            path="/profile/company/completed_orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />
          <AppRoute
            path="/profile/user"
            layout={profileLayout}
            component={ProfilePage}
            profile="user"
          />
          <AppRoute
            path="/admin"
            layout={registerLayout}
            component={AdminLoginForm}
          />
          <AppRoute
            path="/register/courier"
            layout={registerLayout}
            component={RegisterAsCourier}
          />
          <AppRoute path="*" layout={notFoundLayout} component={PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}
