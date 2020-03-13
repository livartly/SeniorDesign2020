import React from 'react';
import Statement from '../../../engine/statement.js';

import Table from 'react-bootstrap/Table';

//import sortLegend from './sortLegend.js/index.js';

class topologicalSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wff: "",
      out: "",
      error: null
    };
    this.updateWff = this.updateWff.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateWff(e) {
    this.setState({ wff: e.currentTarget.value });
  }

  handleClick(e) {
    e.preventDefault();
    try {
      let statement = new Statement(this.state.wff);

      this.props.sendProblem({
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

  render() {
    return (
      <div>
        <div className="container main">
          <h1>Hello!</h1>
          </div>
        </div>
    );
  }
}

export default topologicalSort;