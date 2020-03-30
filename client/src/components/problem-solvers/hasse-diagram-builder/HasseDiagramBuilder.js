import React from 'react';

import { Form, Card, Button } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  formatSet,
  formatRelation,
  testRelationProperties
} from '../../../engine/MultiplicityClosure/multiplicityClosure';

import { parseInputDataToGraphData } from '../../../engine/Relations/hasseDiagram';
import HasseDiagram from './HasseDiagram';

class HasseDiagramBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: "",
      relation: "",
      error: null,
      graphData: {}
    };
    this.updateSetInput = this.updateSetInput.bind(this);
    this.updateRelationInput = this.updateRelationInput.bind(this);
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

  showGraph(event) {
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
      testRelationProperties(formattedSet, formattedRelation, properties);

      // Validation
      if (!properties[0] || !properties[2] || properties[3]) {
        this.setState({ error: "Validation Error: relation must be transitive, antisymmetric, and reflexive" });
        return;
      }

      // This will occur asynchronously (not blocking)
      sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 3,
        input: {
          setInput: this.state.setInput,
          relation: this.state.relation
        }
      });

      var graphData = parseInputDataToGraphData(formattedRelation, 800, 600);
      this.setState({ graphData, error: null });

    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Form>
            <h1>Hasse Diagram Builder</h1>
            <Form.Group controlId="hasseDiagramBuilder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                Input sets and a relation, p.
              </p>
            </Form.Group>
            <Form.Group controlId="hasseDiagramBuilder.setInput">
              <Form.Label>Set Input</Form.Label>
              <Form.Control
                type="text"
                value={this.state.setInput}
                onChange={this.updateSetInput}
                placeholder="eg. 1,2,3,4,5,6,7,8"
              />
            </Form.Group>
            <Form.Group controlId="hasseDiagramBuilder.relationInput">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                value={this.state.relation}
                onChange={this.updateRelationInput}
                placeholder="eg. (1,1), (2,2), (3,3)"
              />
            </Form.Group>
            <Button onClick={this.showGraph}>
              Submit
            </Button>
            <br />
            <span style={{ color: 'red' }}>
              {this.state.error ? this.state.error : ""}
            </span>
            <Form.Group controlId="hasseDiagramBuilder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "100px" }}>
                <HasseDiagram data={this.state.graphData} />
              </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default HasseDiagramBuilder;