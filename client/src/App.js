import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Pending from './components/Tickets/pending';
import Previuos from './components/Tickets/previous';
import Winning from './components/Tickets/winning';
import Qr_scan from './components/QR scan/Prizes';
import Claimed from './components/Account/claimed';
import Credited from './components/Account/Credited';
import Dashboard from './components/dashboard/Dashboard';
import id_proof from './components/file_upload/id_proof';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/private-route/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
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
    window.location.href = './login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <div className='App'>
              <Navbar />
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/pending_tickets'
                  component={Pending}
                />
                <PrivateRoute
                  exact
                  path='/winning_tickets'
                  component={Winning}
                />
                <PrivateRoute
                  exact
                  path='/previous_tickets'
                  component={Previuos}
                />
                <PrivateRoute exact path='/claimed_money' component={Claimed} />
                <PrivateRoute
                  exact
                  path='/credited_money'
                  component={Credited}
                />
                <PrivateRoute exact path='/qr_scan' component={Qr_scan} />
                <PrivateRoute
                  exact
                  path='/id_proof_upload'
                  component={id_proof}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}
export default App;
