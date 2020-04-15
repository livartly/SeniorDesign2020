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
        height={400}
        instance={stage}
        charts={[chart]}
      />
    );
  }
}

export default PertChartBuilder;