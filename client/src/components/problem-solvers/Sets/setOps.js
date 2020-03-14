import React from 'react';
import Solver from '../../../engine/Sets/setOpsSolver.js';

class SetOps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.updateWff = this.updateWff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateWff(e) {
    this.setState({});
  }

  handleClick(e) {
    e.preventDefault();
    this.setState();
  }

  /* ON CLICK: Remove all whitespace from the input
  *             Split the string at commas
  *             This returns an array to be passed into Set constructor
  */
  render() {
    return (
      <div className="box">
        <h3>Set Operations Solver</h3>
        <p>Enter a set</p>
        <button>+</button><button>-</button>

      </div>
    );
  }
}

export default SetOps;