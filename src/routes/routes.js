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
import adminDashboardLayout from '../hoc/layout/adminDashboardLayout/adminDashboardLayout'
import RegisterAsCompany from '../pages/registration/registerAsCompany/registerAsCompany'
import RegisterAsCourier from '../pages/registration/registerAsCourier'
import AdminLoginForm from '../pages/adminLogin/adminLoginForm'
import AdminDashboard from '../pages/adminDashboard/adminDashboard'
import history from './history'
import ProfilePage from '../pages/profilePage/ProfilePage'

import { getCookie } from '../pages/registration/services/cookiesUtils'



export default function Routes({currentUser,token,userType}) {
  const pathTo =
  userType === 'admin'
    ? '/admin/dashboard'
    : userType === 'company'
    ? '/company'
    : userType === 'user'
    ? '/profile/user'
    : ''
    console.log(pathTo)
  console.log(currentUser.token)
  console.log(currentUser.userType)
  console.log(token,userType)
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
            authenticated={token!==''?token && userType==='admin':currentUser.token && currentUser.userType==='admin'}
          />
          
          <PrivateRoute
            path="/company"
            pathTo={pathTo}
            component={ProfilePage}
            authenticated={token!==''?token && userType==='company':currentUser.token && currentUser.userType==='company'}//currentUser.token && currentUser.userType === 'company'}
          />
          
          <PrivateRoute
            path="/profile/user"
            pathTo={pathTo}
            component={'hj'}
            authenticated={token!==''?token && userType==='user':currentUser.token && currentUser.userType==='user'}//}//token && userType === 'user'}
          />
          
          {/* <AppRoute
            path="/profile/user"
            layout={profileLayout}
            component={ProfilePage}
            profile="user"
          /> */}
          {/* <AppRoute
            path="/profile/company"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          /> */}
          <AppRoute
            path="/company/active_orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />
          <AppRoute
            path="/company/pending_orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
          />
          <AppRoute
            path="/company/completed_orders"
            layout={profileLayout}
            component={ProfilePage}
            profile="company"
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
