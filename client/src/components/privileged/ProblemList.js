import React, { Component } from 'react';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import ProblemInputModal from './ProblemInputModal';

import { PROBLEM_TYPE_LIST } from './constants';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      error: null,
      modalShow: false,
      selectedProblem: {}
    };

    this.makeTableBody = this.makeTableBody.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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

  openModal(problem) {
    return () => {
      this.setState({
        modalShow: true,
        selectedProblem: problem
      });
    };
  }

  makeTableBody() {
    return this.state.problems.map((problem, i) => (
      <tr onClick={this.openModal(problem)} key={i}>
        <td>{i + 1}</td>
        <td>{PROBLEM_TYPE_LIST[problem.typeIndex]}</td>
        <td>{problem.username}</td>
      </tr>
    ));
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {this.makeTableBody()}
          </tbody>
        </Table>
        <ProblemInputModal
          show={this.state.modalShow}
          onHide={this.closeModal}
          problem={this.state.selectedProblem}
        />
      </div>
    );
  }
}

export default ProblemList;
