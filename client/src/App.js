import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createStore, combineReducers} from 'redux';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import store from "./store";
import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import ResetPassword from "views/examples/resetPassword";
import EditProfile from "views/examples/EditProfile.js";
import { BrowserRouter as BrowserRouter, Route, Switch,Redirect,Router } from "react-router-dom";
import { Provider } from "react-redux";
import { userLoaded } from "./actions/auths/userLoaded";
import setAuthenticationToken from "./middleware/setAuthenticationToken";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";



if (localStorage.getItem("token")) {
  setAuthenticationToken(localStorage.getItem("token"));
}
const App = () => {
  useEffect(() => {
    store.dispatch(userLoaded());
  }, []);

  return (

    <BrowserRouter>
    <Provider store={store}>

          <Switch>
          <Route path="/" exact render={props => <Index {...props} />} />

          <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />

     <Route path="/register-page" exact component={Register} />

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
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/back" to="/admin/index" />
              <Redirect to="/" />

</Switch>
</Provider>

</BrowserRouter>
  );
}

export default App;
