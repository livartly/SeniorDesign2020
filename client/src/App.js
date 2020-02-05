import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/navbar/navbar';
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Resources from './components/resources/resources.js';
import Calculator from './components/calculator.js';
import Calculator2 from './components/calculator2.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/resources" component={Resources} />
            <Route path="/about" component={About} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/calculator2" component={Calculator2} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
