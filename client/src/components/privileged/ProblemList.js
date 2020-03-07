import React, { Component } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      error: null
    };

    this.makeTableBody = this.makeTableBody.bind(this);
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
        <td>{problem.input.wff}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>type #</th>
              <th>username</th>
              <th>input</th>
            </tr>
          </thead>
          <tbody>
            {this.makeTableBody()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ProblemList;
