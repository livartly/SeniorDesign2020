import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container main">
          <h5>Compute expert-level answers using Wolfram’s breakthrough algorithms and knowledgebase. Select a 
          topic to be redirected to its functional page.
          </h5>
            <div className="row">

                <div className="four columns">
                <div className="left">
                  <h5>Symbolic Representation</h5>
                  <Link to="/truth-table">
                  <button type="button" class="btn btn-success">Truth Tables</button>
                  </Link>
                  <p></p>
                  <Link to="/propositional-logic">
                  <button type="button" class="btn btn-success">Propositional  Logic</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-success">Recurrance Relations</button>
                  </Link>
                  <p></p>
                </div>
                </div>

                <div className="four columns">
                <div className="center">
                  <h5>Relations + Sorting</h5>
                  <Link to="/">
                  <button type="button" class="btn btn-info">Closures</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-info">Multiplicities</button>
                  </Link>
                  <p></p>
                  <Link to="/topological-sort">
                  <button type="button" class="btn btn-info">Topological Sort</button>
                  </Link>
                </div>
                </div>

                <div className="four columns">
                <div className="right">
                  <h5>Functions</h5>
                  <Link to="/">
                  <button type="button" class="btn btn-primary">Cycles</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-primary">Form Conversions</button>
                  </Link>
                  <p></p>
                </div>
                </div>
              </div>


          <div className="row">
              <div className="four columns">
              <div className="left">
                <h5>Graphs</h5>
                <Link to="/pert-chart">
                <button type="button" class="btn btn-warning">Pert Charts</button>
                </Link>
                <p></p>
                <Link to="/">
                <button type="button" class="btn btn-warning">Hasse Diagrams</button>
                </Link>
                <p></p>
              </div>
              </div>

              <div className="four columns">
              <div className="center">
                <h5>Order of Magnitude</h5>
                <Link to="/Master-Theorem">
                <button type="button" class="btn btn-danger">Master's Theorem</button>
                </Link>
                <p></p>
                <Link to="/MagnitudeOrder">
                <button type="button" class="btn btn-danger">Order Verifications</button>
                </Link>
              </div>
              </div>

              <div className="four columns">
              <div className="right">
                <h5>Sets</h5>
                <Link to="/set-ops">
                <button type="button" class="btn btn-success">Subsets</button>
                </Link>
                <p></p>
                <Link to="/set-ops">
                <button type="button" class="btn btn-success">Powersets</button>
                </Link>
              </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                <button type="button">Contact</button>
                </Link>
              </div>

              <div className= "tweleve columns">
              <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
              </p>
              </div>

            </div>

            </div>
          </footer>
        </div>
    );
  }
}

export default Home;
