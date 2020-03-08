import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

const issueTypes = [
  "Site is broken (General)",
  "Incorrect Solution",
  "User Data"
];

class Issues extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  renderIssueTypeOptions() {
    return issueTypes.map(issueString => <option>{issueString}</option>);
  }

  render() {
    return (
      <div>
        <h1>Submit an Issue with the site</h1>
        <p>
          If you encounter an issue while using this site, please
          let us know and we will get back to you via email once we
          resolve the issue. Thanks for helping us improve the site.
        </p>
        <Form>
          <Form.Group controlId="issuesForm.TypeSelect">
            <Form.Label>Type of Issue</Form.Label>
            <Form.Control as="select">
              {this.renderIssueTypeOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="issuesForm.SubjectInput">
            <Form.Label>Subject Line</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="issuesForm.IssueText">
            <Form.Label>
              Please describe your issue in a few sentences:
            </Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <button type="submit" onClick={this.handleSubmit}>Send Issue</button>
        </Form>
      </div>
    );
  }
}

export default Issues;
