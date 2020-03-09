import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export const PrivateRoute = ({
  component: Component,
  userType,
  authenticated,
  ...rest
}) => {
  const pathTo =
    userType === 'admin'
      ? '/admin/dashboard'
      : userType === 'company'
      ? '/company'
      : userType === 'user'
      ? 'profile/user'
      : ''
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: `${pathTo}`, state: { from: props.location } }} />
        )
      }
    />
  )
}
