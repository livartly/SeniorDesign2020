import React, { Component } from 'react';

import topologicalSort from './topological-sort/topologicalSortContainer';
class sortSolver extends Component {
  render() {
    return (
      <div>
        <topologicalSort />
      </div>
    );
  }
}

export default sortSolver;
