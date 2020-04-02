import React from 'react';

import { Form, Card, Col } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';

import { solveSequence } from '../../../engine/RecursiveSequence/recursiveSequence';

class RecursiveSequenceBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recurrenceRelation: "",
      baseCases: [""],
      out: null,
      depth: 3,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBaseCase = this.handleAddBaseCase.bind(this);
    this.handleRemoveBaseCase = this.handleRemoveBaseCase.bind(this);
    this.updateRecurrenceRelation = this.updateRecurrenceRelation.bind(this);
    this.showBaseCasesInput = this.showBaseCasesInput.bind(this);
    this.updateDepth = this.updateDepth.bind(this);
  }

  updateRecurrenceRelation(event) {
    this.setState({
      recurrenceRelation: event.currentTarget.value
    });
  }

  updateBaseCase(index) {
    return (e) => {
      var nextBaseCase = e.currentTarget.value;
      this.setState(prevState => {
        var baseCasesCopy = Array.from(prevState.baseCases);
        baseCasesCopy[index] = nextBaseCase;
        return {
          baseCases: baseCasesCopy
        };
      });
    };
  }

  updateDepth(event) {
    this.setState({ depth: parseInt(event.currentTarget.value) });
  }

  showBaseCasesInput() {
    return this.state.baseCases.map((val, i) => {
      return (
        <Form.Control
          type="text"
          value={val}
          key={i}
          onChange={this.updateBaseCase(i)}
          placeholder={"S(" + (i + 1) + ")"}
        />
      );
    });
  }

  showDepthOptions() {
    return [3, 4, 5, 6, 7, 8, 9, 10].map(value => (
      <option val={value} key={value}>{value}</option>
    ));
  }

  showResult() {
    if (!this.state.out) return null;
    return this.state.out.map((val, i) => (
      <div key={i}>S({i + 1}) = {val}</div>
    ));
  }

  handleAddBaseCase(event) {
    event.preventDefault();
    this.setState(prevState => {
      var baseCasesCopy = Array.from(prevState.baseCases);
      baseCasesCopy.push("");
      return {
        baseCases: baseCasesCopy
      };
    });
  }

  handleRemoveBaseCase(event) {
    event.preventDefault();
    this.setState(prevState => {
      var baseCasesCopy = Array.from(prevState.baseCases);
      baseCasesCopy.pop();
      return {
        baseCases: baseCasesCopy
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      var { baseCases, recurrenceRelation, depth } = this.state;
      var outScope = solveSequence(baseCases, recurrenceRelation, depth);

      // This will occur asynchronously (not blocking)
      sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 4,
        input: {
          recurrenceRelation: this.state.recurrenceRelation,
          baseCases: this.state.baseCases
        }
      });

      var outDataArr = Object.values(outScope);
      this.setState({ out: outDataArr, error: null });
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
            <h1>Recursive Sequence Builder</h1>
            <Form.Group controlId="recursiveSequenceBuilder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                The site will find the equivalence relation from the provided
                input set, S, and series of partitions (up to 10). The
                partitions must divide the parent set such that each element
                in the parent set must be present in exactly one of the
                partition. The input for the set and the input for each
                partition must be a series of elements that are
                comma-delimited. Valid element names can be a combination of
                alphanumeric characters. Click the "Add Partition" button to
                create a new partition. The supported number of partitions is
                limited to a maximum of 10.
              </p>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md={4} controlId="recursiveSequenceBuilder.baseCasesInput">
                <Form.Label>Base Cases (up to 5)</Form.Label>
                {this.showBaseCasesInput()}
                <button
                  disabled={this.state.baseCases.length >= 5}
                  onClick={this.handleAddBaseCase}
                >
                  Add
                </button>
                <span>&nbsp;&nbsp;</span>
                <button
                  disabled={this.state.baseCases.length <= 1}
                  onClick={this.handleRemoveBaseCase}
                >
                  Remove
                </button>
              </Form.Group>
              <Col md={1} />
              <Form.Group as={Col} md={4} controlId="recursiveSequenceBuilder.depthDropdown" >
                <Form.Label>Depth (3-10)</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.depth}
                  onChange={this.updateDepth}
                  style={{ height: "38px" }}
                >
                  {this.showDepthOptions()}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="recursiveSequenceBuilder.recurrenceRelationInput">
              <Form.Label>Recurrence Relation - S(n) =</Form.Label>
              <Form.Control
                type="text"
                value={this.state.recurrenceRelation}
                onChange={this.updateRecurrenceRelation}
                placeholder="S(n - 1) + 10"
              />
            </Form.Group>
            <button onClick={this.handleSubmit}>
              Submit
            </button>
            <span style={{ color: 'red' }}>
              {this.state.error ? this.state.error : ""}
            </span>
            <Form.Group controlId="recursiveSequenceBuilder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "300px" }}>
                {this.showResult()}
              </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default RecursiveSequenceBuilder;