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
            {outArray[0]
              .slice(1, outArray[0].length - 1)
              .split('|')
              .map((item, i) =>
                <th key={i}>{item.replace(/&#124;/g, '|')}</th>
              )
            }
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
        {rowArray
          .slice(1, rowArray.length - 1)
          .split('|')
          .map((item, j) =>
            <td key={j}>{item}</td>
          )
        }
      </tr>
    );
  }

  makeLegend() {
    return (
      <Table striped border>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>~</td>
            <td>Negation</td>
            <td>~P ("not P")</td>
          </tr>
          <tr>
            <td>&amp;</td>
            <td>Conjunction</td>
            <td>P &amp; Q ("P and Q")</td>
          </tr>
          <tr>
            <td>||</td>
            <td>Disjunction</td>
            <td>P || Q ("P or Q")</td>
          </tr>
          <tr>
            <td>-></td>
            <td>Implication</td>
            <td>P -> Q ("If P, then Q")</td>
          </tr>
          <tr>
            <td>&lt;-&gt;</td>
            <td>Equivalence</td>
            <td>P &lt;-&gt; Q ("P if and only if Q")</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  render() {
    console.log("out is " + this.state.out);
    return (
      <div className="box">
        <h2>Truth Table Builder</h2>
        <h3>Legend</h3>
        {this.makeLegend()}
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