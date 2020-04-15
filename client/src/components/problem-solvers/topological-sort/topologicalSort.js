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
          if(temp == "")
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
        nodes: this.state.nodes
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
        <Card>
          <Card.Body>
            <Form>
          <h1>Topological Sorting</h1>
          <Form.Group controlId="topologicalSort.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>This site will take a series of nodes and their dependencies as input and will output a corresponding topological sort of the entered nodes.</p>
            </Form.Group>
            <Form.Group controlId="topologicalSort.usage">
                  <Form.Label>Usage</Form.Label>
                  <ul>
                    <li>
                      Node- this is the required identifier of your node. It can be a the name of a node like A or the name of a task like Make Pancakes.
                    </li>
                    <li>
                      Dependencies- these are the nodes/tasks that a node/task depends on. Each node can have multiple dependencies. Dependencies must be comma separeted. Your input should always include at least one node that contains no dependencies in order to output a pert chart.
                    </li>
                  </ul>
                </Form.Group>
                <Form.Label>Examples </Form.Label>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Node Name:</th>
                  <th scope="col">Dependencies:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A</td>
                  <td>B,C</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>D</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>E,F</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td></td>
                </tr>
                <tr>
                  <td>E</td>
                  <td>D</td>
                </tr>
                <tr>
                  <td>F</td>
                  <td>G</td>
                </tr>
              </tbody>
            </table>
            <Form.Group controlId="topologicalSort.textInput">
              <span>{this.state.error ? this.state.error : ""}</span>
                <br />
                {this.makeNodesForm()}
                <br />
                <button onClick={this.handleClick2}>Add Node</button>
                <button onClick={this.topologicalSort}>Submit</button>
            </Form.Group>

            <Form.Group controlId="topologicalSort.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "100px" }}>
              <pre id="output"></pre>
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

export default TopologicalSort;