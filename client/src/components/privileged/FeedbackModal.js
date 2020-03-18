import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';


const FeedbackModal = (props) => {
  var { feedback } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {feedback.issueType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Feedback Information</h4>
        <p>Username: {feedback.username}</p>
        <p>Email: {feedback.email}</p>
        <p>Subject: {feedback.subject}</p>
        <p>Body: </p>
        <Card>
          <Card.Body>
            <p>{feedback.textBody}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;