import React from 'react';

import { Form, Card, Button, ListGroup } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  formatSet,
  formatRelation,
  testRelationProperties,
  validateInput
} from '../../../engine/MultiplicityClosure/multiplicityClosure';
//import { ListItem } from 'react-bootstrap/lib/Media';

class MultiplicityClosureFinder extends React.Component {
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

        /* Array to store boolean values representing relation properties.
        * Index 0 - Reflexive
        * 1 - Symmetric 
        * 2 - Transitive
        * 3 - Antisymmetric
        */
        var properties = [false, false, false, false];
        
        /* Array to store relation closures for its properties. If null, the relation satisfies the property and is its own closure.
        * Index 0 - Reflexive Closure
        * 1 - Symmetric 
        * 2 - Transitive
        */
        var relationClosures = testRelationProperties(formattedSet, formattedRelation, properties);
        this.setState({ closures: relationClosures });

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

        this.setState({ relationProperties: properties });
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
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Form>
            <h1>Multiplicity and Closure Finder</h1>
            <Form.Group controlId="multiplicityClosureFinder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                Input a set S and a relation on S.
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

export default MultiplicityClosureFinder;