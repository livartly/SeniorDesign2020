import React from 'react';
import AnyChart from 'anychart-react';
import anychart from 'anychart';

let stage = anychart.graphics.create();

class PertChartBuilder extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    // create a chart and set the data
    var chart = anychart.pert(this.props.data);

       // set chart data
       chart.data(this.props.data, "asTable");
 
       // set the title of the chart
       chart.title("Pert Chart");
 
       // set the container id for the chart
       chart.container('chart');
 
       // initiate drawing the chart
       chart.draw();

    return (
      <AnyChart
        width={800}
        height={600}
        instance={stage}
        charts={[chart]}
      />
    );
  }
}

export default PertChartBuilder;


/* import React from 'react';
import PertChart from './PertChart';
const PertChartBuilder = (props) => {

// create data
var data = [
    {id: "1", duration: 1, name: "Task A"},
    {id: "2", duration: 3, name: "Task B"},
    {id: "3", duration: 3, name: "Task C"},
    {id: "4", duration: 1, name: "Task D"},
    {id: "5", duration: 2, name: "Task AD", dependsOn: ["1", "4"]},
    {id: "6", duration: 2, name: "Task BC", dependsOn: ["2", "3"]}
  ];

  return (
    <div>
      <h1>PertChart Builder Page Test</h1>
      <PertChart data={data} title="Testing this..." />
    </div>
  );
};*/