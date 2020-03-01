import React, { Component } from 'react';

import TruthTableBuilder from './truth-table-builder/TruthTableBuilderContainer';

class Solver extends Component {
  render() {
    return (
      <div>
        <TruthTableBuilder />
      </div>
    );
  }
}

export default Solver;
