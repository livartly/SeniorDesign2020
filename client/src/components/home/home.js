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

          <br></br>

          <div class="card-deck">
            <Link to="/truth-table-builder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/truthTable-01.png" />
                <Card.Body>
                  <Card.Title><h7>1.1</h7></Card.Title>
                  <Card.Text>
                    <h8>Statements, Symbolic Representations, and Tautologies.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/propositional-logic">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/propositionalLogic.png" />
                <Card.Body>
                  <Card.Title><h7>1.2</h7></Card.Title>
                  <Card.Text>
                    <h8>Propositional Logic, also includes Predicate and Modal Logic.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/recursive-sequence-builder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/recursion.png" />
                <Card.Body>
                  <Card.Title><h7>3.1</h7></Card.Title>
                  <Card.Text>
                    <h8>Recursive Definitions, also includes Recursive Sequences.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/set-ops">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/set.png" />
                <Card.Body>
                  <Card.Title><h7>4.1</h7></Card.Title>
                  <Card.Text>
                    <h8>Sets, also includes Subset Determination and Powersets.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>

          <br></br>

          <div class="card-deck">
            <Link to="/multiplicity-closure-finder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/closure.png" />
                <Card.Body>
                  <Card.Title><h7>5.1a</h7></Card.Title>
                  <Card.Text>
                    <h8>Relation Properties and Closures: Reflexive, Transative, and Symmetric.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/hasse-diagram-builder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/hasseDiagram.png" />
                <Card.Body>
                  <Card.Title><h7>5.1b</h7></Card.Title>
                  <Card.Text>
                    <h8>Hasse Diagram with set input and graphical diagram output.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/equivalence-relation-finder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/equivalenceClass.png" />
                <Card.Body>
                  <Card.Title><h7>5.1c</h7></Card.Title>
                  <Card.Text>
                    <h8>Equivalence Class with set input, Equivalence Relation output.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/pert-chart">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/pertChart.png" />
                <Card.Body>
                  <Card.Title><h7>5.2a</h7></Card.Title>
                  <Card.Text>
                    <h8>PERT Charts, includes table input and graphical output.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>

          <br></br>

          <div class="card-deck">
            <Link to="/topological-sort">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/topSort.png" />
                <Card.Body>
                  <Card.Title><h7>5.2b</h7></Card.Title>
                  <Card.Text>
                    <h8>Topological Sort- input nodes and dependencies and receive a sorted list.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/cycle-solver">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/function.png" />
                <Card.Body>
                  <Card.Title><h7>5.4</h7></Card.Title>
                  <Card.Text>
                    <h8>Functions, Form Conversion, and Composition of cycles functionality.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="/MagnitudeOrder">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/orderverification.png" />
                <Card.Body>
                  <Card.Title><h7>5.5a</h7></Card.Title>
                  <Card.Text>
                    <h8>Order of Magnitude includes Same Order Verification problem input.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>

            <Link to="Master-Theorem">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/masters.png" />
                <Card.Body>
                  <Card.Title><h7>5.5b</h7></Card.Title>
                  <Card.Text>
                    <h8>Order of Magnitude Master's Theorem with recurrence relation input.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>

          <br />

          <div className="card-deck">
            <Link to="/BooleanMatrices">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="icons/matrix.png" />
                <Card.Body>
                  <Card.Title><h7>5.7</h7></Card.Title>
                  <Card.Text>
                    <h8>Boolean Matricies calculator. Allows boolean matrix inputs.
                  </h8>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <br>
          </br>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Home;
