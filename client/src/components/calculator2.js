import React from 'react';

class Calculator2 extends React.Component {
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

  render() {
    return (
      <div className="box">
        <h3>Recursive Sequence Builder</h3>
        <p>Enter a few base cases and a recurrence relation</p>
        <button>+</button><button>-</button>

      </div>
    );
  }
}

export default Calculator2;