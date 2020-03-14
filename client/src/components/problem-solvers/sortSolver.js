import React, { Component } from 'react';

import TopologicalSort from './topological-sort/topologicalSortContainer.js';
class sortSolver extends Component {
  render() {
    return (
      <div>
        <TopologicalSort />
      </div>
    );
  }
}

export default sortSolver;
