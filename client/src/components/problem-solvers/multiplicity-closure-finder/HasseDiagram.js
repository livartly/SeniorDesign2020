import React from 'react';

import AnyChart from 'anychart-react';
import anychart from 'anychart';

let stage = anychart.graphics.create();

class HasseDiagram extends React.Component {
  render() {
    return (
      <AnyChart
        width={800}
        height={600}
        instance={stage}
        charts={[]}
      />
    );
  }
}

export default HasseDiagram;