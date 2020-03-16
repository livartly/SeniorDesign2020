import React from 'react';
import Statement from '../../../engine/statement.js';

import Table from 'react-bootstrap/Table';

import SortLegend from './sortLegend.js';

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

    this.makeNodesForm = this.makeNodesForm.bind(this);
    this.updateDependencies = this.updateDependencies.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
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
      var nextName = e.currentTarget.value;
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
    console.log(this.state);
    return (
      <div className="box">
        <p>Topological Sorting</p>
        <SortLegend />
        <p>Example Input: </p>
        <p>Node name:  dependency, dependency[duration]</p>
        <p>Dry Dishes: get soap, wash dishes[10]</p>
        <span>{this.state.error ? this.state.error : ""}</span>
        <br />
        {this.makeNodesForm()}
        <br />
        <button onClick={this.handleClick2}>Add Node</button>
        <button onClick={this.handleClick}>Submit</button>
        <br />
      </div>
    );
  }
}

export default TopologicalSort;