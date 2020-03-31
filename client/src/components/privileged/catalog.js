import React, { Component } from 'react';
import ProblemList from './ProblemList';
import FeedbackList from './FeedbackList';

import { Tab, Tabs } from 'react-bootstrap';

class Catalog extends Component {
  render() {
    return (
      <div className="container main">
        <Tabs defaultActiveKey="problems">
          <Tab eventKey="problems" title="Problems">
            <ProblemList />
          </Tab>
          <Tab eventKey="feedback" title="Feedback">
            <FeedbackList />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Catalog;
