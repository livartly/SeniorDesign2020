import React from 'react';
import {Link} from 'react-router-dom'
import {Table, Form, Row, Col, Card, Button} from 'react-bootstrap';
import {LogicalSet} from "../../../engine/Sets/LogicalSet.js";
import { sendProblem } from '../../../utils/problemsAPIUtil';

//********************************************//
//
// Begin code for SUBSET and POWERSET calculations
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
      out:"",
      powersetSize:-1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubsetASubmit = this.handleSubsetASubmit.bind(this);
    this.handleSubsetBSubmit = this.handleSubsetBSubmit.bind(this);
    this.handlePowersetSubmit = this.handlePowersetSubmit.bind(this);
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
    let s = new LogicalSet(splitArray);
    return s;
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

    // This will occur asynchronously (not blocking)
    sendProblem({
      userID: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      typeIndex: 9,
      input: {
        setInput: this.state.setStrings
      }
  });
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

    // This will occur asynchronously (not blocking)
    sendProblem({
      userID: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      typeIndex: 9,
      input: {
        setInput: this.state.setStrings
      }
  });
  }

  handlePowersetSubmit(idx) {
    if (this.state.setStrings[idx] != "") {
      return () => {
        let s = this.convertStringToSet(this.state.setStrings[idx]);
        let p = s.powerset();
        p.sort(function (a, b) {
          return a.length - b.length;
        });

        for (var i = 0; i < p.length; i++) {
          p[i] = p[i].reverse();
        }

        let pString = "{" + p.toString().substring(1, p.toString().length - 1) + "}";
        pString = pString.replace(/\[/g, "{");
        pString = pString.replace(/\]/g, "}");
        this.setState({ powersetSize: p.length });
        this.setState({ out: pString });

        // This will occur asynchronously (not blocking)
        sendProblem({
          userID: this.props.user.id,
          username: this.props.user.username,
          email: this.props.user.email,
          typeIndex: 9,
          input: {
            setInput: this.state.setStrings
          }
      });
      }
    }
  }

  showOutput() {
    if (this.state.out === "") return;
    else if (this.state.out === "false" || this.state.out === "true") {
      return (
        <Card.Text>{this.state.out.toString().toUpperCase()}</Card.Text>
      );
    }
    else {
      return (
        <Card.Body>
          <Card.Text>Number of elements in Powerset: {this.state.powersetSize}</Card.Text>
          <Card.Text>{this.state.out}</Card.Text>
        </Card.Body>
      );
    }
  }

  // Draw page
  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: "50px" }}>
        <h1>Sets</h1>
        <Card>
          <Card.Body>
            <Card.Text>
              <Form>
              <Form.Group controlId="truthTableBuilder.instructions">  
              <p><b>Subset Calculator</b></p>
              <Form.Label><b>Instructions</b></Form.Label>
                <p>
                Enter set elements into each field. Sets can be any collection of comma-separated characters or strings. 
                Select the "𝓟" button next to a set field to generate the powerset of the given set, as well as its size. 
                Select one of the bottom two buttons to determine if A is a proper subset of B 
                (A is a subset of B that is not equal to B), or if B is a proper subset of A.
                </p>
              </Form.Group>
              </Form>
                {
                  this.makeInputForm()
                }
                <button onClick={this.handleSubsetASubmit}>A ⊆ B?</button><button onClick={this.handleSubsetBSubmit}>B ⊆ A?</button>
                
            </Card.Text>
            <Form>
              <Form.Group controlId="truthTableBuilder.cardOutput">
                  <Form.Label>Result</Form.Label>
                  <Card body style={{ minHeight: "100px" }}>
                  {this.showOutput()}
                  </Card>
                </Form.Group>
            </Form>
          </Card.Body>
        </Card>
          </div>
        </div>
    );
  }
}

export default SetOps;