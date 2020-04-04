import React from 'react';

import { Form, Card, Button } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  formatSet,
  formatRelation,
  testRelationProperties,
  validateInput
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
      graphData: {},
      extremes: null
    };
    this.updateSetInput = this.updateSetInput.bind(this);
    this.updateRelationInput = this.updateRelationInput.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.showExtremes = this.showExtremes.bind(this);
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
      validateInput(this.state.setInput, this.state.relation);
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
      if (!properties[0] || !properties[2] || !properties[3]) {
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

      var { graphData, extremes } = parseInputDataToGraphData(formattedRelation, 800, 600);
      this.setState({ graphData, extremes, error: null });

    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  showExtremes() {
    if (!this.state.extremes) return null;
    const { minimalNodes, maximalNodes } = this.state.extremes;
    return (
      <div>
        <p>Minimal Elements: {minimalNodes.toString()}</p>
        <p>Least Element: {minimalNodes.length === 1 ? minimalNodes[0] : "N/A"}</p>
        <p>Maximal Elements: {maximalNodes.toString()}</p>
        <p>Greatest Element: {maximalNodes.length === 1 ? maximalNodes[0] : "N/A"}</p>
      </div>
    );
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
                The site will construct a Hasse Diagram from the input set, S,
                and binary relation, ρ. The input for the set must be a series
                of unique integers that are comma-delimited and represents all
                the elements present in the Hasse Diagram. The input for the
                relation must be a series of ordered pairs that are also
                comma-delimited. For example, the ordered pair (1,2) signifies
                that 1 is related to 2. In order to meet the requirements for
                a Hasse Diagram, the input relation, ρ, must be a partially
                ordered set and meet the following criteria:
              </p>
              <ul>
                <li>Reflexive - each element is related to itself.</li>
                <li>
                  Antisymmetric - no two elements are related to each other.
                </li>
                <li>
                  Transitive - if l1 relates to l2 and l2 relates to l3, then l1
                  must be related to l3 as well.
                </li>
              </ul>
              <p>
                In addition, the minimal and maximal elements and the least and
                greatest elements, if they are applicable, will be listed below
                the Hasse Diagram.
              </p>
            </Form.Group>
            <Form.Group controlId="hasseDiagramBuilder.setInput">
              <Form.Label>Set Input</Form.Label>
              <Form.Control
                type="text"
                value={this.state.setInput}
                onChange={this.updateSetInput}
                placeholder="eg. 1,2,3"
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
            <button onClick={this.showGraph}>
              Submit
            </button>
            <br />
            <span style={{ color: 'red' }}>
              {this.state.error ? this.state.error : ""}
            </span>
            <Form.Group controlId="hasseDiagramBuilder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "100px" }}>
                <HasseDiagram data={this.state.graphData} />
                {this.showExtremes()}
              </Card>
            </Form.Group>
          </Form>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default HasseDiagramBuilder;