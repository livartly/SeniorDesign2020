import React from 'react';
import { Form, Card, Button, ListGroup, Tabs, Tab} from 'react-bootstrap';

import {
  formatSet,
  formatRelation,
  testRelationProperties,
  validateInput
} from '../../../engine/MultiplicityClosure/multiplicityClosure';

import { sendProblem } from '../../../utils/problemsAPIUtil';


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

        // This will occur asynchronously (not blocking)
        sendProblem({
            userID: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            typeIndex: 8,
            input: {
              setInput: this.state.setInput,
              relation: this.state.relation
            }
        });

        this.setState({ relationProperties: properties });
        this.setState({ closures: relationClosures });
        this.setState({ error: "" });
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
          let rClosureString = "{" + this.state.closures[0].toString().substring(1, this.state.closures[0].toString().length - 1) + "}";
          rClosureString = rClosureString.replace(/\[/g, "(");
          rClosureString = rClosureString.replace(/\]/g, ")");

          let sClosureString = "{" + this.state.closures[1].toString().substring(1, this.state.closures[1].toString().length - 1) + "}";
          sClosureString = sClosureString.replace(/\[/g, "(");
          sClosureString = sClosureString.replace(/\]/g, ")");

          let tClosureString = "{" + this.state.closures[2].toString().substring(1, this.state.closures[2].toString().length - 1) + "}";
          tClosureString = tClosureString.replace(/\[/g, "(");
          tClosureString = tClosureString.replace(/\]/g, ")");
            return (
                <Card.Body>
                    <Card.Text><b>Relation Properties</b></Card.Text>
                    <Card.Text>Reflexive: {this.state.relationProperties[0].toString().toUpperCase()}</Card.Text>
                    <Card.Text>Symmetric: {this.state.relationProperties[1].toString().toUpperCase()}</Card.Text>
                    <Card.Text>Antisymmetric: {this.state.relationProperties[3].toString().toUpperCase()}</Card.Text>
                    <Card.Text>Transitive: {this.state.relationProperties[2].toString().toUpperCase()}</Card.Text>

                    <Card.Text><b>Relation Closures</b></Card.Text>
                    <Card.Text>Reflexive: {rClosureString}</Card.Text>
                    <Card.Text>Symmetric: {sClosureString}</Card.Text>
                    <Card.Text>Transitive: {tClosureString}</Card.Text>
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
                Input the elements of the set. Elements must be <b>integers</b>. Then, input the comma-separated list of ordered pairs
                composing the relation. All elements of the relation must also be integers. Select "Submit" to determine if the relation is
                reflexive, symmetric, antisymmetric, and transitive. Closures will also be provided for all properties except antisymmetric.
              </p>
            </Form.Group>

            <Form.Group controlID="multiplicityColsureFinder.examples">
              <Tabs defaultActiveKey="ex1" id="uncontrolled-tab-example">
                <Tab eventKey="ex1" title="Example 1">
                  <ul>
                    <li>
                      Set = 1, 2, 3, 4, 5
                    </li>
                    <li>
                      Relation = (1,1), (2,2), (3,3), (4,4), (5,5)
                    </li>
                  </ul>
                </Tab>
                <Tab eventKey="ex2" title="Example 2">
                  <ul>
                    <li>
                      Set = a, b, c, d
                    </li>
                    <li>
                      Relation = (a,b), (b,a), (c,c), (d,c)
                    </li>
                  </ul>
                </Tab>
                <Tab eventKey="ex3" title="Example 3">
                  <ul>
                    <li>
                      Set = 1, 2, 3
                    </li>
                    <li>
                      Relation = (2,2)
                    </li>
                  </ul>
                </Tab>
              </Tabs>
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