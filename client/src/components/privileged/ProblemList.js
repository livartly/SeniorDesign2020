import React, { Component } from 'react';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import ProblemInputModal from './ProblemInputModal';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      error: null,
      modalShow: false
    };

    this.makeTableBody = this.makeTableBody.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/problems/').then(answer => {
      this.setState({
        problems: answer.data.problems
      });
    }).catch(error => {
      this.setState({
        error
      });
    });
  }

  makeTableBody() {
    return this.state.problems.map((problem, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{problem.typeIndex}</td>
        <td>{problem.username}</td>
        <td onClick={() => this.setState({ modalShow: true })}>Show Input</td>
      </tr>
    ));
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Type Index</th>
              <th>Username</th>
              <th>Unput</th>
            </tr>
          </thead>
          <tbody>
            {this.makeTableBody()}
          </tbody>
        </Table>
        <ProblemInputModal show={this.state.modalShow} onHide={this.closeModal} />
      </div>
    );
  }
}

export default ProblemList;
