import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export const PrivateRoute = ({
  component: Component,
  pathTo,
  authenticated,
  ...rest
}) => {
 
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
