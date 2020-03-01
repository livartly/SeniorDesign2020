import React from 'react';
import {Array} from '../../../engine/TreeProof/array.js';
import {Formula, AtomicFormula, QuantifiedFormula, BinaryFormula, ModalFormula, NegatedFormula} from '../../../engine/TreeProof/formula.js';
import {ModelFinder, Model} from '../../../engine/TreeProof/modelfinder.js';
import {Painter} from '../../../engine/TreeProof/painter.js';
import {Parser} from '../../../engine/TreeProof/parser.js';
import {Prover, Tree, Branch, Node} from '../../../engine/TreeProof/prover.js';
import {SenTree} from '../../../engine/TreeProof/sentree.js';
//import Statement from '../engine/statement.js';




class TreeProof extends React.Component {
  constructor(props) {
    super(props);
    //window.Statement = Statement;
    this.state = {
      //wff: "",
      //out: ""
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
      <div id = "Main">
        <div id="titlebar">
          <h2 id="title"><a id="titlelink" href=".">Tree Proof Generator</a></h2>
          <a id="githublink" class="hideOnPhone" href="https://www.github.com/wo/tpg/commits/master"></a>
        </div>

        <form id="inputForm" action="." method="get" onsubmit="return false">
          <div id="symbolButtonRow">
            insert <span class="hideOnTablet">symbol:</span>
              <div id="symbolButtons">
                <div class="symbutton button formula">¬</div><div class="symbutton button formula">∧</div><div class="symbutton button formula">∨</div><div class="symbutton button formula">→</div><div class="symbutton button formula">↔</div><div class="symbutton button formula">∀</div><div class="symbutton button formula">∃</div><div class="symbutton button formula">□</div><div class="symbutton button formula">◇</div>
              </div>
          </div>
          <div id="proveRow">
            <input type="text" size="60" name="flaField" id="flaField" class="formula"></input>
            <input type="submit" value="Run" id="proveButton" class="button"></input>
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
          
          <h3>Source code</h3>

          <p>The source is <a href="https://www.github.com/wo/tpg">on github</a>.</p>
          
          <h3>Contact</h3>

          <p>Comments, bug reports and suggestions are always welcome: 
            <script language="javascript">
              document.write(("<a href='mailto:wo%umsu.de'>wo%umsu.de</a>.").replace(/%/g, '@'));
            </script>
          </p>

        </div>
      //</div>
    );
  }
}

export default TreeProof;