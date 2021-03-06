import React from 'react';
import Statement from '../../../engine/statement.js';
import { Link } from 'react-router-dom';

import { Table, Form, Row, Col, Card } from 'react-bootstrap';

import Legend from './Legend.js';

import { sendProblem } from '../../../utils/problemsAPIUtil';

const EXAMPLE_INPUTS = [
  {
    wff: "(A -> B) <-> ~A  B"
  },
  {
    wff: "~(A & B) & (A  ~B) <-> ~B"
  },
  {
    wff: "a ∧ b ∨ c → d ∧ e"
  }
];

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
    this.setState({ wff: e.currentTarget.value });
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
    str = str.replace(/(\\neg|\\lnot)[{ ]?\}?/g, '¬');
    str = str.replace(/(\\vee|\\lor)[{ ]?\}?/g, '∨');
    str = str.replace(/(\\wedge|\\land)[{ ]?\}?/g, '∧');
    str = str.replace(/(\\to|\\rightarrow)[{ ]?\}?/g, '→');
    str = str.replace(/\\leftrightarrow[{ ]?\}?/g, '↔');
    return str;
  }

  convertBack(str) {
    str = str.replace(/∧/g, '&');
    str = str.replace(/↔/g, '<->');
    str = str.replace(/→/g, '->');
    str = str.replace(/¬/g, '~');
    str = str.replace(/∨/g, '||');
    return str;
  }

  applyExample(idx) {
    return () => {
      this.setState(EXAMPLE_INPUTS[idx]);
    };
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
          <Card>
            <Card.Body>
              <Form>
                <h1>Truth Table Builder</h1>
                <Form.Group controlId="truthTableBuilder.instructions">
                  <Form.Label><b>Instructions</b></Form.Label>
                  <p>
                    This site will take a well formed formula as input and construct
                    a truth table describing the input.
                  </p>
                </Form.Group>
                <Form.Group controlId="truthTableBuilder.usage">
                  <Form.Label><b>Usage</b></Form.Label>
                  <p>
                    Well Formed Formula - the expression to be evaluated. Valid
                    variables must be one capital or lowercase letter only.
                    Ensure that too many variables are not present in the input
                    or the site may hang.
                  </p>
                  <p>
                    The following legend lists all valid symbols that can be
                    used as operators in decreasing order of precedence.
                  </p>
                  <Legend /><br />
                </Form.Group>
                <Form.Group controlId="truthTableBuilder.examples">
                  <Form.Label>Examples</Form.Label>
                  <ul>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(0)}>
                        (A -> B) &lt;-&gt; ~A  B
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(1)}>
                        ~(A &amp; B) &amp; (A  ~B) &lt;-&gt; ~B
                      </a>
                    </li>
                    <li>
                      <a href="javascript:;" onClick={this.applyExample(2)}>
                        a ∧ b ∨ c → d ∧ e
                      </a>
                    </li>
                  </ul>
                </Form.Group>
                <Form.Group controlId="truthTableBuilder.textInput">
                  <Form.Label>Well Formed Formula</Form.Label>
                  <div id="symbolButtonRow">
                    <div id="symbolButtons">
                      <div
                        className="symbutton button formula"
                        onClick={this.insertAtKaret("¬")}
                      >¬</div>
                      <div
                        className="symbutton button formula"
                        onClick={this.insertAtKaret("∧")}
                      >∧</div>
                      <div
                        className="symbutton button formula"
                        onClick={this.insertAtKaret("∨")}
                      >∨</div>
                      <div
                        className="symbutton button formula"
                        onClick={this.insertAtKaret("→")}
                      >→</div>
                      <div
                        className="symbutton button formula"
                        onClick={this.insertAtKaret("↔")}
                      >↔</div>
                    </div>
                  </div>
                  <Row style={{ padding: 0 }}>
                    <Col md={10}>
                      <Form.Control
                        type="text"
                        value={this.state.wff}
                        onChange={this.updateWff}
                      />
                    </Col>
                    <Col md={2}>
                      <button onClick={this.handleClick}>Submit</button>
                    </Col>
                  </Row>
                  <span style={{ color: 'red' }}>
                    {this.state.error ? this.state.error : ""}
                  </span>
                </Form.Group>
                <Form.Group controlId="truthTableBuilder.cardOutput">
                  <Form.Label>Result</Form.Label>
                  <Card body style={{ minHeight: "300px" }}>
                    {this.makeTable(this.state.out)}
                  </Card>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default TruthTableBuilder;