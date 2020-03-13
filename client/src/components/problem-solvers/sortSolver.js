import React, { Component } from 'react';

import TopologicalSort from './topological-sort/TopologicalSortContainer';
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
