import React from 'react';

import { Form, Card, Button, ListGroup } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  formatSet,
  formatRelation,
  validateInput
} from '../../../engine/CycleSolver/CycleSolver';
import {CycleSolver} from '../../../engine/CycleSolver/CycleSolver';

class CycleSolverPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: "",
      relation: "",
      relationProperties: [],
      closures: [],
      error: null,
      graphData: {}
    };
    this.updateSetInput = this.updateSetInput.bind(this);
    this.updateRelationInput = this.updateRelationInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showOutput = this.showOutput.bind(this);
  }

  updateSetInput(event) {
    this.setState({
      setInput: event.currentTarget.value
    });
  }

  updateRelationInput(event) {
    this.setState({
      relation: event.currentTarget.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      if (validateInput(this.state.setInput, this.state.relation)) {
        var formattedSet = formatSet(this.state.setInput);
        var formattedRelation = formatRelation(this.state.relation);
        // This will occur asynchronously (not blocking)
        /*sendProblem({
            userID: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            typeIndex: 2,
            input: {
            setInput: this.state.setInput
            }
        });*/
      }
    }
    catch (err) {
      this.setState({ error: err.message });
    }

  }

  showOutput() {
        if (this.state.relationProperties.length === 0)
            return;
        else {
            return (
                <Card.Body>
                    <Card.Title>Relation Properties</Card.Title>
                    <Card.Text>Reflexive: {this.state.relationProperties[0].toString()}</Card.Text>
                    <Card.Text>Symmetric: {this.state.relationProperties[1].toString()}</Card.Text>
                    <Card.Text>Antisymmetric: {this.state.relationProperties[3].toString()}</Card.Text>
                    <Card.Text>Transitive: {this.state.relationProperties[2].toString()}</Card.Text>

                    <Card.Title>Relation Closures</Card.Title>
                    <Card.Text>Reflexive: {this.state.closures[0].toString()}</Card.Text>
                    <Card.Text>Symmetric: {this.state.closures[1].toString()}</Card.Text>
                    <Card.Text>Transitive: {this.state.closures[2].toString()}</Card.Text>
                </Card.Body>
            );
        }
  }

  render() {
    window.CycleSolver = CycleSolver;
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Form>
            <h1>Cycle Solver</h1>
            <Form.Group controlId="multiplicityClosureFinder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                Input a set S and a relation on S. Note that a relation in cycle form can be input as a series of ordered pairs.
              </p>
            </Form.Group>
            <Form.Group controlId="multiplicityClosureFinder.setInput">
              <Form.Label>Set Input</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={this.state.setInput}
                onChange={this.updateSetInput}
                placeholder="eg. 1,2,3,4,5,6,7,8"
              />
            </Form.Group>
            <Form.Group controlId="multiplicityClosureFinder.relationInput">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={this.state.relation}
                onChange={this.updateRelationInput}
                placeholder="eg. (1,1), (2,2), (3,3)"
              />
            </Form.Group>
            <Button onClick={this.handleSubmit}>
              Submit
            </Button>
            <br />
            <span style={{ color: 'red' }}>
              {this.state.error ? this.state.error : ""}
            </span>
            <Form.Group controlId="multiplicityClosureFinder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "100px" }}>
                  {this.showOutput()}
              </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default CycleSolverPage;