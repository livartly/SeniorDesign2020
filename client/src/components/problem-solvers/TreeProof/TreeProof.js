import React from 'react';
import Statement from '../engine/statement.js';




class TreeProof extends React.Component {
  constructor(props) {
    super(props);
    window.Statement = Statement;
    this.state = {
      wff: "",
      out: ""
    };
    this.updateWff = this.updateWff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateWff(e) {
    this.setState({ wff: e.currentTarget.value });
  }

  handleClick(e) {
    e.preventDefault();
    let statement = new Statement(this.state.wff);
    console.log(statement.table());
    this.setState({ out: statement.table().replace(/&#124;/g, '|') });
  }

  render() {
    let output = this.state.out.split('\n').map((item, i) => {
      return <p key={i}>{item}</p>;
    });
    return (
      <div className="box">
        <h3>Proof Validation</h3>
        <p>Type a wff in the box</p>
        <textarea value={this.state.wff} onChange={this.updateWff}></textarea>
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        {output}
      </div>
    );
  }
}

export default TreeProof;