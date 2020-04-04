import React from 'react';
import { Link } from 'react-router-dom'
import { Array } from '../../../engine/TreeProof/array.js';
import { Formula, AtomicFormula, QuantifiedFormula, BinaryFormula, ModalFormula, NegatedFormula } from '../../../engine/TreeProof/formula.js';
import { ModelFinder, Model } from '../../../engine/TreeProof/modelfinder.js';
import { Painter, TreePainter } from '../../../engine/TreeProof/painter.js';
import { Parser } from '../../../engine/TreeProof/parser.js';
import { Prover, Tree, Branch, Node } from '../../../engine/TreeProof/prover.js';
import { SenTree } from '../../../engine/TreeProof/sentree.js';
import { Table, Form, Row, Col, Card } from 'react-bootstrap';
//import Statement from '../engine/statement.js';




class TreeProof extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      error: null
    };
    this.insertAtKaret = this.insertAtKaret.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startProof = this.startProof.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    //this.setState();
    //console.log("Yeet");
    this.startProof();
  }

  startProof() {
    var prover = null;
    var input = this.state.inputText;
    var parser = new Parser();
    try {
      var parsedInput = parser.parseInput(input);
      var premises = parsedInput[0];
      var conclusion = parsedInput[1];
      var initFormulas = premises.concat([conclusion.negate()]);
    }
    catch (e) {
      alert(e);
      return false;
    }
    document.getElementById("model").style.display = "none";
    document.getElementById("rootAnchor").style.display = "none";
    //document.getElementById("backtostartpage").style.display = "block";
    //document.getElementById("status").style.display = "block";
    //document.getElementById("status").innerHTML = "something went wrong: please email wo@umsu.de and tell me what you did";

    // Now a free-variable tableau is created. When the proof is finished,
    // prover.finished() is called.
    var accessibilityConstraints = [];

    prover = new Prover(initFormulas, parser, accessibilityConstraints);
    prover.onfinished = function (treeClosed) {
      // The prover has finished. Show result:
      var conclusionSpan = "<span class='formula'>" + conclusion + "</span>";
      if (initFormulas.length == 1) {
        var summary = conclusionSpan + " is " + (treeClosed ? "valid." : "invalid.");
      }
      else {
        var summary = premises.map(function (f) {
          return "<span class='formula'>" + f + "</span>";
        }).join(', ') + (treeClosed ? " entails " : " does not entail ") + conclusionSpan + ".";
      }
      // Translate the free-variable tableau into a sentence tableau:
      var sentree = new SenTree(this.tree, parser);
      if (!treeClosed) {
        // Tree is open. Display a countermodel if one is known:
        // if (!this.counterModel) this.counterModel = sentree.getCounterModel();
        if (this.counterModel) {
          document.getElementById("model").style.display = "block";
          document.getElementById("model").innerHTML = "<b>Countermodel:</b><br>" +
            this.counterModel.toHTML();
        }
        return;
      }
      if (parser.isModal) {
        sentree.modalize();
      }
      // Start painting the tree:
      document.getElementById("rootAnchor").style.display = "block";
      window.self.painter = new TreePainter(sentree, document.getElementById("rootAnchor"));
      window.self.painter.paintTree();
    }
    setTimeout(function () {
      prover.start();
    }, 1);
    return false;
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

  insertAtKaret(sym) {
    return () => {
      this.setState((prevState) => ({
        inputText: prevState.inputText + sym
      }));
    }
  }

  updateInput(e) {
    this.setState({ inputText: this.renderSymbols(e.currentTarget.value) });
  }

  render() {
    return (
      <div>

        <div className="container" style={{ marginTop: "50px" }}>
          <Form>
            <h1>Propositional Logic</h1>
            <Form.Group controlId="truthTableBuilder.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>
                Enter a formula of standard propositional, predicate, or modal logic. To enter logic symbols, use the buttons above the text field, or
                  type in formula. The page will try to find either a countermodel or
              a <a href="https://en.wikipedia.org/wiki/Method_of_analytic_tableau">tree
              proof (a.k.a. semantic tableau)</a>. Any alphabetic character is allowed as a propositional constant, predicate,
              individual constant, or variable. The character may be followed by digits as
              indices. Predicates and function terms must be in prefix notation. The order of precedence among
            connectives is <span class="formula">¬, ∧, ∨, →, ↔</span>. Association is to
                the right.
            </p>
            </Form.Group>
            <Form.Group controlId="truthTableBuilder.textInput">
              <Form.Label>Insert Symbols</Form.Label>
              <span class="formula">~</span> for <span class="formula">¬</span>,
              <span class="formula">&</span> for <span class="formula">∧</span>,
              <span class="formula">v</span> for <span class="formula">∨</span>,
              <span class="formula">-&gt;</span> for <span class="formula">→</span>,
              <span class="formula">&lt;-&gt;</span> for <span class="formula">↔</span>,
            <form id="inputForm" action="." method="get" onsubmit="return false">
                <div id="symbolButtonRow">
                  <span class="hideOnTablet"></span>
                  <div id="symbolButtons">
                    <div class="symbutton button formula" onClick={this.insertAtKaret("¬")}>¬</div>
                    <div class="symbutton button formula" onClick={this.insertAtKaret("∧")}>∧</div>
                    <div class="symbutton button formula" onClick={this.insertAtKaret("∨")}>∨</div>
                    <div class="symbutton button formula" onClick={this.insertAtKaret("→")}>→</div>
                    <div class="symbutton button formula" onClick={this.insertAtKaret("↔")}>↔</div>
                  </div>
                </div>
                <div id="proveRow">
                  <input
                    type="text"
                    size="60"
                    name="flaField"
                    id="flaField"
                    class="formula"
                    onChange={this.updateInput}
                    value={this.state.inputText}>
                  </input>
                  <input value="Submit" id="proveButton" class="button" onClick={this.handleClick}></input>
                </div>
              </form>
            </Form.Group>
            <Form.Group controlId="truthTableBuilder.cardOutput">
              <Form.Label>Result</Form.Label>
            {/* For the output: */}
            <Card>
              <div id="model"> </div>
              <div id="rootAnchor"> </div>
            </Card>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default TreeProof;