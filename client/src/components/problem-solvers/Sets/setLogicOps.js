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
      out:""
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
    this.evalChild = this.evalChild.bind(this);
    this.checkSyntax = this.checkSyntax.bind(this);
    this.insert = this.insert.bind(this);
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

  removeBox() {
    this.setState(prevState => {
      var nextSetStrs = {};
      for (var s in prevState.setStrings) {
        nextSetStrs[s] = prevState.setStrings[s];
      }
      
      var nextLetter = this.nextChar(prevState.currletter, -1);
      nextSetStrs[nextLetter] = "";
      return {setStrings:nextSetStrs, currletter:nextLetter};
    })
  }

  makeInputForm() {
    return Object.keys(this.state.setStrings).map((setStr, idx) => {
      return (
        <div key={idx}>
          {setStr} = 
          <input onChange={this.handleInput(setStr)}></input><button onClick={this.removeBox}>-</button>
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
    let supportedOperations = new Set(['X', '&', '|', '-', '(', ')']);

    let m = new Map();

    // Get each set string and convert it to a matching Set
    let strings = Object.values(this.state.setStrings);
    let setKeys = Object.keys(this.state.setStrings);

    for (var i = 0; i < setKeys.length; i++)
      m.set(setKeys[i], this.convertStringToSet(strings[i]));

    // Remove whitespace, check for invalid characters
    // Supported operators: X(✕), &(∩), |(∪), -(Difference)
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
      // Evaluate expression and set output
      var index = [0];          // Pass-by-Reference array index for iterating through f
      
      // Valid syntax, evaluate input
      if (this.checkSyntax(f)) {
        for (; index[0] < f.length; index[0]++) {
          if (m.has(f[index[0]])) {
            if ((index[0] + 2) < f.length && m.has(f[index[0] + 2])) {
              let lhs = m.get(f[index[0]]);
              index[0] = index[0] + 2;
              let rhs = m.get((f[index[0]]));
              
              // Get operation
              let sol = new Set();
              if (f[index[0] - 1] === '&')
                sol = lhs.intersection(rhs);
              else if (f[index[0] - 1] === '|')
                sol = lhs.union(rhs);
              else if (f[index[0] - 1] === 'X')
                sol = lhs.cartesianProduct(rhs);
              else if (f[index[0] - 1] === '-')
                sol = lhs.subtract(rhs);

              m.set('?', sol);
              f = this.insert(f, "?", index[0] + 1);
            }
          }
        }
        console.log(m.get('?'));
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
  
  // Evaluates parenthses in formula
  // Will update current index of f
  evalChild(f, index) {
    var startIdx = index[0];
    index[0]++;
    for (; index[0] < f.length; index[0]++) {
      if (f[index[0]] === '(')
        this.evalChild(f, index);
      
      // End of substring
      if (f[index[0]] === ')') {
        let substr = f.substring(startIdx, index[0] + 1);
        console.log("SUB: " + substr);
        return substr;
      }
    }
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
      <div className="container main">
      <div className="row">
        <div className= "tweleve columns">
          <div className="center">
            <p><b>Set Logic Calculator</b></p>
            <p>Enter the contents of the sets, separated by commas.</p>
            {this.makeInputForm()}
            <button onClick={this.addBox}>+</button>

            <p>Enter Formula: </p><input onChange={this.updateFormula()}></input> <button onClick={this.handleFormulaSubmit}>Submit</button>
          </div>
        </div>
      </div>
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