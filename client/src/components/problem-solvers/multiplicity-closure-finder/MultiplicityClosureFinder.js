import React from 'react';

import { Form, Card, Button } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  validatePartition,
  findEquivalenceRelations,
  formatSet,
  formatRelation,
  testRelationProperties
} from '../../../engine/MultiplicityClosure/multiplicityClosure';

import { parseInputDataToGraphData } from '../../../engine/Relations/hasseDiagram';
import HasseDiagram from './HasseDiagram';

class MultiplicityClosureFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: "",
      relation: "",
      out: "",
      error: null,
      graphData: {}
    };
    this.updateSetInput = this.updateSetInput.bind(this);
    this.updateRelationInput = this.updateRelationInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showGraph = this.showGraph.bind(this);
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
      var closures = testRelationProperties(formattedSet, formattedRelation, properties);
      console.log(properties);

      // This will occur asynchronously (not blocking)
      sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 2,
        input: {
          setInput: this.state.setInput
        }
      });

      this.setState({ out: properties.toString(), error: null });
    }
    catch (err) {
      this.setState({ error: err.message });
    }

  }

  showGraph() {
    var formattedRelation = formatRelation(this.state.relation);
    var graphData = parseInputDataToGraphData(formattedRelation, 800, 600);
    this.setState({ graphData });
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
                Input sets and a relation, p.
              </p>
            </Form.Group>
            <Form.Group controlId="multiplicityClosureFinder.setInput">
              <Form.Label>Set Input</Form.Label>
              <Form.Control
                type="text"
                value={this.state.setInput}
                onChange={this.updateSetInput}
                placeholder="eg. 1,2,3,4,5,6,7,8"
              />
            </Form.Group>
            <Form.Group controlId="multiplicityClosureFinder.partitionInput">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                value={this.state.relation}
                onChange={this.updateRelationInput}
                placeholder="eg. (1,1), (2,2), (3,3)"
              />
              <Button
                variant="secondary"
                onClick={this.handleAddPartition}
              >
                Add Partition
              </Button>
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
                <Button onClick={this.showGraph}>Hasse Diagram</Button>
                {this.state.out}
                <HasseDiagram data={this.state.graphData} />
              </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default MultiplicityClosureFinder;