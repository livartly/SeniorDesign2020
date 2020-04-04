import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const issueTypes = [
  "Site is broken (General)",
  "Incorrect Solution",
  "User Data"
];

class Feedback extends Component {
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
        error: "Please enter a few sentences describing your feedback"
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
        //TODO: Make a visual confirmation that feedback was submitted
        alert("Your message has been submitted.");
        this.props.history.push('/');
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
    return issueTypes.map((issueString, i) =>
      <option value={issueString} key={i}>{issueString}</option>
    );
  }

  render() {
    return (
      <div>
        <div className="container main">
          <Card>
            <Card.Header>Contact Us</Card.Header>
            <Card.Body>
              <Card.Text>
                <h1>Submit feedback about Wolfram Beta</h1>
                <p>
                  If you would like to submit feedback regarding this site, please
                  enter your message below. We will get back to you via email once we
                  read your feedback. Thanks for helping us improve the site!
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Group controlId="feedbackForm.TypeSelect">
                    <Form.Label>Type of Feedback</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange("issueType")}>
                      {this.renderIssueTypeOptions()}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="feedbackForm.SubjectInput">
                    <Form.Label>Subject Line</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange("subject")} />
                  </Form.Group>
                  <Form.Group controlId="feedbackForm.FeedbackText">
                    <Form.Label>
                      Please describe your feedback in a few sentences:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      onChange={this.handleChange("textBody")}
                    />
                  </Form.Group>
                  <button type="submit" onClick={this.handleSubmit}>
                    Send Feedback
                  </button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default Feedback;
