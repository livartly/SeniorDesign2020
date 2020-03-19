import React from 'react';
import Statement from '../../../engine/statement.js';

import Table from 'react-bootstrap/Table';

import Legend from './Legend.js';

import { sendProblem } from '../../../utils/problemsAPIUtil';

class TruthTableBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wff: "",
      out: "",
      error: null
    };
    this.updateWff = this.updateWff.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.insertAtKaret = this.insertAtKaret.bind(this);
  }

  updateWff(e) {
    this.setState({ wff: this.renderSymbols(e.currentTarget.value) });
  }

  handleClick(e) {
    e.preventDefault();
    try {
      let statement = new Statement(this.convertBack(this.state.wff));

      // This will occur asynchronously (not blocking)
      sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 1,
        input: {
          wff: this.state.wff
        }
      });

      this.setState({ out: statement.table(), error: null });
    }
    catch (err) {
      this.setState({ error: err.message });
    }

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

  insertAtKaret(sym) {
    return () => {
      this.setState((prevState) => ({
        wff: prevState.wff + sym
      }));
    };
  }

  renderSymbols(str) {
    str = str.replace('&', '∧');
    str = str.replace('^', '∧');
    str = str.replace('<->', '↔');
    str = str.replace('->', '→');
    str = str.replace('~', '¬');
    str = str.replace(' v ', ' ∨ '); // 'v' letter => or symbol
    str = str.replace(/(\\neg|\\lnot)[\{ ]?\}?/g, '¬');
    str = str.replace(/(\\vee|\\lor)[\{ ]?\}?/g, '∨');
    str = str.replace(/(\\wedge|\\land)[\{ ]?\}?/g, '∧');
    str = str.replace(/(\\to|\\rightarrow)[\{ ]?\}?/g, '→');
    str = str.replace(/\\leftrightarrow[\{ ]?\}?/g, '↔');
    return str;
  }

  convertBack(str) {
    str = str.replace('∧', '&');
    str = str.replace('↔', '<->');
    str = str.replace('→', '->');
    str = str.replace('¬', '~');
    str = str.replace('∨', '||');
    return str;
  }

  render() {
    return (
      <div className="box">
        <p>Truth Table Builder</p>
        <Legend />
        <p>Type a wff in the box</p>
        <span>{this.state.error ? this.state.error : ""}</span>
        <br />
        <div id="symbolButtonRow">
          insert <span class="hideOnTablet">symbol:</span>
          <div id="symbolButtons">
            <div class="symbutton button formula" onClick={this.insertAtKaret("¬")}>¬</div>
            <div class="symbutton button formula" onClick={this.insertAtKaret("∧")}>∧</div>
            <div class="symbutton button formula" onClick={this.insertAtKaret("∨")}>∨</div>
            <div class="symbutton button formula" onClick={this.insertAtKaret("→")}>→</div>
            <div class="symbutton button formula" onClick={this.insertAtKaret("↔")}>↔</div>
          </div>
        </div>
        <textarea value={this.state.wff} onChange={this.updateWff}></textarea>
        <br />
        <button onClick={this.handleClick}>Submit</button>
        <br />
        {this.makeTable(this.state.out)}
      </div>
    );
  }
}

export default TruthTableBuilder;