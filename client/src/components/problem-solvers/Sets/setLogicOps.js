import React from 'react';
import {Link} from 'react-router-dom'

//********************************************//
//
// Begin code for Set class functions
//
//********************************************//
// Check if this set is a proper subset of otherSet
Set.prototype.properSubset = function (otherSet) {
  if (this.size >= otherSet.size)
      return false;
  else {
      for (var elem of this) {
          if (!otherSet.has(elem))
              return false;
      }
      return true;
  }
}

// Returns a union of this set and otherSet (combines all elements into one set)
Set.prototype.union = function (otherSet) {
  var unionSet = new Set();

  for (var elem of this) {
      unionSet.add(elem);
  }

  for (var elem of otherSet) {
      unionSet.add (elem);
  }

  return unionSet;
}

// Returns the intersection of this set and otherSet (logical &)
Set.prototype.intersection = function (otherSet) {
  var intersectionSet = new Set();

  for (var elem of otherSet) {
      if (this.has(elem))
          intersectionSet.add(elem);
  }

  return intersectionSet;
}

// Returns the SUBTRACTION of this set minus otherSet
Set.prototype.subtract = function (otherSet) {
  var differenceSet = new Set();

  for (var elem of this) {
      if (!otherSet.has(elem))
          differenceSet.add(elem);
  }
  
  return differenceSet;
}

// Returns the POWERSET of this set
Set.prototype.powerset = function () {
  
  // Function to get all subsets from an array
  const getAllSubsets = 
      theArray => theArray.reduce(
          (subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);

  // Convert iterator to array of values
  let e = Array.from(this.entries());
  let elementArray = [];    
  e.forEach(elem => elementArray.push(elem[0]));
  
  let pSet = getAllSubsets(elementArray);

  return pSet;
}

// Calculates CARTESIAN PRODUCT of this set with otherSet
Set.prototype.cartesianProduct = function (otherSet) {
  var product = [];

  for (var elem of this) {
      for (var ind of otherSet) {
          var s = [];
          s.push(elem);
          s.push(ind);
          product.push(s);
      }
  }

  return product;
}

String.prototype.isNumeric = function() {
  return !isNaN(parseFloat(this)) && isFinite(this);
}

Array.prototype.clean = function() {
  for(var i = 0; i < this.length; i++) {
      if(this[i] === "") {
          this.splice(i, 1);
      }
  }
  return this;
}

var isAlpha = function(ch){
  return typeof ch === "string" && ch.length === 1
         && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

//********************************************//
//
// Begin code for the /set-ops page
//
//********************************************//
class SetLogicOps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setStrings:{
        'A':"",
        'B':""
      },
      currletter: 'B',
      formula:"",
      out:"",
      maxInputs:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
    this.nextChar = this.nextChar.bind(this);
    this.convertStringToSet = this.convertStringToSet.bind(this);
    this.makeInputForm = this.makeInputForm.bind(this);
    this.showOutput = this.showOutput.bind(this);
    this.handleFormulaSubmit = this.handleFormulaSubmit.bind(this);
    this.updateFormula = this.updateFormula.bind(this);
    this.checkSyntax = this.checkSyntax.bind(this);
    this.insert = this.insert.bind(this);
    this.infixToPostfix = this.infixToPostfix.bind(this);
  }

  /**
   * Solves a token list in RPN
   *
   * @param   {Array} tokens - A list of tokens (single characters) in RPN
   * 
   * @param   {Array} setMap - A table of sets which are referred to 
   *
   * @returns {Set} - The resulting set
   */
  solveRPN(tokens, setMap) {
    var tokenStack = [];
    for (var token of tokens) {
      if (['*', '&', '|', '-'].includes(token)) {
        if (tokenStack.length < 2) {
          throw "Invalid RPN encountered: " + tokens;
        }
        var firstOperand = tokenStack.pop();
        var secondOperand = tokenStack.pop();
        if (typeof(firstOperand) === "string") {
          firstOperand = setMap.get(firstOperand);
        }
        if (typeof(secondOperand) === "string") {
          secondOperand = setMap.get(secondOperand);
        }
        if (token === "*") {
          tokenStack.push(firstOperand.cartesianProduct(secondOperand));
        }
        if (token === "&") {
          tokenStack.push(firstOperand.intersection(secondOperand));
        }
        if (token === "|") {
          tokenStack.push(firstOperand.union(secondOperand));
        }
        if (token === "-") {
          tokenStack.push(secondOperand.subtract(firstOperand));
        }
      } else {
        tokenStack.push(token);
      }
    }
    if (tokenStack.length === 1) {
      if (typeof(tokenStack[0]) === "string") return setMap[tokenStack[0]];
      return tokenStack[0];
    }
    console.log(tokenStack);
    throw "Invalid RPN encountered: " + tokens;
  }


  handleClick(e) {
    e.preventDefault();
    this.setState();
  }

  // Function to increment a character to next in the alphabet
  // inc MUST BE an int
  nextChar(c, inc) {
    return String.fromCharCode(c.charCodeAt(0) + inc);
  }

  // Converts a given string to a Set object
  convertStringToSet(str) {
    // First, remove all whitespace from string
    str = str.replace(/ /g, '');

    var parenthesesCount = 0;
    var startPos = -10;
    for (var i = 0; i < str.length; i++) {
      if (str[i] === '{') {
        parenthesesCount++;
        startPos = i;
      }
      if (str[i] === '}')
        parenthesesCount--;

      if (parenthesesCount === 0 && startPos >= 0) {
        let oldSubstring = str.substring(startPos, i + 1);
        let newSubstring = oldSubstring.replace(/,/g, '«');   // Temporarily replace commas inside {} with a random character nobody will use
        str = str.replace(oldSubstring, newSubstring);
        startPos = -10;
      }
    }

    // Split string at commas, send created array to Set constructor
    let splitArray = str.split(',');
    for (i = 0; i < splitArray.length; i++) {
      if (splitArray[i].length > 1)
        splitArray[i] = splitArray[i].replace(/«/g, ',');   // Swap temp character back to comma for readability
    }
    let s = new Set(splitArray);
    return s;
  }

  addBox() {
    if (Object.keys(this.state.setStrings).length < 10) {
      this.setState(prevState => {
        var nextSetStrs = {};
        for (var s in prevState.setStrings) {
          nextSetStrs[s] = prevState.setStrings[s];
        }
        
        var nextLetter = this.nextChar(prevState.currletter, 1);
        nextSetStrs[nextLetter] = "";
        return {setStrings:nextSetStrs, currletter:nextLetter};
      })
    }
    else
      this.setState({maxInputs:true});
  }

  removeBox() {
    
  }

  makeInputForm() {
    return Object.keys(this.state.setStrings).map((setStr, idx) => {
      return (
        <div key={idx}>
          {setStr} = 
          <input onChange={this.handleInput(setStr)}></input>
        </div>
      );
    });
  }

  // Handles input into set-input boxes
  handleInput(str) {
    return e => {
      var targetString = e.currentTarget.value;
      this.setState(prevState => {
        var nextSetStrs = {};
        for (var s in prevState.setStrings) {
          nextSetStrs[s] = prevState.setStrings[s];
        }
        
        nextSetStrs[str] = targetString;
        return {setStrings:nextSetStrs};
      })
    }
  }

  updateFormula(str) {
    // Store formula in State
    // TODO: Add buttons and in-line conversions for special operation characters
    return e => {
        this.setState({formula:e.currentTarget.value});
    }
  }

  insert(main_string, ins_string, pos) {
    if(typeof(pos) == "undefined") {
      pos = 0;
    }
    if(typeof(ins_string) == "undefined") {
     ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
  }


  handleFormulaSubmit() {
    let f = this.state.formula;
    let supportedOperations = new Set(['*', '&', '|', '-', '(', ')']);

    let m = new Map();

    // Get each set string and convert it to a matching Set
    let strings = Object.values(this.state.setStrings);
    let setKeys = Object.keys(this.state.setStrings);

    for (var i = 0; i < setKeys.length; i++)
      m.set(setKeys[i], this.convertStringToSet(strings[i]));

    // Remove whitespace, check for invalid characters
    // Supported operators: *(✕), &(∩), |(∪), -(Difference)
    f = f.replace(/ /g, "");
    let openParenthsesCount = 0;
    let closedParenthsesCount = 0;
    let evalFlag = false;
    let badToken = false;
    for (var i = 0; i < f.length; i++) {
        if (!supportedOperations.has(f[i]) && !m.get(f[i])) {
            console.log("Bad or Unknown Input: " + f[i]);
            badToken = true;
        }
        if (f[i] === '(')
          openParenthsesCount++;
        if (f[i] === ')')
          closedParenthsesCount++;
    }

    if (closedParenthsesCount < openParenthsesCount)
      console.log("Missing ')'");
    else if (openParenthsesCount < closedParenthsesCount)
      console.log("Missing '('");

    if (!badToken && closedParenthsesCount === openParenthsesCount)
      evalFlag = true;

    if (evalFlag) {
      // Valid syntax, evaluate input
      if (this.checkSyntax(f)) {
        let rpnArray = this.infixToPostfix(f);
        this.setState({out:this.solveRPN(rpnArray, m)});
      }
    }
  }
  
  checkSyntax(f) {
    var isAlpha = function(ch) {
      return /^[A-Z]$/i.test(ch);
    }
    var parenthses = new Set(['(', ')']);

    for (var i = 0; i < f.length; i++) {
      // Can't have 2 sets next to eachother without an operation
      if (isAlpha(f[i]) && isAlpha(f[i + 1])) {
        console.log("Invalid Syntax: \"" + f[i] + f[i + 1] + "\"");
        return false;
        break;
      }
      // Check for parentheses syntax
      else if (f[i] === '(' && (f[i + 1] != '(' && !isAlpha(f[i + 1]))) {
        console.log("Invalid Syntax: \"" + f[i] + f[i + 1] + "\"");
        return false;
        break;
      }
      else if (f[i] === ')' && (f[i + 1] != ')' && isAlpha(f[i + 1]))) {
        console.log("Invalid Syntax: \"" + f[i] + f[i + 1] + "\"");
        return false;
        break;
      }
      // Check operator syntax
      else if (!parenthses.has(f[i]) && !isAlpha(f[i]) && !parenthses.has(f[i + 1]) && !isAlpha(f[i + 1])) {
        console.log("Invalid Syntax: \"" + f[i] + f[i + 1] + "\"");
        return false;
        break;
      }
    }

    return true;
  }

infixToPostfix(infix) {
  var outputQueue = "";
  var operatorStack = [];
  var operators = {
      "|": {
          precedence: 2,
          associativity: "Left"
      },
      "*": {
          precedence: 2,
          associativity: "Left"
      },
      "&": {
          precedence: 2,
          associativity: "Left"
      },
      "-": {
          precedence: 2,
          associativity: "Left"
      }
  }
  infix = infix.replace(/\s+/g, "");
  infix = infix.split(/([\&\-\*\|\(\)])/).clean();
  for(var i = 0; i < infix.length; i++) {
      var token = infix[i];
      if(isAlpha(token)) {
          outputQueue += token + " ";
      } else if("|*&-".indexOf(token) !== -1) {
          var o1 = token;
          var o2 = operatorStack[operatorStack.length - 1];
          while("|*&-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
              outputQueue += operatorStack.pop() + " ";
              o2 = operatorStack[operatorStack.length - 1];
          }
          operatorStack.push(o1);
      } else if(token === "(") {
          operatorStack.push(token);
      } else if(token === ")") {
          while(operatorStack[operatorStack.length - 1] !== "(") {
              outputQueue += operatorStack.pop() + " ";
          }
          operatorStack.pop();
      }
  }
  while(operatorStack.length > 0) {
      outputQueue += operatorStack.pop() + " ";
  }
  outputQueue = outputQueue.replace(/\s/g,'');
  let outputArray = Array.from(outputQueue);
  //return outputQueue;
  return outputArray;
}

  
  showOutput() {
    if (this.state.out === "") return;
    return (
      <div>
        <p>{this.state.out}</p>
      </div>
    );
  }

  // Draw page
  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
            <p><b>Set Logic Calculator</b></p>
            <p>Enter the contents of the sets, separated by commas.</p>
            {this.makeInputForm()}
            <button onClick={this.addBox} disabled={this.state.maxInputs}>+</button>

            <p>Enter Formula: </p><input onChange={this.updateFormula()}></input> <button onClick={this.handleFormulaSubmit}>Submit</button>


            {this.showOutput()}
    </div>
            {/* Footer */}
            <footer>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                <button type="button">Contact</button>
                </Link>
              </div>

              <div className= "tweleve columns">
              <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
              </p>
              </div>
            </div>
            </div>
          </footer>
    </div>

    );
  }
}

export default SetLogicOps;