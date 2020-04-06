import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import PertChartBuilder from './PertChartBuilder';
import { sendProblem } from '../../../utils/problemsAPIUtil';


class PertChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      chartData: [],
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

      var dataToSend = [];
      for (var node of this.state.nodes) {

          // Check if required input duration is empty- replace with 0
          if(node.duration == "")
          {
            node.duration = "0";
          }

          // Check if id input is empty- throw error
          if(node.id == "")
          {
            this.setState({error: " Error: All nodes must have an id value."})
          }

          // Check if dependsOn is empty- remove element
          if(node.dependsOn == "")
          {
            delete node.dependsOn;
          }
          else
          {
            // Put each node's dependencies into an array
            var dependsOnArray = node.dependsOn.split(',');
            node.dependsOn = dependsOnArray;
          }

          console.log("Before setting: ");
          console.log(this.state.chartData);

          this.setState( state => ({
            chartData: this.state.chartData.concat([node])
          }));

          console.log("After setting: ");
          console.log(this.state.chartData);

/*           this.setState({
            chartData: this.state.chartData.concat([node])
          }) */

/*           this.setState(prevState => ({
            chartData: [...prevState.chartData, node]
          })) */

          // Update data with new node
          dataToSend.push([node]);
      }

      // Set chart data
      //this.state.chartData = dataToSend;
      //console.log("Data to chart: ")
      //console.log(this.state.chartData);

       // This will occur asynchronously (not blocking)
        sendProblem({
        userID: this.props.user.id,
        username: this.props.user.username,
        email: this.props.user.email,
        typeIndex: 6,
        input: {
        chartData: this.state.chartData
        }
        });

        // this.setState({ chartData:  dataToSend});

/*         this.setState(function(state, props) { 
          return {
            chartData:  state.dataToSend
          };
        }); */
        
/*         console.log("Whats in data to send: ");
        console.log(dataToSend);

        this.setState({
          chartData: { ...this.state.chartData, ...dataToSend } 
        });

        console.log("Whats in chart data: ");
        console.log(this.state.chartData);
 */
      return {
        dataToSend
      };
      
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
        <Form>
        <h1>Pert Charts</h1>
          <Form.Group controlId="truthTableBuilder.instructions">
            <Form.Label>Instructions</Form.Label>
            <p>Input information for each graph node to output a pert chart. Input ID, node name, node duration, and node dependencies.</p>
            <p>Dependecies can be left blank if there are none. 
            Please sepereate dependencies with commas.</p>
            <p>ID, and node name are required to output a pert chart. If duration is left blank, its duration will be considered 0.</p>
            <p>S indicates the start of the sequence, F indicates the finish/end of the sequence.</p>

          </Form.Group>
          <Form.Label>Example: </Form.Label>
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
                <td>A</td>
                <td>2</td>
                <td>B,C</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>B</td>
                <td>8</td>
                <td>C</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>C</td>
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
      </div>
      <br></br>
      <br></br>
      </div>
    );
  }
}

export default PertChart;