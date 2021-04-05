import React from 'react'
import {useSelector} from 'react-redux'
import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import ResetPassword from "views/examples/resetPassword";
import EditProfile from "views/examples/EditProfile.js";
import NotFound from './utils/NotFound/NotFound'
import {Switch, Route,Redirect} from 'react-router-dom'

function RouteBody  ()  {
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth
  return (
  <section>
<Switch>
<Route path="/" exact render={props => <Index {...props} />} />


<Route path="/login-page" exact component={Login} />
<Route
  path="/profile-page"
  exact
  render={props => <Profile {...props} />}
/>

<Route path="/register-page" component={isLogged ? NotFound : Register} exact />

<Route
  path="/Edit-profile"
  exact
  render={props => <EditProfile {...props} />}
/>

<Route
  path="/reset-password"
  exact
  render={props => <ResetPassword {...props} />}
/>


</Switch>

  </section>
  )
}

export default RouteBody
