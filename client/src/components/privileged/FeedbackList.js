import React, { Component } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      error: null
    };

    this.makeTableBody = this.makeTableBody.bind(this);
  }

  componentDidMount() {
    axios.get('/api/issues/').then(answer => {
      this.setState({
        issues: answer.data.issues
      });
    }).catch(error => {
      this.setState({
        error
      });
    });
  }

  makeTableBody() {
    return this.state.issues.map((issue, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{issue.issueType}</td>
        <td>{issue.username}</td>
        <td>{issue.subject}</td>
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
              <th>Issue Type</th>
              <th>Username</th>
              <th>Subject</th>
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

export default FeedbackList;
