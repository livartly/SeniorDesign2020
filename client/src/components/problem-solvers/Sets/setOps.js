import React from 'react';
//import Solver from '../../../engine/Sets/Set.js';

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
class SetOps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setStrings:{
        'A':"",
        'B':""
      },
      currletter: 'B',
      out:""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubsetASubmit = this.handleSubsetASubmit.bind(this);
    this.handleSubsetBSubmit = this.handleSubsetBSubmit.bind(this);
    this.handlePowersetSubmit = this.handlePowersetSubmit.bind(this);
    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
    this.nextChar = this.nextChar.bind(this);
    this.convertStringToSet = this.convertStringToSet.bind(this);
    this.makeInputForm = this.makeInputForm.bind(this);
    this.showOutput = this.showOutput.bind(this);
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

    // Split string at commas, send created array to Set constructor
    let s = new Set(str.split(','));
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
          <input onChange={this.handleInput(setStr)}></input><button onClick={this.handlePowersetSubmit(setStr)}>𝓟</button>
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

  handleSubsetASubmit() {
    // Map to store sets and associated letters
    let m = new Map();

    // Get each set string and convert it to a matching Set
    let strings = Object.values(this.state.setStrings);
    let setKeys = Object.keys(this.state.setStrings);
    for (var i = 0; i < setKeys.length; i++)
      m.set(setKeys[i], this.convertStringToSet(strings[i]));

    let output = (m.get('A').properSubset(m.get('B')));
    this.setState({out:output.toString()});
  }

  handleSubsetBSubmit() {
    // Map to store sets and associated letters
    let m = new Map();

    // Get each set string and convert it to a matching Set
    let strings = Object.values(this.state.setStrings);
    let setKeys = Object.keys(this.state.setStrings);
    for (var i = 0; i < setKeys.length; i++)
      m.set(setKeys[i], this.convertStringToSet(strings[i]));

    let output = (m.get('B').properSubset(m.get('A')));
    this.setState({out:output.toString()});
  }

  handlePowersetSubmit(idx) {
    return () => {
      let s = this.convertStringToSet(this.state.setStrings[idx]);
      this.setState({out:s.powerset().toString()})
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
      <div className="box">
        <h3>Subset Calculator</h3>
        <p>Subset Calculator</p>
        <p>Please enter the contents of each set, separated by commas.</p>
        <p>Enter sets to determine subset or powerset:</p>
        {
          this.makeInputForm()
        }
        <button onClick={this.handleSubsetASubmit}>A ⊆ B?</button><button onClick={this.handleSubsetBSubmit}>B ⊆ A?</button>
        {this.showOutput()}

        <h3>Set Logic Calculator</h3>
        <p>Set Logic Calculator</p>
        <p>Enter the contents of the sets, separated by commas.</p>
      </div>
    );
  }
}

export default SetOps;


/* To solve set logic equations:
* - Remove all whitespace from equation string
* - Check for invalid characters (letters that aren't in the map, special chars, invalid operations, etc.)
* - Walk through every letter of the string
* - If letter is an Set, check next char for op, then next char for target set
* - Otherwise, step to next char
*/

