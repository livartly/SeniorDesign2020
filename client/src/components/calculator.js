import React from 'react';
import Statement from '../engine/statement.js';

import Table from 'react-bootstrap/Table';

class Calculator extends React.Component {
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
    this.setState({ out: statement.table() });
  }

  makeTable(outMarkdownString) {
    if (outMarkdownString === "") return;
    let outArray = outMarkdownString.split('\n');
    return (
      <Table striped bordered>
        <thead>
          <tr>
            {outArray[0].slice(1, outArray[0].length - 1).split('|').map((item, i) => <th key={i}>{item.replace(/&#124;/g, '|')}</th>)}
          </tr>
        </thead>
        <tbody>
          {outArray.slice(2).map((item, i) => (this.makeRow(item, i)))}
        </tbody>
      </Table>
    );
  }

  makeRow(rowArray, i) {
    return (
      <tr key={i}>
        {rowArray.slice(1, rowArray.length - 1).split('|').map((item, j) => <td key={j}>{item}</td>)}
      </tr>
    );
  }

  makeLegend() {
    return (
      <Table striped border>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>

        </tbody>
      </Table>
    );
  }

  render() {
    console.log("out is " + this.state.out);
    return (
      <div className="box">
        <h3>Truth Table Builder</h3>
        <p>Type a wff in the box</p>
        <textarea value={this.state.wff} onChange={this.updateWff}></textarea>
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        {this.makeTable(this.state.out)}
      </div>
    );
  }
}

export default Calculator;