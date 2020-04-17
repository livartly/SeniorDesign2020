import React from 'react';

import { Form, Card, Button, ListGroup } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  formatSet,
  formatRelation,
  validateInput
} from '../../../engine/CycleSolver/CycleSolver';
import {CycleSolver} from '../../../engine/CycleSolver/CycleSolver';
import Legend from './Legend';

const EXAMPLE_INPUTS = [
  {
    setInput: "1,2,3,4,5",
    relation: "(1,4),(2,5),(3,2),(4,3),(5,1)"
  },
  {
    setInput: "a,b,c,d,e",
    relation: "(b,e,d)(d,a)(e,a,c)(a,c,b,e)"
  }
];

class CycleSolverPage extends React.Component {
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
    this.handleCycleSubmit = this.handleCycleSubmit.bind(this);
    this.handlePermutationSubmit = this.handlePermutationSubmit.bind(this);
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

  handleCycleSubmit(event) {
    event.preventDefault();
    try {
      let solver = new CycleSolver(this.state.setInput, this.state.relation, true);
      let inputStr = this.state.relation.replace(/ /g, "");
      let inputArray = inputStr.split(")(");
      for (var i = 0; i < inputArray.length; i++) {
        inputArray[i] = inputArray[i].replace(/\(/g, "");
        inputArray[i] = inputArray[i].replace(/\)/g, "");

        inputArray[i] = "(" + inputArray[i] + ")";
      }

      if (inputArray.length === 1) {
        let solver = new CycleSolver(this.state.setInput, inputArray[0], true);
        this.setState({out : solver.toCycleString()});
        this.setState({error : "Given relation already in cycle form."});
      }
      else if (inputArray.length > 1) {
        let solvers = [];
        for (var i = 0; i < inputArray.length; i++) {
          solvers.push(new CycleSolver(this.state.setInput, inputArray[i], true));
        }

        var result = null;
        for (var i = solvers.length - 1; i > 0; i--) {
          if (result === null)
            result = solvers[i-1].makeComposite(solvers[i]);
          else {
            result = solvers[i - 1].makeComposite(result); 
          }
        }

        // This will occur asynchronously (not blocking)
        sendProblem({
            userID: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            typeIndex: 13,
            input: {
              setInput: this.state.setInput,
              relation: this.state.relation
            }
        });

        this.setState({out : result.toCycleString()});
        this.setState({error : ""});
      }
      else {
        throw new Error("Error: Empty relation. No cycle possible.");
      }

      this.setState({ error : null });
    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  handlePermutationSubmit(event) {
    event.preventDefault();
    try {
      let solver = new CycleSolver(this.state.setInput, this.state.relation, false);

        // This will occur asynchronously (not blocking)
        sendProblem({
            userID: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            typeIndex: 13,
            input: {
              setInput: this.state.setInput,
              relation: this.state.relation
            }
        });

        this.setState({ out : solver.toCycleString() });
        this.setState({ error : null });
    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  showOutput() {
        if (this.state.out === "")
            return;
        else {
            return (
                <Card.Body>
                    <Card.Text>{this.state.out}</Card.Text>
                </Card.Body>
            );
        }
  }

  applyExample(idx) {
    return () => {
      this.setState(EXAMPLE_INPUTS[idx]);
    };
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
                Input the elements of the set. Elements can be any comma separated list of characters or strings. Then, input the relation
                in either cycle-form or permutation-form and select the appropriate "Submit" button.
              </p>
              <p>
                Sets submitted in permutation form will be converted into the shortest possible cycle-form equivalent.
                Submit a series of cycle-form sets as a relation to calculate a function composition. For this calculation, it is assumed
                that all cycles given share the same parent set of elements.
              </p>
            </Form.Group>

            <Form.Group>
              <p>
                The following legend listsan example of valid permutation and cycle forms.
              </p>
              <Legend />
            </Form.Group>

            <Form.Group controlID="multiplicityColsureFinder.examples">
              <ul>
                <li>
                  <a href="javascript:;" onClick={this.applyExample(0)}>
                    Example 1 - Permutation Form Simplification
                  </a>
                </li>
                <li>
                  <a href="javascript:;" onClick={this.applyExample(1)}>
                    Example 2 - Cycle Form Composition
                  </a>
                </li>
              </ul>
            </Form.Group>

            <Form.Group controlId="multiplicityClosureFinder.setInput">
              <Form.Label>Set Input</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={this.state.setInput}
                onChange={this.updateSetInput}
                placeholder="eg. 1,2,3"
              />
            </Form.Group>
            <Form.Group controlId="multiplicityClosureFinder.relationInput">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={this.state.relation}
                onChange={this.updateRelationInput}
                placeholder="eg. (1,2), (2,3), (3,1)"
              />
            </Form.Group>
            <Button onClick={this.handleCycleSubmit}>
              Submit Cycle-Form
            </Button>

            <Button onClick={this.handlePermutationSubmit}>
              Submit Permutation-Form
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