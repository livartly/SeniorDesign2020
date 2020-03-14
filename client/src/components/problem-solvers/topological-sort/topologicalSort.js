import React from 'react';
import Statement from '../../../engine/statement.js';

import Table from 'react-bootstrap/Table';

import SortLegend from './SortLegend.js';

    // Include toposort 
import toposort from 'toposort';

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

      console.log("Sorted:")
      // Print sorted 2d array
      for(var i=0; i<topoArray.length; i++)
      {
          console.log(topoArray[i]);
      }
      }
      catch(e)
      {
        this.setState({error: "Input contains cyclic dependency!"})
      }

    
      return {
        nodes: edges
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
      <div className="container main">
        <h1>Topological Sorting</h1>
        <h4>Input graph nodes and dependencies to output a topological sort. </h4>
        <div className="row">
          <div className= "four columns">
            <div className="left">
              <p>Input</p>
              <p>Example:</p>
              <p>"Node Name:        Node Dependencies(comma seperated):"</p>
              <span>{this.state.error ? this.state.error : ""}</span>
              <br />
              {this.makeNodesForm()}
              <br />
              <button onClick={this.handleClick2}>Add Node</button>
              <button onClick={this.topologicalSort}>Submit</button>
              <br />
          </div>
        </div>

        <div className= "four columns">
            <div className="center">
              <p></p>
          </div>
        </div>

        <div className= "four columns">
            <div className="right">
              <p>Output</p>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default TopologicalSort;