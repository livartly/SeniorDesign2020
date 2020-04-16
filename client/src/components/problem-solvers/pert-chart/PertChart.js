import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import PertChartBuilder from './PertChartBuilder';
import { sendProblem } from '../../../utils/problemsAPIUtil';


class PertChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      //chartData: [],
      nodes: [
        {
          id: "",
          name: "",
          duration: "",
          dependsOn: ""
        }
      ]
    };
    // Bindings for this 
    this.handleClick2 = this.handleClick2.bind(this);
    this.setChartData = this.setChartData.bind(this);
    this.updateId = this.updateId.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.updateDependsOn = this.updateDependsOn.bind(this);
    this.makeNodesForm = this.makeNodesForm.bind(this);
  }

  setChartData(event) {
    event.preventDefault();
    try {

      for (var node of this.state.nodes) {

          // Declare variable to check for at least one node with no dependencies 
          var nodeCheck = 0;

          // Deep copy of nodes 
          var nodesCopy = [];
          for (const node of this.state.nodes) {
            var nodeCopy = {};
            
            for(const nodeProp in node){
              nodeCopy[nodeProp] = node[nodeProp];
            }

            // Check if dependsOn is empty- remove element
            if(nodeCopy.dependsOn == "")
            {
              delete nodeCopy.dependsOn;
              nodeCheck++;
            }
            else
            {
              // Put each node's dependencies into an array
              var dependsOnArray = nodeCopy.dependsOn.split(',');
              nodeCopy.dependsOn = dependsOnArray;
            }

            // Check if required input duration is empty- replace with 0
            if(nodeCopy.duration == "")
            {
              nodeCopy.duration = "0";
            }
            nodesCopy.push(nodeCopy);
          }

          // Before setting state, check to make sure node check caught at least one independant node
          if(nodeCheck > 0)
          {
            this.setState( { chartData: nodesCopy } );
          }
          else 
          {
            throw new Error(" Error: Cyclic dependency detected! At least one node should have no dependencies.");
          }
      }

          // This will occur asynchronously (not blocking)
          sendProblem({
          userID: this.props.user.id,
          username: this.props.user.username,
          email: this.props.user.email,
          typeIndex: 6,
          input: {
          nodes: this.state.nodes
          //chartData: this.state.chartData
          }
          });
    }
        catch (err) {
          this.setState({ error: err.message });
        }
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
        id: "",
        name: "",
        duration: "",
        dependsOn: ""
      });
      return {
        nodes: nextNodes
      };
    });

  }

  updateId(idx) {
    return e => {

      // Set nextId to current input box value
      var nextId = e.currentTarget.value;

      // Anonymous function/ Arrow function (function within a function)
      this.setState(prevState => {
        var newNode = {
          id: nextId,
          name: prevState.nodes[idx].name,
          duration: prevState.nodes[idx].duration,
          dependsOn: prevState.nodes[idx].dependsOn
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

  updateName(idx) {
    return e => {

      // Set nextName to current input box value
      var nextName = e.currentTarget.value;

      // Anonymous function/ Arrow function (function within a function)
      this.setState(prevState => {
        var newNode = {
          id: prevState.nodes[idx].id,
          name: nextName,
          duration: prevState.nodes[idx].duration,
          dependsOn: prevState.nodes[idx].dependsOn
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

  updateDuration(idx) {
    return e => {

      // Set nextDuration to current input box value
      var nextDuration = e.currentTarget.value;

      // Anonymous function/ Arrow function (function within a function)
      this.setState(prevState => {
        var newNode = {
          id: prevState.nodes[idx].id,
          name: prevState.nodes[idx].name,
          duration: nextDuration,
          dependsOn: prevState.nodes[idx].dependsOn
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

  updateDependsOn(idx) {
    return e => {
      var nextDependsOn = e.currentTarget.value
      this.setState(prevState => {
        var newNode = {
          id: prevState.nodes[idx].id,
          name: prevState.nodes[idx].name,
          duration: prevState.nodes[idx].duration,
          dependsOn: nextDependsOn
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
            value={this.state.nodes[idx].id}
            onChange={this.updateId(idx)}
          ></input>
          <input 
            value={this.state.nodes[idx].name}
            onChange={this.updateName(idx)}
          ></input>
          <input 
            value={this.state.nodes[idx].duration}
            onChange={this.updateDuration(idx)}
          ></input>
          <input 
            value={this.state.nodes[idx].dependsOn} 
            onChange={this.updateDependsOn(idx)}
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
          <h1>Pert Charts</h1>
            <Form.Group controlId="pertChart.instructions">
              <Form.Label>Instructions</Form.Label>
              <p>This site will take a series of nodes, their durations, and their dependencies as input and will output a corresponding pert chart. <b>S</b> indicates the start of the sequence, <b>F</b> indicates the finish/end of the sequence.</p>
            </Form.Group>
            <Form.Group controlId="pertChart.usage">
                  <Form.Label>Usage</Form.Label>
                  <ul>
                  <li>
                      <b>Pert Chart Output</b>- hover over nodes and edges to see tags and duration information. Critical path consists of all red nodes.
                    </li>
                    <li>
                      Id- this is the required identifier of your node.
                    </li>
                    <li>
                      Node- this can be a the name of a node like A or the name of a task like Make Pancakes.
                    </li>
                    <li>
                      Duration- this is a numerical input to specifiy the amount of time a task takes. Duration is not a required input, if left blank the duration will default to 0.
                    </li>
                    <li>
                      Dependencies- these are the nodes/tasks that a node/task depends on- also called Prerequisite Tasks. Each node can have multiple dependencies. Dependencies must be comma separeted. Your input should always include at least one node that contains no dependencies in order to output a pert chart.
                    </li>
                  </ul>
                </Form.Group>
            <Form.Label>Examples </Form.Label>
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Id:</th>
                  <th scope="col">Node Name:</th>
                  <th scope="col">Duration:</th>
                  <th scope="col">Dependencies:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>1</td>
                  <td>4</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>2</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>3</td>
                  <td>5</td>
                  <td>8</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>4</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>5</td>
                  <td>2</td>
                  <td>4,7</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>6</td>
                  <td>1</td>
                  <td>5</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>7</td>
                  <td>3</td>
                  <td>3</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>8</td>
                  <td>5</td>
                  <td></td>
                </tr>
                
              </tbody>
            </table>
            <Form.Group controlId="truthTableBuilder.textInput">
                <br />
                {this.makeNodesForm()}
                <br />  
                <button onClick={this.handleClick2}>Add Node</button>
                <button onClick={this.setChartData}>Submit</button>
                <br></br>
                <span>{this.state.error ? this.state.error : ""}</span>
            </Form.Group>

            <Form.Group controlId="truthTableBuilder.cardOutput">
              <Form.Label>Result</Form.Label>
              <Card body style={{ minHeight: "400px" }}>
              <PertChartBuilder data={this.state.chartData} />
              </Card>
            </Form.Group>
          </Form>
          </Card.Body>
        </Card>

      </div>
      <br></br>
      <br></br>
      </div>
    );
  }
}

export default PertChart;