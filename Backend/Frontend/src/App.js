import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "utils/setAuthToken";

import { setCurrentUser, logoutUser } from "actions/authActions";
import { Provider } from "react-redux";
import store from "store";
import 'react-notifications/lib/notifications.css';
import Navbar from "components/Navbars/AuthNavbar";
import PrivateRoute from "private-route/PrivateRoute";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import "./App.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/auth";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
              <Switch>
     
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />

                <Redirect from="*" to="/auth" />
                <PrivateRoute exact path="/auth" render={(props) => <AdminLayout {...props} />} />
              </Switch>
            
          </div>
          <NotificationContainer/>
        </Router>
      </Provider>
    );
  }
}
export default App;
