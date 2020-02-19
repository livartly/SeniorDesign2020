import React, { Component } from 'react';

// React router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Authentication dependencies
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// Redux
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

// Components
import PrivateRoute from './components/private-route/PrivateRoute';
import Register from './components/auth/RegisterContainer';
import Login from './components/auth/LoginContainer';
import Navbar from './components/navbar/NavbarContainer';
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Resources from './components/resources/resources.js';
import Calculator from './components/calculator.js';
import Calculator2 from './components/calculator2.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decodedUser = jwtDecode(token);
  store.dispatch(setCurrentUser(decodedUser));

  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/resources" component={Resources} />
              <PrivateRoute path="/about" component={About} />
              <PrivateRoute path="/calculator" component={Calculator} />
              <PrivateRoute path="/calculator2" component={Calculator2} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
