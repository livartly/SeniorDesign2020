import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const issueTypes = [
  "Site is broken (General)",
  "Incorrect Solution",
  "User Data"
];

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      subject: "",
      issueType: issueTypes[0],
      textBody: "",
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.subject === "") {
      this.setState({ error: "Please enter a subject line" });
    } else if (this.state.textBody === "") {
      this.setState({
        error: "Please enter a few sentences describing your issue"
      });
    } else {
      axios.post('/api/issues', {
        userID: this.state.userID,
        username: this.state.username,
        email: this.state.email,
        subject: this.state.subject,
        issueType: this.state.issueType,
        textBody: this.state.textBody
      }).then(() => {
        //TODO: Make a visual confirmation that issue was submitted
        console.log("OK submitted");
      }).catch(error => {
        //TODO: Make a visual component explaining the error
        this.setState({ error });
      });
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
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
            <Form.Control type="text" onChange={this.handleChange("subject")} />
          </Form.Group>
          <Form.Group controlId="issuesForm.IssueText">
            <Form.Label>
              Please describe your issue in a few sentences:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.handleChange("textBody")}
            />
          </Form.Group>
          <button type="submit" onClick={this.handleSubmit}>Send Issue</button>
        </Form>
      </div>
    );
  }
}

export default Issues;
