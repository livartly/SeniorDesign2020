import React, { Component } from 'react';
import ProblemList from './ProblemList';
import FeedbackList from './FeedbackList';

class Catalog extends Component {
  render() {
    return (
      <div>
        <ProblemList />
        <FeedbackList />
      </div>
    );
  }
}

export default Catalog;
