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
import FooterPage from './components/footer/FooterContainer';
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Resources from './components/resources/resources.js';
import Calculator2 from './components/calculator2.js';
import TreeProof from './components/problem-solvers/TreeProof/TreeProof.js';
import Catalog from './components/privileged/catalog';
import Feedback from './components/feedback/FeedbackContainer';
import sortSolver from './components/problem-solvers/sortSolver.js';
import SetOpsPage from './components/problem-solvers/Sets/setOpsPage.js';
import PertChartSolver from './components/problem-solvers/PertChartSolver';
import MastersTheoremSolver from './components/problem-solvers/MastersTheoremSolver';
import MagnitudeOrderSolver from './components/problem-solvers/MagnitudeOrderSolver';
import EquivalenceRelationFinder from './components/problem-solvers/equivalance-relation-finder/EquivalenceRelationFinderContainer';
import MultiplicityClosureFinder from "./components/problem-solvers/multiplicity-closure-finder/MultiplicityClosureContainer.js";
import HasseDiagramBuilder from './components/problem-solvers/hasse-diagram-builder/HasseDiagramBuilderContainer';
import PertChart from './components/problem-solvers/pert-chart/PertChart';
import TruthTableBuilder from './components/problem-solvers/truth-table-builder/TruthTableBuilderContainer';
import RecursiveSequenceBuilder from './components/problem-solvers/recursive-sequence-builder/RecursiveSequenceBuilderContainer';
import BooleanMatrices from './components/problem-solvers/BooleanMatrices/BooleanMatrices.js';
import CycleSolverPage from './components/problem-solvers/cycle-solver/CycleSolverPage.js';

//import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

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
              <PrivateRoute path="/truth-table-builder" component={TruthTableBuilder} />
              <PrivateRoute path="/calculator2" component={Calculator2} />
              <PrivateRoute path="/propositional-logic" component={TreeProof} />
              <PrivateRoute path="/secret-hidden-view" component={Catalog} />
              <PrivateRoute path="/feedback" component={Feedback} />
              <PrivateRoute path="/topological-sort" component={sortSolver} />
              <PrivateRoute path="/set-ops" component={SetOpsPage} />
              <PrivateRoute path="/pert-chart" component={PertChartSolver} />
              <PrivateRoute path="/Master-Theorem" component={MastersTheoremSolver} />
              <PrivateRoute path="/MagnitudeOrder" component={MagnitudeOrderSolver} />
              <PrivateRoute path="/equivalence-relation-finder" component={EquivalenceRelationFinder} />
              <PrivateRoute path="/multiplicity-closure-finder" component={MultiplicityClosureFinder} />
              <PrivateRoute path="/hasse-diagram-builder" component={HasseDiagramBuilder} />
              <PrivateRoute path="/recursive-sequence-builder" component={RecursiveSequenceBuilder} />
              <PrivateRoute path="/BooleanMatrices" component={BooleanMatrices} />
              <PrivateRoute path="/cycle-solver" component={CycleSolverPage} />
            </Switch>
            <FooterPage />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
