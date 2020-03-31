import React, { Component } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

import FeedbackModal from './FeedbackModal';

class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      error: null,
      modalShow: false,
      selectedFeedback: {}
    };

    this.makeTableBody = this.makeTableBody.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      <tr onClick={this.openModal(issue)} key={i}>
        <td style={{ textAlign: "center" }}>{i + 1}</td>
        <td>{issue.issueType}</td>
        <td>{issue.username}</td>
        <td>{issue.subject}</td>
      </tr>
    ));
  }

  openModal(feedback) {
    return () => {
      this.setState({
        modalShow: true,
        selectedFeedback: feedback
      });
    };
  }

  closeModal() {
    this.setState({ modalShow: false });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Table striped bordered>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th>Issue Type</th>
              <th>Username</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {this.makeTableBody()}
          </tbody>
        </Table>
        <FeedbackModal
          show={this.state.modalShow}
          onHide={this.closeModal}
          feedback={this.state.selectedFeedback}
        />
      </div>
    );
  }
}

export default FeedbackList;
