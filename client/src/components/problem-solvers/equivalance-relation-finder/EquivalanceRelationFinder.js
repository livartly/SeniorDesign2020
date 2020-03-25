import React from 'react';

import { Form, Card, Button } from 'react-bootstrap';

import { sendProblem } from '../../../utils/problemsAPIUtil';
import {
  validatePartition,
  findEquivalenceRelations
} from '../../../engine/Relations/equivalenceClass';

class EquivalanceRelationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setInput: "",
      partitionList: [""],
      out: "",
      error: null,
      maxPartitions: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPartition = this.handleAddPartition.bind(this);
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
      if (partitionListCopy.length >= 10) {
        return {
          partitionList: partitionListCopy,
          maxPartitions: true
        };
      }
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
      // sendProblem({
      //   userID: this.props.user.id,
      //   username: this.props.user.username,
      //   email: this.props.user.email,
      //   typeIndex: 1,
      //   input: {
      //     wff: this.state.wff
      //   }
      // });

      this.setState({ out: equivalenceRelation.toString(), error: null });
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
            <h1>Equivalance Relation Finder</h1>
            <Form.Group controlId="equivalenceRelationFinder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                This is a placeholder for now.
              </p>
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
              <Button
                disabled={this.state.maxPartitions}
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
            <Form.Group controlId="equivalenceRelationFinder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "100px" }}>
                {this.state.out}
              </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default EquivalanceRelationFinder;