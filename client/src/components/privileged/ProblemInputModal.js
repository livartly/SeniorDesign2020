import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

import { PROBLEM_TYPE_LIST } from './constants';

const showProblemInput = (input) => {
  if (!input) return null;
  return (
    <div>
      <pre>
        {JSON.stringify(input, null, 2)}
      </pre>
    </div>
  );
};

const ProblemInputModal = (props) => {
  var { problem } = props;
  const dateSubmitted = new Date(problem.dateSubmitted);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {PROBLEM_TYPE_LIST[problem.typeIndex]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Submission History</h4>
        <p>Username: {problem.username}</p>
        <p>Email: {problem.email}</p>
        <p>Date: {dateSubmitted.toLocaleDateString()}</p>
        <p>Time: {dateSubmitted.toLocaleTimeString()}</p>
        <p>Input: </p>
        <Card>
          <Card.Body>
            {showProblemInput(problem.input)}
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProblemInputModal;