import React from 'react';

import AnyChart from 'anychart-react';
import anychart from 'anychart';

let stage = anychart.graphics.create();

class HasseDiagram extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    // create a chart and set the data
    var chart = anychart.graph(this.props.data);

    // enable labels of nodes
    chart.nodes().labels().enabled(true);
    // configure labels of nodes
    chart.nodes().labels().format("{%id}");
    chart.nodes().labels().fontSize(12);
    chart.nodes().labels().fontWeight(600);
    chart.layout().type("fixed");
    chart.interactivity().enabled(false);
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

export default HasseDiagram;