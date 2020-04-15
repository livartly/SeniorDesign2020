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

       // critical path
       chart.milestones().labels(false);

       chart.criticalPath({milestones: {fill: "#FF4040", selectFill: "#92000A"}});

       // set critical path duration
       var duration = chart.getStat("pertChartProjectDuration");

       // set the title of the chart
       chart.title("Minimum time to completion is " + duration + " units. Critical path shown in red.");
 
       // set the container id for the chart
       chart.container('chart');
 
       // initiate drawing the chart
       chart.draw();

    return (
      <AnyChart
        width={800}
        height={400}
        instance={stage}
        charts={[chart]}
      />
    );
  }
}

export default PertChartBuilder;