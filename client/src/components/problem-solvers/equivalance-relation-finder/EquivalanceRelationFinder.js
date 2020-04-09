import React from 'react';

import { Form, Card, Button } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  validatePartition,
  findEquivalenceRelations
} from '../../../engine/Relations/equivalenceClass';

const EXAMPLE_INPUTS = [
  {
    setInput: "1,2,3,4",
    partitionList: [
      "1,2",
      "3,4"
    ]
  },
  {
    setInput: "1,2,3,4,5,6,7,8,9,10",
    partitionList: [
      "1,2,3",
      "4,5,6",
      "7,8,9",
      "10"
    ]
  }
];

class EquivalanceRelationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: "",
      partitionList: [""],
      out: "",
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPartition = this.handleAddPartition.bind(this);
    this.handleRemovePartition = this.handleRemovePartition.bind(this);
    this.updateSetInput = this.updateSetInput.bind(this);
  }

  updateSetInput(event) {
    this.setState({
      setInput: event.currentTarget.value
    });
  }

  updatePartition(index) {
    return (e) => {
      var nextPartition = e.currentTarget.value;
      this.setState(prevState => {
        var partitionListCopy = Array.from(prevState.partitionList);
        partitionListCopy[index] = nextPartition;
        return {
          partitionList: partitionListCopy
        };
      });
    };
  }

  showPartitionInputs() {
    return this.state.partitionList.map((val, i) => {
      return (
        <Form.Control
          type="text"
          value={val}
          key={i}
          onChange={this.updatePartition(i)}
          placeholder={"Partition " + (i + 1)}
        />
      );
    });
  }

  handleAddPartition(event) {
    event.preventDefault();
    this.setState(prevState => {
      var partitionListCopy = Array.from(prevState.partitionList);
      partitionListCopy.push("");
      return {
        partitionList: partitionListCopy
      };
    });
  }

  handleRemovePartition(event) {
    event.preventDefault();
    this.setState(prevState => {
      var partitionListCopy = Array.from(prevState.partitionList);
      partitionListCopy.pop();
      return {
        partitionList: partitionListCopy
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      validatePartition(this.state.setInput, this.state.partitionList);
      var equivalenceRelation = findEquivalenceRelations(this.state.partitionList);

      // This will occur asynchronously (not blocking)
      sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 2,
        input: {
          setInput: this.state.setInput,
          partitionList: this.state.partitionList
        }
      });

      this.setState({ out: equivalenceRelation.toString(), error: null });
    }
    catch (err) {
      this.setState({ error: err.message });
    }
  }

  applyExample(idx) {
    return () => {
      this.setState(EXAMPLE_INPUTS[idx]);
    };
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Card>
            <Card.Body>
              <Form>
                <h1>Equivalance Relation Finder</h1>
                <Form.Group controlId="equivalenceRelationFinder.instructions">
                  <Form.Label>Instructions</Form.Label>
                  <p>
                    The site will find the equivalence relation from the provided
                    input set, S, and series of partitions.
                  </p>
                </Form.Group>
                <Form.Group controlId="equivalenceRelationFinder.usage">
                  <Form.Label>Usage</Form.Label>
                  <ul>
                    <li>
                      Input set - the parent set of all elements to be
                      considered. Input must be a series of elements (alpha-
                      numeric) that are comma-delimited.
                    </li>
                    <li>
                      Partitions - series of subsets of the parent set that
                      must partition the parent set exactly. Each element of
                      the parent set must be present in exactly one partition.
                      Input must be a series of elements (alpha-numeric)
                      that are comma-delimited. Click the Add or Remove button
                      to adjust the number of desired partitions. The supported
                      number of partitions is limited to a maximum of 10.
                    </li>
                  </ul>
                </Form.Group>
                <Form.Group controlId="equivalenceRelationFinder.examples">
                  <Form.Label>Examples</Form.Label>
                  <ul>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(0)}>
                        {"S = {1,2,3,4}"}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(1)}>
                        {"S = {1,2,3,4,5,6,7,8,9,10}"}
                      </a>
                    </li>
                  </ul>
                </Form.Group>
                <Form.Group controlId="equivalenceRelationFinder.setInput">
                  <Form.Label>Set Input</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.setInput}
                    onChange={this.updateSetInput}
                    placeholder="eg. 1,2,3,4,5,6,7,8"
                  />
                </Form.Group>
                <Form.Group controlId="equivalenceRelationFinder.partitionInput">
                  <Form.Label>Partitions</Form.Label>
                  {this.showPartitionInputs()}
                </Form.Group>
                <button
                  disabled={this.state.partitionList.length >= 10}
                  onClick={this.handleAddPartition}
                >
                  Add
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <button
                  disabled={this.state.partitionList.length <= 1}
                  onClick={this.handleRemovePartition}
                >
                  Remove
                </button>
                <br />
                <button onClick={this.handleSubmit}>
                  Submit
                </button>
                <br />
                <span style={{ color: 'red' }}>
                  {this.state.error ? this.state.error : ""}
                </span>
                <Form.Group controlId="equivalenceRelationFinder.cardOutput">
                  <Form.Label>Result</Form.Label>
                  <Card body style={{ minHeight: "300px" }}>
                    {this.state.out}
                  </Card>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default EquivalanceRelationFinder;