import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container main">
          <Card>
            <Card.Header>Home</Card.Header>
            <Card.Body>
              <Card.Title><h7>Compute Expert-level Answers</h7></Card.Title>
              <Card.Text>
                <h8>Use Wolfram Beta's breakthrough algorithms and knowledgebase. Select a
            section to be redirected to its functional page or check out our bank of selected resources.
                </h8>
              </Card.Text>
              <Link to="/resources">
                <Button variant="primary">RESOURCES</Button>
              </Link>
            </Card.Body>
          </Card>

          <div class="container">
            <div class="row">
              <div class="card-deck">
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/truthTable-01.png" />
                  <Card.Body>
                    <Card.Title><h7>1.1</h7></Card.Title>
                    <Card.Text>
                      <h8>Statements, Symbolic Representations, and Tautologies.
                  </h8>
                    </Card.Text>
                    <Link to="/truth-table-builder">
                      <Button variant="primary">TRUTH TABLES</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/propositionalLogic.jpg" />
                  <Card.Body>
                    <Card.Title><h7>1.2</h7></Card.Title>
                    <Card.Text>
                      <h8>Propositional Logic, also includes Predicate and Modal Logic.
                  </h8>
                    </Card.Text>
                    <Link to="propositional-logic">
                      <Button variant="primary">PREP LOGIC</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/recursion.png" />
                  <Card.Body>
                    <Card.Title><h7>3.1</h7></Card.Title>
                    <Card.Text>
                      <h8>Recursive Definitions, also includes Recursive Sequences.
                  </h8>
                    </Card.Text>
                    <Link to="">
                      <Button variant="primary">RECURSIVE</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/set.png" />
                  <Card.Body>
                    <Card.Title><h7>4.1</h7></Card.Title>
                    <Card.Text>
                      <h8>Sets, also includes Subset Determination and Powersets.
                  </h8>
                    </Card.Text>
                    <Link to="/set-ops">
                      <Button variant="primary">SETS</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="card-deck">
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/hasseDiagram.png" />
                  <Card.Body>
                    <Card.Title><h7>5.1a</h7></Card.Title>
                    <Card.Text>
                      <h8>Multiplicity Classifier, also includes Hasse Diagrams.
                  </h8>
                    </Card.Text>
                    <Link to="/">
                      <Button variant="primary">HASSE</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/closure.png" />
                  <Card.Body>
                    <Card.Title><h7>5.1b</h7></Card.Title>
                    <Card.Text>
                      <h8>Equivalence Class, also includes Reflexive and other Closures.
                  </h8>
                    </Card.Text>
                    <Link to="">
                      <Button variant="primary">CLSOURES</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/pertChart.png" />
                  <Card.Body>
                    <Card.Title><h7>5.2a</h7></Card.Title>
                    <Card.Text>
                      <h8>PERT Charts, includes table input and graphical output.
                  </h8>
                    </Card.Text>
                    <Link to="">
                      <Button variant="primary">PERT</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/topSort.png" />
                  <Card.Body>
                    <Card.Title><h7>5.2b</h7></Card.Title>
                    <Card.Text>
                      <h8>Topological Sort with node and dependancy inputs.
                  </h8>
                    </Card.Text>
                    <Link to="/topological-sort">
                      <Button variant="primary">SORT</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="card-deck">
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/function.jpg" />
                  <Card.Body>
                    <Card.Title><h7>5.4</h7></Card.Title>
                    <Card.Text>
                      <h8>Functions, Form Conversion, and Composition of cycles functionality.
                  </h8>
                    </Card.Text>
                    <Link to="/">
                      <Button variant="primary">FUNCTIONS</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/orderverification.png" />
                  <Card.Body>
                    <Card.Title><h7>5.5a</h7></Card.Title>
                    <Card.Text>
                      <h8>Order of Magnitude includes Same Order Verification problem input.
                  </h8>
                    </Card.Text>
                    <Link to="/MagnitudeOrder">
                      <Button variant="primary">ORDER</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/masters.png" />
                  <Card.Body>
                    <Card.Title><h7>5.5b</h7></Card.Title>
                    <Card.Text>
                      <h8>Order of Magnitude Master's Theorem with recurrence relation input.
                  </h8>
                    </Card.Text>
                    <Link to="Master-Theorem">
                      <Button variant="primary">MASTERS</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
                <Card style={{ width: '20rem' }}>
                  <Card.Img variant="top" src="icons/matrix.png" />
                  <Card.Body>
                    <Card.Title><h7>5.7</h7></Card.Title>
                    <Card.Text>
                      <h8>Matrices, includes Boolean Matrices calculator. Allows two boolean matrices input.
                  </h8>
                    </Card.Text>
                    <Link to="/">
                      <Button variant="primary">MATRICIES</Button>
                    </Link>
                  </Card.Body>
                </Card>
                <br>
                </br>
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

              <div className="tweleve columns">
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
