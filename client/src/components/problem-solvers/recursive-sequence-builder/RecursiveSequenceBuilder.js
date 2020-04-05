import React from 'react';

import { Form, Card, Col, Table } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';

import { solveSequence } from '../../../engine/RecursiveSequence/recursiveSequence';

const EXAMPLE_INPUTS = [
  {
    baseCases: ["10"],
    recurrenceRelation: "S(n - 1) + 10"
  },
  {
    baseCases: ["1"],
    recurrenceRelation: "nS(n - 1)"
  },
  {
    baseCases: ["2", "3"],
    recurrenceRelation: "S(n - 1)S(n - 2)"
  }
];

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
    return (
      <Table striped bordered>
        <thead>
          <th>n</th>
          <th>S(n)</th>
        </thead>
        <tbody>
          {
            this.state.out.map((val, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{val}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
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
      if (err.message === "(intermediate value)(intermediate value)(intermediate value) is not a function") {
        this.setState({ error: "Invalid function name encountered. Please use S for the recurrence relation" });
      } else {
        this.setState({ error: err.message });
      }
    }
  }

  applyExample(idx) {
    return () => {
      this.setState(EXAMPLE_INPUTS[idx])
    };
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Card>
            <Card.Body>
              <Form>
                <h1>Recursive Sequence Builder</h1>
                <Form.Group controlId="recursiveSequenceBuilder.instructions">
                  <Form.Label>Instructions</Form.Label>
                  <p>
                    The site will take a recurrence relation and a series of base
                    cases as input and find the following elements in the recursive
                    sequence.
                  </p>
                </Form.Group>
                <Form.Group controlId="recursiveSequenceBuilder.usage">
                  <Form.Label>Usage</Form.Label>
                  <ul>
                    <li>
                      Base Cases - must be numbers. Click add/remove to adjust the
                      desired number of base cases.
                    </li>
                    <li>
                      Depth - how many additional elements of the recursive
                      sequence to be found.
                    </li>
                    <li>
                      Recurrence Relation - the relation defining how sequential
                      elements should be found. Note: the function must adhere to
                      the format, S(n), where S is the recurrence relation and n
                      is the sequence index.
                    </li>
                    <li>
                      The site uses <a href="https://mathjs.org/">mathjs</a> to
                      parse the formula used in the recurrence relation. You can
                      find information on supported syntax for valid expressions&nbsp;
                      <a href="https://mathjs.org/docs/expressions/syntax.html">
                        here.
                      </a>
                    </li>
                  </ul>
                </Form.Group>
                <Form.Group controlId="recursiveSequenceBuilder.examples">
                  <Form.Label>Examples</Form.Label>
                  <ul>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(0)}>
                        S(n) = S(n - 1) + 10; S(1) = 10
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(1)}>
                        S(n) = nS(n - 1); S(1) = 1
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(2)}>
                        S(n) = S(n - 1)S(n - 2); S(1) = 2; S(2) = 3
                      </a>
                    </li>
                  </ul>
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
                  <Form.Label>Recurrence Relation: S(n) =</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.recurrenceRelation}
                    onChange={this.updateRecurrenceRelation}
                    placeholder="S(n - 1) + 10"
                  />
                </Form.Group>
                <span style={{ color: 'red', display: 'block' }}>
                  {this.state.error ? this.state.error : null}
                </span>
                <button onClick={this.handleSubmit}>
                  Submit
                </button>
                <Form.Group controlId="recursiveSequenceBuilder.cardOutput">
                  <Form.Label>Result</Form.Label>
                  <Card body style={{ minHeight: "300px" }}>
                    {this.showResult()}
                  </Card>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default RecursiveSequenceBuilder;