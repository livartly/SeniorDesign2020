import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

import { PROBLEM_TYPE_LIST } from './constants';

const showProblemInput = (input) => {
  if (!input) return;
  return Object.keys(input).map((fieldName, i) => {
    return (
      <div key={i}>
        {fieldName}: {input[fieldName]}
      </div>
    );
  });
};

const ProblemInputModal = (props) => {
  console.log(props.problem);
  var { problem } = props;
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