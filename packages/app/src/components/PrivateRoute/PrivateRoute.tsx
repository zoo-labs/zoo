import { ElementType } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'

type PrivateRouteProps = {
  component: ElementType
  path: string
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const signedIn = window.localStorage.getItem('connectorId')

  return <Route path={path} render={(props) => (signedIn ? <Component {...props} /> : <Redirect to='/login' />)} />
}

export { PrivateRoute }
