import React from 'react';
import toposort from 'toposort';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { sendProblem } from '../../../utils/problemsAPIUtil';

class TopologicalSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      nodes: [
        {
          name: "",
          dependencies: ""
        }
      ]
    };

// Bindings for this 
    this.makeNodesForm = this.makeNodesForm.bind(this);
    this.updateDependencies = this.updateDependencies.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.topologicalSort = this.topologicalSort.bind(this);
  }

  topologicalSort(e) {
    e.preventDefault();

      var edges = [];
      for (var node of this.state.nodes) {
          var nodeDependencies = node.dependencies.split(",");
          for (var toNode of nodeDependencies) {
            edges.push([node.name, toNode]);
          }
      }

      try{
      // Now, sort the vertices topologically, to reveal a legal execution order.
      var topoArray = toposort(edges).reverse();

      // If vert has no dependencies, remove null dependency edge from input
      for(var i=0; i<topoArray.length; i++)
      {
          var temp = topoArray[i].toString();
          if(temp === "null")
          {
              topoArray.splice(i, 1)
          }
      }

      // Print sorted 2d array
      var tempOutput = "";
      for(var i=0; i<topoArray.length; i++)
      {
          //console.log(topoArray[i]);
          var tempStringOutput = topoArray[i].toString();
          //console.log(tempStringOutput);
          tempOutput = tempOutput + " " + tempStringOutput;
      }

      document.getElementById("output").innerHTML = tempOutput;

      // This will occur asynchronously (not blocking)
      sendProblem({
      userID: this.props.user.id,
      username: this.props.user.username,
      email: this.props.user.email,
      typeIndex: 5,
      input: {
        nodes: this.state.nodes,
        output: tempOutput
      }
      });

      }
      catch(e)
      {
        this.setState({error: "Input contains cyclic dependency!"})
      }
      return {
        //nodes: edges
        topoArray
      };
    
  }

  // On click Add Node button, add another input box
  handleClick2(e) {
    e.preventDefault();
    this.setState(prevState => {

      // Deep copy
      var nextNodes = [];
      for (var i = 0; i<prevState.nodes.length; i++) {
        nextNodes.push(prevState.nodes[i]);
      }

      nextNodes.push({
        name: "",
        dependencies: ""
      });
      return {
        nodes: nextNodes
      };
    });

  }

  updateName(idx) {
    return e => {

      // Set nextName to current input box value
      var nextName = e.currentTarget.value;

      // Anonymous function/ Arrow function (function within a function)
      this.setState(prevState => {
        var newNode = {
          name: nextName,
          dependencies: prevState.nodes[idx].dependencies
        };
        var nextNodes = [];
        for (var i = 0; i<prevState.nodes.length; i++) {
          nextNodes.push(prevState.nodes[i]);
        }
        nextNodes[idx] = newNode;

        return {
          nodes: nextNodes
        };
      });
    };
  }

  updateDependencies(idx) {
    return e => {
      var nextDependencies = e.currentTarget.value
      this.setState(prevState => {
        var newNode = {
          dependencies: nextDependencies,
          name: prevState.nodes[idx].name
        };
        var nextNodes = [];
        for (var i = 0; i<prevState.nodes.length; i++) {
          nextNodes.push(prevState.nodes[i]);
        }
        nextNodes[idx] = newNode;
        return {
          nodes: nextNodes
        };
      });
    };
  }

  makeNodesForm() {
    return this.state.nodes.map((node, idx) => {
      return(
        <div key={idx}>
          <input 
            value={this.state.nodes[idx].name}
            onChange={this.updateName(idx)}
          ></input>
          <input 
            value={this.state.nodes[idx].dependencies} 
            onChange={this.updateDependencies(idx)}
          ></input>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
      <div className="container" style={{ marginTop: "50px" }}>
        <Form>
        <h1>Topological Sorting</h1>
          <Form.Group controlId="truthTableBuilder.instructions">
            <Form.Label>Instructions</Form.Label>
            <p>
            Input graph nodes and dependencies to output a topological sort. Enter node name into the left field, and comma seperated dependencies into the right field.
            Enter null in an input field of a node that does not have a dependency.
            </p>
          </Form.Group>
          <Form.Group controlId="truthTableBuilder.textInput">
            <Form.Label>Example</Form.Label>
            <Form.Label>A B,C</Form.Label>
            <span>{this.state.error ? this.state.error : ""}</span>
              <br />
              {this.makeNodesForm()}
              <br />
              <button onClick={this.handleClick2}>Add Node</button>
              <button onClick={this.topologicalSort}>Submit</button>
          </Form.Group>

          <Form.Group controlId="truthTableBuilder.cardOutput">
            <Form.Label>Result</Form.Label>
            <Card body style={{ minHeight: "100px" }}>
            <pre id="output"></pre>
            </Card>
          </Form.Group>
        </Form>
      </div>
    </div>
    );
  }
}

export default TopologicalSort;