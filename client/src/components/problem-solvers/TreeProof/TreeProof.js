import React from 'react';
import {Array} from '../../../engine/TreeProof/array.js';
import {Formula, AtomicFormula, QuantifiedFormula, BinaryFormula, ModalFormula, NegatedFormula} from '../../../engine/TreeProof/formula.js';
import {ModelFinder, Model} from '../../../engine/TreeProof/modelfinder.js';
import {Painter, TreePainter} from '../../../engine/TreeProof/painter.js';
import {Parser} from '../../../engine/TreeProof/parser.js';
import {Prover, Tree, Branch, Node} from '../../../engine/TreeProof/prover.js';
import {SenTree} from '../../../engine/TreeProof/sentree.js';
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
    document.getElementById("intro").style.display = "none";
    document.getElementById("model").style.display = "none";
    document.getElementById("rootAnchor").style.display = "none";
    //document.getElementById("backtostartpage").style.display = "block";
    //document.getElementById("status").style.display = "block";
    //document.getElementById("status").innerHTML = "something went wrong: please email wo@umsu.de and tell me what you did";
    
    // Now a free-variable tableau is created. When the proof is finished,
    // prover.finished() is called.
    var accessibilityConstraints = [];

    prover = new Prover(initFormulas, parser, accessibilityConstraints);
    prover.onfinished = function(treeClosed) {
        // The prover has finished. Show result:
        var conclusionSpan = "<span class='formula'>"+conclusion+"</span>";
        if (initFormulas.length == 1) {
            var summary = conclusionSpan + " is " + (treeClosed ? "valid." : "invalid.");
        }
        else {
            var summary = premises.map(function(f){
                return "<span class='formula'>"+f+"</span>";
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
    setTimeout(function(){
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
    str = str.replace('[]', '□');
    str = str.replace('<>', '◇');
    str = str.replace(/\(A([s-z])\)/, '∀$1'); // (Ax) => ∀x
    str = str.replace(/\(E([s-z])\)/, '∃$1'); // (Ex) => ∃x
    str = str.replace(/(?:^|\W)\(([s-z])\)/, '∀$1'); // (x) => ∀x, but not f(x) => f∀x
    str = str.replace(/\\forall[\{ ]?\}?/g, '∀');
    str = str.replace(/\\exists[\{ ]?\}?/g, '∃');
    str = str.replace(/(\\neg|\\lnot)[\{ ]?\}?/g, '¬');
    str = str.replace(/(\\vee|\\lor)[\{ ]?\}?/g, '∨');
    str = str.replace(/(\\wedge|\\land)[\{ ]?\}?/g, '∧');
    str = str.replace(/(\\to|\\rightarrow)[\{ ]?\}?/g, '→');
    str = str.replace(/\\leftrightarrow[\{ ]?\}?/g, '↔');
    str = str.replace(/\\[Bb]ox[\{ ]?\}?/g, '□');
    str = str.replace(/\\[Dd]iamond[\{ ]?\}?/g, '◇');
    return str;
  }

  insertAtKaret(sym) {
    return () => {
      this.setState( (prevState) => ({
        inputText: prevState.inputText + sym
      }));
    }
  }

  updateInput(e) {
    this.setState({inputText: this.renderSymbols(e.currentTarget.value)});
  }

  render() {
    return (
      <div id = "Main">
        <div id="titlebar">
          <h2 id="title"><a id="titlelink" href=".">Tree Proof Generator</a></h2>
        </div>

        <form id="inputForm" action="." method="get" onsubmit="return false">
          <div id="symbolButtonRow">
            insert <span class="hideOnTablet">symbol:</span>
              <div id="symbolButtons">
                <div class="symbutton button formula" onClick={this.insertAtKaret("¬")}>¬</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("∧")}>∧</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("∨")}>∨</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("→")}>→</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("↔")}>↔</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("∀")}>∀</div>
                <div class="symbutton button formula" onClick={this.insertAtKaret("∃")}>∃</div>
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
            <input value="Run" id="proveButton" class="button" onClick={this.handleClick}></input>
          </div>
        </form>
      

        <div id="intro">
          <noscript><p><b>Enable JavaScript to use this page!.</b></p></noscript>
              
          <p>Enter a formula of standard propositional, predicate, or modal logic. The
            page will try to find either a countermodel or
            a <a href="https://en.wikipedia.org/wiki/Method_of_analytic_tableau">tree
            proof (a.k.a. semantic tableau)</a>. </p>

          <p>Examples (click!):</p>
          <ul id="exampleList">
            <li class="formula"><a href="#(p∨(q∧r))→((p∨q)∧(p∨r))">(p∨(q∧r))→((p∨q)∧(p∨r))</a></li>
            <li class="formula"><a href="#((A→B)→A)→A">((A→B)→A)→A</a></li>
            <li class="formula"><a href="#∃y∀x(Fy→Fx)">∃y∀x(Fy→Fx)</a></li>
            <li class="formula"><a href="#∃y∃z∀x((Fx→Gy)∧(Gz→Fx)) → ∀x∃y(Fx↔Gy)">∃y∃z∀x((Fx→Gy)∧(Gz→Fx)) → ∀x∃y(Fx↔Gy)</a></li>
            <li class="formula"><a href="#N(0) ∧ ∀i(N(i)→N(s(i))) → N(s(s(s(0))))">N(0) ∧ ∀i(N(i)→N(s(i))) → N(s(s(s(0))))</a></li>
            <li class="formula"><a href="#∀y∃xFxy → ∃x∀yFxy">∀y∃xFxy → ∃x∀yFxy</a></li>
            <li class="formula"><a href="#□(p→q)→□p→□q">□(p→q)→□p→□q</a></li>
            <li class="formula"><a href="#∀x□Fx→□∀xFx">∀x□Fx→□∀xFx</a></li>
            <li class="formula"><a href="#p∨q, ¬p |= q">p∨q, ¬p |= q</a></li>
          </ul>

         </div> <h3>Entering formulas</h3>
          
          <p>To enter logic symbols, use the buttons above the text field, or
            type
            <span class="formula">~</span> for <span class="formula">¬</span>,
            <span class="formula">&</span> for <span class="formula">∧</span>,
            <span class="formula">v</span> for <span class="formula">∨</span>,
            <span class="formula">-&gt;</span> for <span class="formula">→</span>,
            <span class="formula">&lt;-&gt;</span> for <span class="formula">↔</span>,
            <span class="formula">(Ax)</span> for <span class="formula">∀x</span>,
            <span class="formula">(Ex)</span> for <span class="formula">∃x</span>,
            <span class="formula">[]</span> for <span class="formula">□</span>,
            <span class="formula"></span> for <span class="formula">◇</span>. You can
            also use LaTeX commands.</p>

          <h3>Premises</h3>

          <p>If you want to test an argument with premises and conclusion,
          use <span class="formula">|=</span> to separate the premises from the
          conclusion, and use commas to separate the premises. See the last example in
          the list above.</p>
          
          <h3>Syntax of formulas</h3>
          
          <p>Any alphabetic character is allowed as a propositional constant, predicate,
            individual constant, or variable. The character may be followed by digits as
            indices. Predicates and function terms must be in prefix notation. Function
            terms must have their arguments enclosed in brackets. So
            <span class="formula">F2x17</span>, <span class="formula">Rab</span>,
            <span class="formula">R(a,b)</span>, <span class="formula">Raf(b)</span>,
            <span class="formula">F(+(a,b))</span> are ok, but
            not <span class="formula">Animal(Fred)</span>, <span class="formula">aRb</span>,
            or <span class="formula">F(a+b)</span>. (In fact, these are also ok, but
            they won't be parsed as you might expect.) The order of precedence among
            connectives is <span class="formula">¬, ∧, ∨, →, ↔</span>. Association is to
            the right. Quantifier symbols in sequences of quantifiers must not be
            omitted: write <span class="formula">∀x∀yRxy</span> instead
            of <span class="formula">∀xyRxy</span>.</p>

          <h3>Supported logics</h3>

          <p>Besides classical propositional logic and first-order predicate logic (with
            functions, but without identity), a few normal modal logics are supported. If
            you enter a modal formula, you will see a choice of how the accessibility
            relation should be constrained. For modal predicate logic, constant domains
            and rigid terms are assumed.</p>

          <div id="model"> </div>
          <div id="rootAnchor"> </div>
        </div>
      //</div>
    );
  }
}

export default TreeProof;